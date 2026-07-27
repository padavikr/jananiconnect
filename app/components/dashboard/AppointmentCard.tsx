import Link from "next/link";
import { CalendarDays, Building2, Stethoscope, ChevronRight } from "lucide-react";
import SectionCard from "./SectionCard";

export default function AppointmentCard() {
  return (
    <SectionCard
      title="📅 Next Appointment"
      icon={<CalendarDays size={20} />}
      description="Your upcoming care visit"
      accent="bg-violet-100 text-violet-700"
    >
      <div className="space-y-3 rounded-2xl bg-white/70 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-100 p-2 text-violet-700">
            <Building2 size={16} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Hospital Name</p>
            <p className="font-semibold text-gray-800">Mother & Child Hospital</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-100 p-2 text-violet-700">
            <Stethoscope size={16} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Doctor Name</p>
            <p className="font-semibold text-gray-800">Dr. Priya Sharma</p>
          </div>
        </div>

        <div className="rounded-xl border border-violet-100 bg-violet-50 p-3 text-sm text-gray-700">
          <p className="font-medium">Date & Time</p>
          <p className="mt-1">Tuesday, 5 Aug 2026 · 10:30 AM</p>
        </div>

        <Link
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
        >
          View Details
          <ChevronRight size={16} />
        </Link>
      </div>
    </SectionCard>
  );
}
