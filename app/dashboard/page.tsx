"use client";

import { Activity, HeartPulse, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
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
import { db } from "@/lib/firebase";
import { useAuth } from "../components/auth/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const displayName = userData?.fullName || user?.displayName || "User";
  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 17 ? "Good Afternoon" : "Good Evening";

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
                <h1 className="text-5xl font-bold text-green-600">92%</h1>
                <p className="mt-2 font-semibold text-green-600">Healthy Pregnancy</p>
                <p className="mt-2 text-gray-500">Last Updated: Today</p>
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