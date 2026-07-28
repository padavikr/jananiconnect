"use client";

import { Activity, HeartPulse, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import AuthGuard from "../components/auth/AuthGuard";
import AppointmentCard from "../components/dashboard/AppointmentCard";
import EmergencySOSCard from "../components/dashboard/EmergencySOSCard";
import RoleNavigation from "../components/RoleNavigation";
import PregnancyTipCard from "../components/dashboard/PregnancyTipCard";
import QuickActionsCard from "../components/dashboard/QuickActionsCard";
import SectionCard from "../components/dashboard/SectionCard";
import VaccinationTrackerCard from "../components/dashboard/VaccinationTrackerCard";
import NearbyHospitals from "../components/NearbyHospitals";
import JananiAIChatbot from "../components/JananiAIChatbot";
import LiveLocationCard from "../components/dashboard/LiveLocationCard";
import { db } from "@/lib/firebase";
import { useAuth } from "../components/auth/AuthProvider";

type ReportRecord = {
  id: string;
  userId: string;
  reportName?: string;
  reportType?: string;
  downloadURL?: string;
  uploadedAt?: { toDate?: () => Date } | null;
  aiAnalysisStatus?: string;
};

type AnalysisRecord = {
  id: string;
  reportId: string;
  userId: string;
  summary?: string;
  abnormalities?: string[];
  healthScore?: number;
  riskLevel?: string;
  diet?: string[];
  precautions?: string[];
  doctorAdvice?: string;
  analysis?: {
    healthSummary?: string;
    summary?: string;
    healthScore?: number;
    riskLevel?: string;
  };
  createdAt?: { toDate?: () => Date } | null;
};

export default function Dashboard() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [latestReport, setLatestReport] = useState<ReportRecord | null>(null);
  const [latestAnalysis, setLatestAnalysis] = useState<AnalysisRecord | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadUserData();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const unsubscribeReports = onSnapshot(collection(db, "reports"), (snapshot) => {
      const reports = snapshot.docs
        .map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<ReportRecord, "id">) }))
        .filter((report) => report.userId === user.uid)
        .sort((a, b) => {
          const aTime = a.uploadedAt?.toDate ? a.uploadedAt.toDate().getTime() : 0;
          const bTime = b.uploadedAt?.toDate ? b.uploadedAt.toDate().getTime() : 0;
          return bTime - aTime;
        });

      setLatestReport(reports[0] ?? null);
    });

    const unsubscribeAnalysis = onSnapshot(collection(db, "aiAnalysis"), (snapshot) => {
      const analyses = snapshot.docs
        .map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<AnalysisRecord, "id">) }))
        .filter((analysis) => analysis.userId === user.uid)
        .sort((a, b) => {
          const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
          const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
          return bTime - aTime;
        });

      setLatestAnalysis(analyses[0] ?? null);
    });

    return () => {
      unsubscribeReports();
      unsubscribeAnalysis();
    };
  }, [user]);

  const displayName = userData?.fullName || user?.displayName || "User";
  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 17 ? "Good Afternoon" : "Good Evening";
  const healthScore = latestAnalysis?.healthScore ?? latestAnalysis?.analysis?.healthScore ?? 0;
  const healthSummary = latestAnalysis?.summary ?? latestAnalysis?.analysis?.summary ?? latestAnalysis?.analysis?.healthSummary ?? "Upload a report to receive your latest AI summary.";
  const riskLevel = latestAnalysis?.riskLevel ?? latestAnalysis?.analysis?.riskLevel ?? "Pending";
  const lastUpdated = latestAnalysis?.createdAt?.toDate
    ? latestAnalysis.createdAt.toDate().toLocaleDateString("en", {
        month: "short",
        day: "numeric",
      })
    : latestReport?.uploadedAt?.toDate
      ? latestReport.uploadedAt.toDate().toLocaleDateString("en", {
          month: "short",
          day: "numeric",
        })
      : "No updates yet";

  return (
    <AuthGuard allowedRoles={["pregnant"]}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.12),_transparent_24%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <RoleNavigation />

        <header className="rounded-[32px] border border-pink-100 bg-white/70 p-6 shadow-[0_16px_45px_-20px_rgba(190,24,93,0.3)] backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
                Welcome back
              </p>
              <h1 className="mt-2 text-3xl font-bold text-pink-700">
                {greeting}, {displayName.split(" ")[0]} 👋
              </h1>
              <p className="mt-2 text-gray-600">
                Welcome to Janani Connect
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-pink-100 bg-pink-50 px-4 py-3 text-sm font-medium text-pink-700">
              <Activity size={18} />
              <span>Pregnancy Care Dashboard</span>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <SectionCard
              title="❤️ AI Health Score"
              icon={<HeartPulse size={20} />}
              description="Your latest wellness summary"
              accent="bg-pink-100 text-pink-700"
            >
              <div className="rounded-[24px] border border-pink-100 bg-white/80 p-5">
                <h1 className="text-5xl font-bold text-green-600">{healthScore ? `${healthScore}%` : "—"}</h1>
                <p className="mt-2 font-semibold text-green-600">
                  {healthScore >= 92 ? "Healthy Pregnancy" : healthScore >= 85 ? "Needs close monitoring" : "Needs review"}
                </p>
                <p className="mt-3 text-sm text-gray-700">{healthSummary}</p>
                <p className="mt-3 text-sm text-gray-500">Risk Level: {riskLevel}</p>
                <p className="mt-2 text-gray-500">Last Updated: {lastUpdated}</p>
              </div>
            </SectionCard>

            <SectionCard
              title="📄 Upload Medical Report"
              icon={<Upload size={20} />}
              description="Share your health report for AI insights"
              accent="bg-violet-100 text-violet-700"
            >
              <p className="text-sm text-gray-600">
                Upload your blood report, scan, prescription or lab report for AI analysis.
              </p>

              <input
                type="file"
                className="mt-4 w-full rounded-xl border border-pink-200 bg-white p-3 text-sm"
              />

              <button className="mt-5 w-full rounded-xl bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700">
                Upload Report
              </button>
            </SectionCard>

            <LiveLocationCard />
          </div>

          <div className="space-y-6">
            <NearbyHospitals />
            <EmergencySOSCard />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <AppointmentCard />
          <PregnancyTipCard />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <VaccinationTrackerCard />
          <QuickActionsCard />
        </div>
      </div>

        <JananiAIChatbot />
      </div>
    </AuthGuard>
  );
}