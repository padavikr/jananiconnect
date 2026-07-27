import Link from "next/link";
import { HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import RoleNavigation from "../components/RoleNavigation";
import RoleSelectionCard from "../components/RoleSelectionCard";

const roles = [
  {
    title: "Pregnant Woman",
    description:
      "Track pregnancy, upload reports, access AI health analysis, manage appointments, chat with Janani AI, and access emergency support.",
    href: "/dashboard",
    icon: <HeartPulse size={24} />,
    accent: "bg-pink-100 text-pink-700",
  },
  {
    title: "ASHA Worker",
    description:
      "Monitor pregnant women in assigned villages, schedule home visits, update health records, and refer high-risk mothers when needed.",
    href: "/asha-dashboard",
    icon: <ShieldCheck size={24} />,
    accent: "bg-violet-100 text-violet-700",
  },
  {
    title: "PHC / Doctor",
    description:
      "Review referrals, monitor high-risk pregnancies, examine uploaded reports, schedule appointments, and coordinate with ASHA workers.",
    href: "/doctor-dashboard",
    icon: <Stethoscope size={24} />,
    accent: "bg-emerald-100 text-emerald-700",
  },
];

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.16),_transparent_25%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-pink-100 bg-white/80 p-8 shadow-[0_24px_60px_-20px_rgba(190,24,93,0.35)] backdrop-blur-sm sm:p-10 lg:p-12">
          <RoleNavigation />

          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
              Choose Your Role
            </p>
            <h1 className="mt-3 text-4xl font-bold text-pink-700 sm:text-5xl">
              Start your care journey with the right support.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Janani Connect brings pregnant women, ASHA workers, and doctors together in one intelligent healthcare experience.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {roles.map((role) => (
              <RoleSelectionCard key={role.title} {...role} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-pink-200 bg-white px-5 py-3 text-sm font-semibold text-pink-700 transition hover:bg-pink-50"
            >
              Back to Home
            </Link>
            <Link
              href="/pregnancy"
              className="rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Explore Pregnancy Journey
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
