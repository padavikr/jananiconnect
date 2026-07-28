"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

type AnalysisData = {
  healthSummary?: string;
  summary?: string;
  healthScore?: number;
  riskLevel?: "Low" | "Medium" | "High";
  abnormalValues?: string[];
  abnormalities?: string[];
  dietRecommendations?: string[];
  diet?: string[];
  exerciseRecommendations?: string[];
  precautions?: string[];
  medicationsToDiscuss?: string[];
  doctorAdvice?: string;
  pregnancyTips?: string[];
};

type StoredAnalysis = {
  reportId?: string;
  userId?: string;
  reportName?: string;
  reportType?: string;
  reportUrl?: string;
  summary?: string;
  abnormalities?: string[];
  healthScore?: number;
  riskLevel?: "Low" | "Medium" | "High";
  diet?: string[];
  precautions?: string[];
  doctorAdvice?: string;
  analysis?: AnalysisData;
  createdAt?: unknown;
  status?: string;
  disclaimer?: string;
};

function AIAnalysisContent() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get("reportId") ?? "";
  const [analysis, setAnalysis] = useState<StoredAnalysis | null>(null);
  const [loading, setLoading] = useState(Boolean(reportId));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reportId) {
      setLoading(false);
      setError("No report ID found. Please upload a report first.");
      return;
    }

    const q = query(collection(db, "aiAnalysis"), where("reportId", "==", reportId));
    const timeoutId = window.setTimeout(() => {
      setLoading(false);
      setError("The analysis did not complete in time. Please try again.");
    }, 20000);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const latest = snapshot.docs[0]?.data() as StoredAnalysis | undefined;
        if (latest) {
          setAnalysis(latest);
          setLoading(false);
          setError("");
          window.clearTimeout(timeoutId);
        } else {
          setLoading(true);
        }
      },
      (err) => {
        console.error(err);
        setError("Unable to load your analysis right now.");
        setLoading(false);
        window.clearTimeout(timeoutId);
      }
    );

    return () => {
      unsubscribe();
      window.clearTimeout(timeoutId);
    };
  }, [reportId]);

  const fileName = analysis?.reportName ?? "uploaded report";
  const fileType = analysis?.reportType ?? "document";
  const analyzedAt = useMemo(() => {
    if (!analysis?.createdAt) {
      return "just now";
    }

    return typeof analysis.createdAt === "string"
      ? analysis.createdAt
      : "just now";
  }, [analysis?.createdAt]);

  const score = analysis?.healthScore ?? analysis?.analysis?.healthScore ?? 0;
  const status = score >= 92 ? "Healthy Pregnancy" : score >= 85 ? "Needs close monitoring" : "Needs urgent review";
  const riskLevel = analysis?.riskLevel ?? analysis?.analysis?.riskLevel ?? "Medium";
  const summary = analysis?.summary ?? analysis?.analysis?.summary ?? analysis?.analysis?.healthSummary ?? "Your analysis is being prepared. Please wait a moment.";
  const abnormalValues = analysis?.abnormalities ?? analysis?.analysis?.abnormalities ?? analysis?.analysis?.abnormalValues ?? [];
  const dietRecommendations = analysis?.diet ?? analysis?.analysis?.diet ?? analysis?.analysis?.dietRecommendations ?? [];
  const precautions = analysis?.precautions ?? analysis?.analysis?.precautions ?? analysis?.analysis?.exerciseRecommendations ?? [];
  const medicationsToDiscuss = analysis?.analysis?.medicationsToDiscuss ?? [];
  const doctorAdvice = analysis?.doctorAdvice ?? analysis?.analysis?.doctorAdvice ?? "";
  const pregnancyTips = analysis?.analysis?.pregnancyTips ?? [];
  const disclaimer = analysis?.disclaimer ?? "AI-generated insights are informational only and do not replace professional medical advice.";

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h1 className="text-3xl font-bold text-pink-700">
        🤖 AI Health Analysis
      </h1>

      <p className="mt-2 text-gray-600">
        Your {typeof fileType === "string" && fileType.includes("/") ? fileType.split("/")[1] : "document"} report was reviewed successfully.
      </p>

      <div className="mt-4 rounded-2xl border border-pink-200 bg-pink-50 p-4 text-sm text-pink-700">
        <p><strong>File:</strong> {fileName}</p>
        <p><strong>Analyzed:</strong> {analyzedAt}</p>
      </div>

      {loading ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-lg">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600" />
          <p className="mt-4 text-pink-700">Getting your AI analysis...</p>
        </div>
      ) : null}

      {error ? (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!loading && !error && analysis?.analysis ? (
        <>
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-pink-700">❤️ AI Health Score</h2>

            <h1 className="mt-4 text-5xl font-bold text-green-600">{score} / 100</h1>

            <p className="mt-2 font-semibold text-green-600">{status}</p>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-pink-700">📋 Health Summary</h2>
            <p className="mt-4 text-gray-700">{summary}</p>
            <div className="mt-4 space-y-2">
              <p>🟢 Risk Level : {riskLevel}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-pink-700">⚠️ Abnormal Values</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
              {abnormalValues.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-pink-700">🥗 Diet Recommendations</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
              {dietRecommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-pink-700">🧘 Lifestyle Advice</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
              {precautions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-pink-700">💊 Medications to Discuss</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
              {medicationsToDiscuss.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-pink-700">🩺 Doctor Advice</h2>
            <p className="mt-4 text-gray-700">{doctorAdvice}</p>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-pink-700">🌸 Pregnancy Tips</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
              {pregnancyTips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <p className="font-semibold">Disclaimer</p>
            <p className="mt-1">{disclaimer}</p>
          </div>
        </>
      ) : null}

      <Link href="/dashboard" className="mt-8 block w-full rounded-lg bg-pink-600 py-3 text-center font-semibold text-white hover:bg-pink-700">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default function AIAnalysis() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-pink-50 p-6 text-pink-700">
          Loading analysis...
        </div>
      }
    >
      <AIAnalysisContent />
    </Suspense>
  );
}