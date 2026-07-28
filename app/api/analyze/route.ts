import { NextRequest, NextResponse } from "next/server";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { analyzeMedicalReport, type GeminiAnalysisResult } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportId, userId, reportName, reportType, reportUrl } = body;

    if (!reportId || !userId || !reportUrl) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const analysisResult = await analyzeMedicalReport({
      reportName,
      reportType,
      reportUrl,
    });

    const analysisDocument = {
      reportId,
      userId,
      reportName,
      reportType,
      reportUrl,
      summary: analysisResult.summary || analysisResult.healthSummary,
      abnormalities: analysisResult.abnormalities || analysisResult.abnormalValues,
      healthScore: analysisResult.healthScore,
      riskLevel: analysisResult.riskLevel,
      diet: analysisResult.diet || analysisResult.dietRecommendations,
      precautions: analysisResult.precautions || analysisResult.exerciseRecommendations,
      doctorAdvice: analysisResult.doctorAdvice,
      analysis: analysisResult,
      createdAt: serverTimestamp(),
      status: "Completed",
      disclaimer: "AI-generated insights are informational only and do not replace professional medical advice.",
    };

    const aiAnalysisRef = await addDoc(collection(db, "aiAnalysis"), analysisDocument);

    await updateDoc(doc(db, "reports", reportId), {
      aiAnalysisStatus: "Completed",
      aiAnalysisResult: analysisResult,
    });

    return NextResponse.json(
      {
        success: true,
        reportId,
        analysis: analysisResult,
        aiAnalysisId: aiAnalysisRef.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "AI analysis failed. Please try again.",
      },
      { status: 500 }
    );
  }
}

