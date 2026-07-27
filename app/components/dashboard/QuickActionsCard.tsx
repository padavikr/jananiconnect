import Link from "next/link";
import { FileUp, BrainCircuit, Hospital, Phone } from "lucide-react";
import SectionCard from "./SectionCard";

const actions = [
  {
    label: "Upload Report",
    href: "/upload-report",
    icon: FileUp,
    accent: "bg-pink-100 text-pink-700",
  },
  {
    label: "View AI Analysis",
    href: "/ai-analysis",
    icon: BrainCircuit,
    accent: "bg-violet-100 text-violet-700",
  },
  {
    label: "Find Nearby Hospital",
    href: "https://www.google.com/maps/search/hospital+near+me",
    icon: Hospital,
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Emergency Contacts",
    href: "tel:108",
    icon: Phone,
    accent: "bg-amber-100 text-amber-700",
  },
];

export default function QuickActionsCard() {
  return (
    <SectionCard
      title="⚡ Quick Actions"
      icon={<BrainCircuit size={20} />}
      description="Jump to the tools you need"
      accent="bg-sky-100 text-sky-700"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map(({ label, href, icon: Icon, accent }) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-white/80 p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className={`rounded-xl p-2 ${accent}`}>
              <Icon size={16} />
            </div>
            <span className="font-semibold text-gray-800">{label}</span>
          </Link>
        ))}
      </div>
    </SectionCard>
  );
}
