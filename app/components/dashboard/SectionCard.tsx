import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  icon: ReactNode;
  description?: string;
  accent?: string;
  children: ReactNode;
};

export default function SectionCard({
  title,
  icon,
  description,
  accent = "bg-pink-100 text-pink-700",
  children,
}: SectionCardProps) {
  return (
    <div className="rounded-[28px] border border-pink-100 bg-gradient-to-br from-white via-pink-50 to-violet-50 p-6 shadow-[0_16px_45px_-20px_rgba(190,24,93,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_-18px_rgba(190,24,93,0.4)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`rounded-2xl p-2.5 ${accent}`}>{icon}</div>
          <div>
            <h2 className="text-lg font-semibold text-pink-700">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5">{children}</div>
    </div>
  );
}
