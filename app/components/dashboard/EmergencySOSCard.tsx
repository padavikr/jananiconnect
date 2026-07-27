import { AlertTriangle, PhoneCall, MapPin, MessageCircleMore } from "lucide-react";
import SectionCard from "./SectionCard";

const actions = [
  {
    label: "Call 108",
    description: "Immediate ambulance support",
    href: "tel:108",
    icon: PhoneCall,
    accent: "bg-red-100 text-red-700",
  },
  {
    label: "Share Live Location",
    description: "Send your location to trusted contacts",
    href: "https://www.google.com/maps",
    icon: MapPin,
    accent: "bg-amber-100 text-amber-700",
  },
  {
    label: "Call Emergency Contact",
    description: "Reach out to your saved guardian",
    href: "tel:+919876543210",
    icon: MessageCircleMore,
    accent: "bg-violet-100 text-violet-700",
  },
];

export default function EmergencySOSCard() {
  return (
    <SectionCard
      title="🚨 Emergency SOS"
      icon={<AlertTriangle size={20} />}
      description="Quick access to immediate help"
      accent="bg-red-100 text-red-700"
    >
      <div className="space-y-3">
        {actions.map(({ label, description, href, icon: Icon, accent }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white/80 p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className={`rounded-xl p-2 ${accent}`}>
                <Icon size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{label}</p>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-pink-600">Open</span>
          </a>
        ))}
      </div>
    </SectionCard>
  );
}
