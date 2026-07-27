import type { ReactNode } from "react";

type SummaryCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  accent: string;
};

export default function SummaryCard({ title, value, icon, accent }: SummaryCardProps) {
  return (
    <div className="rounded-[24px] border border-pink-100 bg-white p-5 shadow-sm">
      <div className={`inline-flex rounded-2xl p-3 ${accent}`}>{icon}</div>
      <p className="mt-4 text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
