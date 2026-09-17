import HealthcareTimeline from "../components/timeline/HealthcareTimeline";
import PremiumPageShell from "../components/PremiumPageShell";

export default function TimelinePage() {
  return (
    <PremiumPageShell
      eyebrow="Journey map"
      title="Care Timeline"
      description="Follow the milestones, support steps, and health actions across your pregnancy experience."
      contentClassName="mx-auto max-w-5xl"
    >
      <div className="rounded-[32px] border border-pink-100 bg-white/80 p-4 shadow-[0_24px_60px_-20px_rgba(190,24,93,0.35)] backdrop-blur-sm sm:p-6">
        <HealthcareTimeline />
      </div>
    </PremiumPageShell>
  );
}
