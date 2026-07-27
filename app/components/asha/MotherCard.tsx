"use client";

import { AlertTriangle, PhoneCall, Stethoscope, Weight, Droplets, Eye } from "lucide-react";
import { useState } from "react";
import ReferralModal from "./ReferralModal";

type MotherCardProps = {
  name: string;
  week: string;
  village: string;
  risk: "Low" | "Medium" | "High";
  score: string;
  status: "Pending" | "Visited" | "High Risk";
};

const riskStyles = {
  Low: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
};

const statusStyles = {
  Pending: "bg-pink-100 text-pink-700",
  Visited: "bg-violet-100 text-violet-700",
  "High Risk": "bg-rose-100 text-rose-700",
};

export default function MotherCard({
  name,
  week,
  village,
  risk,
  score,
  status,
}: MotherCardProps) {
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  return (
    <>
    <div className="rounded-[24px] border border-pink-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="mt-1 text-sm text-gray-500">{village}</p>
        </div>
        <div className={`rounded-full px-3 py-1 text-xs font-semibold ${riskStyles[risk]}`}>
          AI Risk: {risk}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-pink-50 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-pink-500">Pregnancy Week</p>
          <p className="mt-1 font-semibold text-gray-800">{week}</p>
        </div>
        <div className="rounded-2xl bg-violet-50 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-500">Health Score</p>
          <p className="mt-1 font-semibold text-gray-800">{score}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button className="flex items-center justify-center gap-2 rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm font-semibold text-pink-700 transition hover:bg-pink-100">
          <Eye size={15} /> View Profile
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100">
          <Stethoscope size={15} /> Update BP
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
          <Weight size={15} /> Update Weight
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100">
          <Droplets size={15} /> Update Hb
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setIsReferralOpen(true)}
          className="flex items-center gap-2 rounded-full bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
        >
          <AlertTriangle size={15} /> Refer to PHC
        </button>
        <button className="flex items-center gap-2 rounded-full bg-pink-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-pink-700">
          <PhoneCall size={15} /> Emergency Call
        </button>
      </div>
    </div>
    <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} />
    </>
  );
}
