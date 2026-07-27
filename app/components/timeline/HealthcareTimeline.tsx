import { UploadCloud, BrainCircuit, BellRing, Stethoscope, CalendarDays, Sparkles } from "lucide-react";

type TimelineStep = {
  title: string;
  description: string;
  icon: typeof UploadCloud;
};

const steps: TimelineStep[] = [
  {
    title: "Pregnant Woman uploads report",
    description: "Lab reports, scans, or prescriptions are shared securely.",
    icon: UploadCloud,
  },
  {
    title: "AI generates analysis",
    description: "The system creates a health summary with risk insights.",
    icon: BrainCircuit,
  },
  {
    title: "ASHA Worker receives notification",
    description: "A care alert is sent for follow-up and home support.",
    icon: BellRing,
  },
  {
    title: "Doctor reviews report",
    description: "The PHC team evaluates the report and prioritizes action.",
    icon: Stethoscope,
  },
  {
    title: "Appointment scheduled",
    description: "The next visit is arranged based on the latest insights.",
    icon: CalendarDays,
  },
  {
    title: "Mother receives reminder",
    description: "The mother gets a gentle reminder for the upcoming visit.",
    icon: Sparkles,
  },
];

export default function HealthcareTimeline() {
  return (
    <div className="rounded-[28px] border border-pink-100 bg-white/80 p-6 shadow-[0_16px_45px_-20px_rgba(190,24,93,0.25)] backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-pink-700">Care Communication Timeline</h2>
        <p className="mt-1 text-sm text-gray-600">A smooth flow from report upload to appointment reminder.</p>
      </div>

      <div className="relative space-y-5">
        <div className="absolute left-5 top-2 bottom-2 w-[2px] bg-gradient-to-b from-pink-300 via-violet-300 to-emerald-300" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative flex gap-4">
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-pink-600 to-violet-600 text-white shadow-md">
                <Icon size={18} />
              </div>
              <div className="flex-1 rounded-[20px] border border-pink-100 bg-gradient-to-br from-pink-50 to-violet-50 p-4 shadow-sm transition duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-pink-700">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-2 font-semibold text-gray-800">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
