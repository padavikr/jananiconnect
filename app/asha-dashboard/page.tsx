"use client";

import { Activity, ClipboardCheck, Home, Users, Stethoscope, CalendarDays, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import AuthGuard from "../components/auth/AuthGuard";
import SummaryCard from "../components/asha/SummaryCard";
import MotherCard from "../components/asha/MotherCard";
import RoleNavigation from "../components/RoleNavigation";
import { db } from "@/lib/firebase";
import { useAuth } from "../components/auth/AuthProvider";

const summaryCards = [
  { title: "Total Mothers", value: "48", icon: Users, accent: "bg-pink-100 text-pink-700" },
  { title: "Pending Visits", value: "7", icon: CalendarDays, accent: "bg-violet-100 text-violet-700" },
  { title: "High Risk Cases", value: "4", icon: AlertTriangle, accent: "bg-rose-100 text-rose-700" },
  { title: "Completed Visits", value: "21", icon: ClipboardCheck, accent: "bg-emerald-100 text-emerald-700" },
];

const mothers = [
  {
    name: "Lakshmi Devi",
    week: "24 Weeks",
    village: "Kothapalli",
    risk: "Low" as const,
    score: "92 / 100",
    status: "Pending" as const,
  },
  {
    name: "Rani Rao",
    week: "28 Weeks",
    village: "Madanpur",
    risk: "Medium" as const,
    score: "84 / 100",
    status: "Visited" as const,
  },
  {
    name: "Nirmala Yadav",
    week: "31 Weeks",
    village: "Shivnagar",
    risk: "High" as const,
    score: "76 / 100",
    status: "High Risk" as const,
  },
];

export default function ASHADashboard() {
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

  const displayName = userData?.fullName || user?.displayName || "ASHA Worker";
  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <AuthGuard allowedRoles={["asha"]}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.16),_transparent_25%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-pink-100 bg-white/80 p-6 shadow-[0_24px_60px_-20px_rgba(190,24,93,0.35)] backdrop-blur-sm sm:p-8 lg:p-10">
        <RoleNavigation />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">ASHA Worker Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-pink-700">{greeting}, {displayName.split(" ")[0]} 👋</h1>
            <p className="mt-2 text-gray-600">Today&apos;s visits and maternal care updates are ready.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700">
            <Activity size={16} />
            Live Overview
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map(({ title, value, icon: Icon, accent }) => (
            <SummaryCard key={title} title={title} value={value} icon={<Icon size={18} />} accent={accent} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[28px] border border-pink-100 bg-gradient-to-br from-white to-pink-50 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-pink-700">Today&apos;s Visits</h2>
                <p className="mt-1 text-sm text-gray-600">Prioritize care for mothers needing follow-up.</p>
              </div>
              <div className="rounded-full bg-pink-100 p-3 text-pink-700">
                <Stethoscope size={18} />
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {mothers.map((mother) => (
                <MotherCard key={mother.name} {...mother} />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-[28px] border border-violet-100 bg-violet-50/70 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-violet-700">Village Pregnant Women List</h2>
              <div className="mt-4 space-y-3">
                {[
                  { name: "Suma", village: "Kothapalli", week: "22 Weeks" },
                  { name: "Meera", village: "Madanpur", week: "26 Weeks" },
                  { name: "Kavitha", village: "Shivnagar", week: "30 Weeks" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-2xl border border-violet-100 bg-white px-4 py-3">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.village}</p>
                    </div>
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
                      {item.week}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-emerald-700">Care Reminder</h2>
              <p className="mt-2 text-gray-700">Ensure BP, weight, and hemoglobin updates are completed during the current village visit round.</p>
            </div>
          </section>
        </div>
        </div>
      </div>
    </AuthGuard>
  );
}
