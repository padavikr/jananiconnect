import { FileText, CheckCircle2, CalendarDays, MessageCircleMore, Pill } from "lucide-react";

type PatientCardProps = {
  patientName: string;
  village: string;
  ashaWorker: string;
  riskScore: string;
  appointmentDate: string;
  section: "appointment" | "referral" | "report";
};

export default function PatientCard({
  patientName,
  village,
  ashaWorker,
  riskScore,
  appointmentDate,
  section,
}: PatientCardProps) {
  return (
    <div className="rounded-[24px] border border-pink-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{patientName}</h3>
          <p className="mt-1 text-sm text-gray-500">Village: {village}</p>
        </div>
        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
          AI Risk: {riskScore}
        </span>
      </div>

      <div className="mt-4 rounded-2xl bg-violet-50 p-3 text-sm text-gray-700">
        <p><span className="font-semibold">ASHA Worker:</span> {ashaWorker}</p>
        <p className="mt-1"><span className="font-semibold">Appointment:</span> {appointmentDate}</p>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button className="flex items-center justify-center gap-2 rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm font-semibold text-pink-700 transition hover:bg-pink-100">
          <FileText size={15} /> View Report
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
          <CheckCircle2 size={15} /> Approve Referral
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100">
          <Pill size={15} /> Upload Prescription
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100">
          <CalendarDays size={15} /> Schedule Appointment
        </button>
      </div>

      <div className="mt-4">
        <button className="flex items-center gap-2 rounded-full bg-pink-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-pink-700">
          <MessageCircleMore size={15} /> Send Message to ASHA
        </button>
      </div>

      {section === "report" ? (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          Report uploaded today and pending review.
        </div>
      ) : null}
    </div>
  );
}
