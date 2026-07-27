import HealthcareTimeline from "../components/timeline/HealthcareTimeline";

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.16),_transparent_25%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <HealthcareTimeline />
      </div>
    </div>
  );
}
