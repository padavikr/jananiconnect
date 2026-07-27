import { Sparkles, HeartHandshake } from "lucide-react";
import SectionCard from "./SectionCard";

export default function PregnancyTipCard() {
  return (
    <SectionCard
      title="🌸 Daily Pregnancy Tip"
      icon={<Sparkles size={20} />}
      description="A gentle reminder for today"
      accent="bg-violet-100 text-violet-700"
    >
      <div className="rounded-[24px] border border-violet-100 bg-gradient-to-br from-violet-50 to-pink-50 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white p-2 text-violet-700 shadow-sm">
            <HeartHandshake size={18} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            Today&apos;s wellness focus
          </p>
        </div>

        <p className="mt-4 text-lg font-semibold text-gray-800">
          Stay hydrated and take a short walk after meals to support healthy blood flow and comfort.
        </p>
      </div>
    </SectionCard>
  );
}
