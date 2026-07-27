import Link from "next/link";
import type { ReactNode } from "react";

type RoleSelectionCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  accent: string;
};

export default function RoleSelectionCard({
  title,
  description,
  href,
  icon,
  accent,
}: RoleSelectionCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-[28px] border border-pink-100 bg-white/80 p-6 shadow-[0_20px_50px_-20px_rgba(190,24,93,0.3)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-18px_rgba(190,24,93,0.4)]"
    >
      <div className={`inline-flex rounded-2xl p-3 ${accent}`}>
        {icon}
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-pink-700">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
      <div className="mt-6 inline-flex items-center rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-700 transition group-hover:bg-pink-100">
        Open Dashboard →
      </div>
    </Link>
  );
}
