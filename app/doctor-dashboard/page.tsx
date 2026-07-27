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
import { doc, getDoc } from "firebase/firestore";
import AuthGuard from "../components/auth/AuthGuard";
import StatCard from "../components/doctor/StatCard";
import PatientCard from "../components/doctor/PatientCard";
import RoleNavigation from "../components/RoleNavigation";
import { db } from "@/lib/firebase";
import { useAuth } from "../components/auth/AuthProvider";

const stats = [
  { title: "Hospital Statistics", value: "24 Active Cases", icon: Activity, accent: "bg-pink-100 text-pink-700" },
  { title: "Today's Appointments", value: "12", icon: ClipboardList, accent: "bg-violet-100 text-violet-700" },
  { title: "High Risk Mothers", value: "5", icon: HeartPulse, accent: "bg-rose-100 text-rose-700" },
  { title: "Pending Referrals", value: "3", icon: AlertTriangle, accent: "bg-amber-100 text-amber-700" },
];

const appointments = [
  {
    patientName: "Lakshmi Devi",
    village: "Kothapalli",
    ashaWorker: "Anitha",
    riskScore: "Low",
    appointmentDate: "Today · 10:30 AM",
    section: "appointment" as const,
  },
  {
    patientName: "Neela Kumari",
    village: "Madanpur",
    ashaWorker: "Sowmya",
    riskScore: "High",
    appointmentDate: "Today · 12:00 PM",
    section: "referral" as const,
  },
];

const reports = [
  {
    patientName: "Rani Rao",
    village: "Shivnagar",
    ashaWorker: "Priya",
    riskScore: "Medium",
    appointmentDate: "Uploaded Today",
    section: "report" as const,
  },
];

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);

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

  const displayName = userData?.fullName || user?.displayName || "Doctor";

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
          {stats.map(({ title, value, icon: Icon, accent }) => (
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
              {appointments.map((patient) => (
                <PatientCard key={patient.patientName} {...patient} />
              ))}
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

            <div className="rounded-[28px] border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-emerald-700" />
                <h2 className="text-xl font-semibold text-emerald-700">Recent Uploaded Reports</h2>
              </div>
              <div className="mt-4 grid gap-4">
                {reports.map((report) => (
                  <PatientCard key={report.patientName} {...report} />
                ))}
              </div>
            </div>
          </section>
        </div>
        </div>
      </div>
    </AuthGuard>
  );
}
