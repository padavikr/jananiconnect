import NotificationList from "../components/notifications/NotificationList";
import PremiumPageShell from "../components/PremiumPageShell";

export default function NotificationsPage() {
  return (
    <PremiumPageShell
      eyebrow="Care updates"
      title="Notifications"
      description="Stay on top of appointments, reminders, and the latest guidance for your pregnancy journey."
      contentClassName="mx-auto max-w-5xl"
    >
      <div className="rounded-[32px] border border-pink-100 bg-white/80 p-4 shadow-[0_24px_60px_-20px_rgba(190,24,93,0.35)] backdrop-blur-sm sm:p-6">
        <NotificationList />
      </div>
    </PremiumPageShell>
  );
}
