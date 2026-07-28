"use client";

import {
  Activity,
  AlertTriangle,
  ClipboardList,
  FileText,
  HeartPulse,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import AuthGuard from "../components/auth/AuthGuard";
import StatCard from "../components/doctor/StatCard";
import RoleNavigation from "../components/RoleNavigation";
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
  aiAnalysisResult?: {
    healthScore?: number;
    riskLevel?: string;
    healthSummary?: string;
  };
  doctorNotes?: string;
};

const stats = [
  { title: "Hospital Statistics", value: "0 Active Cases", icon: Activity, accent: "bg-pink-100 text-pink-700" },
  { title: "Today's Appointments", value: "0", icon: ClipboardList, accent: "bg-violet-100 text-violet-700" },
  { title: "High Risk Mothers", value: "0", icon: HeartPulse, accent: "bg-rose-100 text-rose-700" },
  { title: "Pending Referrals", value: "0", icon: AlertTriangle, accent: "bg-amber-100 text-amber-700" },
];

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<Record<string, boolean>>({});

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
      }
    };

    void loadUserData();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reports"), (snapshot) => {
      const reportList = snapshot.docs
        .map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<ReportRecord, "id">) }))
        .sort((a, b) => {
          const aTime = a.uploadedAt?.toDate ? a.uploadedAt.toDate().getTime() : 0;
          const bTime = b.uploadedAt?.toDate ? b.uploadedAt.toDate().getTime() : 0;
          return bTime - aTime;
        });
      setReports(reportList);
    });

    return () => unsubscribe();
  }, []);

  const displayName = userData?.fullName || user?.displayName || "Doctor";
  const highRiskCount = reports.filter((report) => (report.aiAnalysisResult?.riskLevel || "Medium") === "High").length;
  const statValues = [
    { title: "Hospital Statistics", value: `${reports.length} Active Cases`, icon: Activity, accent: "bg-pink-100 text-pink-700" },
    { title: "Today's Appointments", value: `${reports.length}`, icon: ClipboardList, accent: "bg-violet-100 text-violet-700" },
    { title: "High Risk Mothers", value: `${highRiskCount}`, icon: HeartPulse, accent: "bg-rose-100 text-rose-700" },
    { title: "Pending Referrals", value: `${Math.max(0, reports.length - 1)}`, icon: AlertTriangle, accent: "bg-amber-100 text-amber-700" },
  ];

  const handleSaveNotes = async (reportId: string) => {
    const note = notesDraft[reportId] || "";
    setSavingNotes((prev) => ({ ...prev, [reportId]: true }));
    try {
      await updateDoc(doc(db, "reports", reportId), { doctorNotes: note });
    } catch (error) {
      console.error("Unable to save notes", error);
    } finally {
      setSavingNotes((prev) => ({ ...prev, [reportId]: false }));
    }
  };

  return (
    <AuthGuard allowedRoles={["doctor"]}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.16),_transparent_25%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-pink-100 bg-white/80 p-6 shadow-[0_24px_60px_-20px_rgba(190,24,93,0.35)] backdrop-blur-sm sm:p-8 lg:p-10">
        <RoleNavigation />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">PHC / Doctor Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-pink-700">Welcome, Dr. {displayName.split(" ")[0]}</h1>
            <p className="mt-2 text-gray-600">Review appointments, referrals, and uploaded reports in one place.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700">
            <Activity size={16} />
            Updated Today
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statValues.map(({ title, value, icon: Icon, accent }) => (
            <StatCard key={title} title={title} value={value} icon={<Icon size={18} />} accent={accent} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[28px] border border-pink-100 bg-gradient-to-br from-white to-pink-50 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-pink-700">Today&apos;s Appointments</h2>
                <p className="mt-1 text-sm text-gray-600">Care plan updates for this morning&apos;s visits.</p>
              </div>
              <div className="rounded-full bg-pink-100 p-3 text-pink-700">
                <ClipboardList size={18} />
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {reports.length === 0 ? (
                <p className="text-sm text-gray-600">No appointments to review yet.</p>
              ) : (
                reports.map((report) => (
                  <div key={report.id} className="rounded-[24px] border border-pink-100 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800">{report.reportName || "Uploaded Report"}</h3>
                    <p className="mt-1 text-sm text-gray-500">{report.reportType || "Document"}</p>
                    <div className="mt-3 rounded-2xl bg-violet-50 p-3 text-sm text-gray-700">
                      <p><span className="font-semibold">AI Analysis:</span> {report.aiAnalysisResult?.healthSummary || "Pending"}</p>
                      <p className="mt-1"><span className="font-semibold">Risk Level:</span> {report.aiAnalysisResult?.riskLevel || "Pending"}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-[28px] border border-violet-100 bg-violet-50/70 p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <HeartPulse size={18} className="text-violet-700" />
                <h2 className="text-xl font-semibold text-violet-700">High Risk Mothers</h2>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { name: "Nirmala Yadav", village: "Shivnagar", score: "High" },
                  { name: "Jaya Menon", village: "Madanpur", score: "High" },
                ].map((item) => (
                  <div key={item.name} className="rounded-2xl border border-violet-100 bg-white px-4 py-3">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.village}</p>
                    <p className="mt-2 text-sm font-semibold text-rose-600">Risk Score: {item.score}</p>
                  </div>
                ))}
              </div>
            </div>

            <LiveLocationCard mode="list" title="Latest Patient Locations" description="Review the latest live coordinates for patients who are sharing location." />

            <div className="rounded-[28px] border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-emerald-700" />
                <h2 className="text-xl font-semibold text-emerald-700">Recent Uploaded Reports</h2>
              </div>
              <div className="mt-4 grid gap-4">
                {reports.length === 0 ? (
                  <p className="text-sm text-gray-600">No uploaded reports yet.</p>
                ) : (
                  reports.map((report) => {
                    const risk = report.aiAnalysisResult?.riskLevel || "Medium";
                    const score = report.aiAnalysisResult?.healthScore ? `${report.aiAnalysisResult.healthScore}/100` : "Pending";
                    return (
                      <div key={report.id} className="rounded-[24px] border border-pink-100 bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{report.reportName || "Uploaded Report"}</h3>
                            <p className="mt-1 text-sm text-gray-500">{report.reportType || "Document"}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${risk === "High" ? "bg-rose-100 text-rose-700" : risk === "Medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                            AI Risk: {risk}
                          </span>
                        </div>

                        <div className="mt-4 rounded-2xl bg-violet-50 p-3 text-sm text-gray-700">
                          <p><span className="font-semibold">Health Score:</span> {score}</p>
                          <p className="mt-1"><span className="font-semibold">AI Summary:</span> {report.aiAnalysisResult?.healthSummary || "Analysis pending"}</p>
                        </div>

                        <div className="mt-4 rounded-2xl border border-pink-100 bg-pink-50 p-3 text-sm text-gray-700">
                          <p className="font-semibold text-pink-700">Doctor Notes</p>
                          <textarea
                            value={notesDraft[report.id] ?? report.doctorNotes ?? ""}
                            onChange={(event) =>
                              setNotesDraft((prev) => ({ ...prev, [report.id]: event.target.value }))
                            }
                            className="mt-2 w-full rounded-xl border border-pink-200 bg-white p-2 text-sm"
                            rows={3}
                            placeholder="Add notes for this case"
                          />
                          <button
                            onClick={() => handleSaveNotes(report.id)}
                            disabled={savingNotes[report.id]}
                            className="mt-3 rounded-full bg-pink-600 px-3 py-2 text-sm font-semibold text-white"
                          >
                            {savingNotes[report.id] ? "Saving..." : "Save Notes"}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </div>
        </div>
      </div>
    </AuthGuard>
  );
}
