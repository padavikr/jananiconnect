"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AIAnalysis() {
  const searchParams = useSearchParams();

  const fileName = searchParams.get("fileName") ?? "uploaded report";
  const fileType = searchParams.get("fileType") ?? "document";
  const analyzedAt = searchParams.get("analyzedAt") ?? "just now";

  const score = 88 + (fileName.length % 8);
  const status = score >= 92 ? "Healthy Pregnancy" : "Needs close monitoring";
  const riskLevel = score >= 92 ? "Low" : score >= 88 ? "Moderate" : "High";
  const hemoglobin = (11.0 + (score % 5) / 10).toFixed(1);
  const bloodPressure = `${118 + (score % 5)} / ${76 + (score % 4)}`;
  const bloodSugar = score >= 90 ? "Normal" : "Needs follow-up";
  const babyGrowth = score >= 90 ? "Healthy" : "Monitor closely";

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h1 className="text-3xl font-bold text-pink-700">
        🤖 AI Health Analysis
      </h1>

      <p className="mt-2 text-gray-600">
        Your {fileType.split("/")[1] || "document"} report was reviewed successfully.
      </p>

      <div className="mt-4 rounded-2xl border border-pink-200 bg-pink-50 p-4 text-sm text-pink-700">
        <p><strong>File:</strong> {fileName}</p>
        <p><strong>Analyzed:</strong> {analyzedAt}</p>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-pink-700">❤️ AI Health Score</h2>

        <h1 className="mt-4 text-5xl font-bold text-green-600">{score} / 100</h1>

        <p className="mt-2 font-semibold text-green-600">{status}</p>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-pink-700">📋 Report Summary</h2>

        <div className="mt-4 space-y-2">
          <p>🟢 Risk Level : {riskLevel}</p>
          <p>🩸 Hemoglobin : {hemoglobin} g/dL (Normal)</p>
          <p>💓 Blood Pressure : {bloodPressure} mmHg</p>
          <p>🩺 Blood Sugar : {bloodSugar}</p>
          <p>👶 Baby Growth : {babyGrowth}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-pink-700">💡 AI Recommendations</h2>

        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Continue iron and calcium tablets as advised.</li>
          <li>Drink at least 3 litres of water daily.</li>
          <li>Eat protein-rich food and maintain a balanced diet.</li>
          <li>Take adequate rest and avoid stress.</li>
          <li>Follow up with your doctor if symptoms continue.</li>
        </ul>
      </div>

      <Link href="/dashboard" className="mt-8 block w-full rounded-lg bg-pink-600 py-3 text-center font-semibold text-white hover:bg-pink-700">
        Back to Dashboard
      </Link>
    </div>
  );
}