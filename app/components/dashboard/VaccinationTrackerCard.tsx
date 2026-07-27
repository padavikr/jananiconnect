import { CheckCircle2, CircleDashed } from "lucide-react";
import SectionCard from "./SectionCard";

const vaccinations = [
  { label: "TT Dose 1", status: "Completed" },
  { label: "TT Dose 2", status: "Pending" },
  { label: "Iron Tablets", status: "Completed" },
  { label: "Calcium Tablets", status: "Pending" },
];

export default function VaccinationTrackerCard() {
  return (
    <SectionCard
      title="💉 Vaccination Tracker"
      icon={<CheckCircle2 size={20} />}
      description="Track your care essentials"
      accent="bg-emerald-100 text-emerald-700"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {vaccinations.map(({ label, status }) => (
          <div
            key={label}
            className="rounded-2xl border border-emerald-100 bg-white/80 p-3 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-gray-800">{label}</p>
              {status === "Completed" ? (
                <CheckCircle2 size={16} className="text-emerald-600" />
              ) : (
                <CircleDashed size={16} className="text-amber-500" />
              )}
            </div>
            <p
              className={`mt-2 text-sm font-medium ${
                status === "Completed" ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {status}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
