import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

    // Generate simulated AI analysis
    // TODO: Integrate actual Google GenAI when API is properly configured
    // The @google/genai package is installed but requires proper API setup
    const analysisResult = {
      ...generateSimulatedAnalysis(),
      analyzedAt: serverTimestamp(),
    };

    // Update the report document with analysis results
    const reportRef = doc(db, "reports", reportId);
    await updateDoc(reportRef, {
      aiAnalysisStatus: "Completed",
      aiAnalysisResult: analysisResult,
    });

    return NextResponse.json(
      {
        success: true,
        reportId,
        analysis: analysisResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { message: "AI analysis failed. Please try again." },
      { status: 500 }
    );
  }
}

function generateSimulatedAnalysis() {
  const healthScore = Math.floor(Math.random() * 15) + 85; // 85-100
  const riskLevel = healthScore >= 92 ? "Low" : healthScore >= 88 ? "Moderate" : "High";
  const hemoglobin = (11.0 + Math.random() * 2).toFixed(1);
  const bloodPressure = `${Math.floor(115 + Math.random() * 10)} / ${Math.floor(75 + Math.random() * 5)}`;
  const bloodSugar = healthScore >= 90 ? "Normal" : "Needs follow-up";
  const babyGrowth = healthScore >= 90 ? "Healthy" : "Monitor closely";

  return {
    healthScore,
    riskLevel,
    hemoglobin,
    bloodPressure,
    bloodSugar,
    babyGrowth,
    recommendations: [
      "Continue iron and calcium tablets as advised.",
      "Drink at least 3 litres of water daily.",
      "Eat protein-rich food and maintain a balanced diet.",
      "Take adequate rest and avoid stress.",
      "Follow up with your doctor if symptoms continue.",
    ],
  };
}
