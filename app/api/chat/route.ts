import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message : "";
    const history = Array.isArray(body?.history)
      ? body.history.filter((entry: unknown): entry is { sender?: string; text?: string } => {
          return typeof entry === "object" && entry !== null && "text" in entry;
        })
      : [];

    if (!message.trim()) {
      return NextResponse.json({ message: "Please provide a message." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[chat] GEMINI_API_KEY is not configured.");
      return NextResponse.json(
        { message: "Sorry, I couldn't process your request. Please try again." },
        { status: 500 }
      );
    }

    console.log("[chat] GEMINI_API_KEY loaded:", Boolean(apiKey));

    const ai = new GoogleGenAI({ apiKey });
    const configuredModel = "gemini-2.0-flash";
    const candidateModels = [configuredModel, "gemini-2.0-flash", "gemini-2.0-flash-lite"];
    const normalizedHistory = history.slice(-12);
    const prompt = `
You are Janani AI, an intelligent healthcare assistant for pregnant women, mothers, ASHA workers and doctors.

Your personality:
- Warm, caring and friendly.
- Never repeat the same answer.
- Answer naturally like ChatGPT.
- Remember the previous conversation.
- If the user asks a follow-up question, continue from the previous answer.
- Explain everything in simple English.
- Give practical pregnancy advice.
- Explain medical reports.
- Give nutrition suggestions.
- Explain medicines but never prescribe them.
- Recommend seeing a doctor whenever necessary.
- If it is an emergency, immediately advise visiting the nearest hospital.

Conversation History:
${normalizedHistory.length > 0 ? normalizedHistory.map((m: { sender?: string; text?: string }) => `${m.sender || "unknown"}: ${m.text || ""}`).join("\n") : "No previous conversation."}

Current User Question:
${message}
`;

    console.log("[chat] Incoming user message:", message);
    console.log("Gemini API Key exists:", !!apiKey);

    let lastError: unknown;
    for (const modelName of candidateModels) {
      try {
        console.log("[chat] Using Gemini model:", modelName);
        const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ],
});

        const responseText = extractGeminiText(response);
        if (!responseText) {
          throw new Error("Gemini returned an empty response.");
        }

        return NextResponse.json({ reply: responseText });
      } catch (error) {
        lastError = error;
        const message = error instanceof Error ? error.message : "";
        const status = getErrorStatus(error);
        const shouldRetry = status === 404 || status === 400 || /unsupported|not found|model/i.test(message);
        if (shouldRetry) {
          console.warn("[chat] Model failed, trying the next fallback:", modelName);
          continue;
        }

        throw error;
      }
    }

    throw lastError instanceof Error ? lastError : new Error("Gemini request failed.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = getErrorStatus(error);
    const isQuotaIssue = /quota|rate limit|429|resource exhausted|exceeded your current quota/i.test(message);

    console.error("[chat] Gemini API call failed.", error);

    return NextResponse.json(
      {
        message: isQuotaIssue
          ? "The Gemini API is temporarily rate-limited or out of quota. Please try again shortly."
          : "Sorry, I couldn't process your request right now.",
      },
      { status: status && status >= 400 ? status : 500 }
    );
  }
}

function getErrorStatus(error: unknown): number | undefined {
  if (typeof error === "object" && error !== null) {
    const record = error as {
      status?: number;
      code?: number;
      statusCode?: number;
    };

    if (typeof record.status === "number") return record.status;
    if (typeof record.code === "number") return record.code;
    if (typeof record.statusCode === "number") return record.statusCode;
  }

  return undefined;
}

function extractGeminiText(response: unknown): string {
  if (typeof response !== "object" || response === null) return "";

  const candidateResponse = response as {
    text?: string;
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  if (typeof candidateResponse.text === "string" && candidateResponse.text.trim()) {
    return candidateResponse.text.trim();
  }

  const parts = candidateResponse.candidates?.[0]?.content?.parts;
  if (Array.isArray(parts)) {
    const text = parts
      .map((part) => part.text || "")
      .join("")
      .trim();
    if (text) {
      return text;
    }
  }

  return "";
}