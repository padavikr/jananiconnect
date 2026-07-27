import { AlertTriangle, CalendarDays, BellRing, HeartPulse, Home, FileText, CheckCircle2 } from "lucide-react";

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
  type: "high-risk" | "appointment" | "medicine" | "visit" | "report" | "referral";
};

const notificationMeta: Record<
  NotificationItem["type"],
  { icon: typeof AlertTriangle; accent: string; ring: string }
> = {
  "high-risk": { icon: AlertTriangle, accent: "bg-rose-100 text-rose-700", ring: "border-rose-200" },
  appointment: { icon: CalendarDays, accent: "bg-pink-100 text-pink-700", ring: "border-pink-200" },
  medicine: { icon: HeartPulse, accent: "bg-violet-100 text-violet-700", ring: "border-violet-200" },
  visit: { icon: Home, accent: "bg-amber-100 text-amber-700", ring: "border-amber-200" },
  report: { icon: FileText, accent: "bg-emerald-100 text-emerald-700", ring: "border-emerald-200" },
  referral: { icon: CheckCircle2, accent: "bg-sky-100 text-sky-700", ring: "border-sky-200" },
};

const notifications: NotificationItem[] = [
  {
    id: 1,
    title: "High Risk Pregnancy",
    message: "Mother needs urgent review due to elevated BP and fatigue.",
    time: "10 mins ago",
    unread: true,
    type: "high-risk",
  },
  {
    id: 2,
    title: "Appointment Reminder",
    message: "ANC follow-up scheduled for tomorrow at 10:30 AM.",
    time: "1 hour ago",
    unread: true,
    type: "appointment",
  },
  {
    id: 3,
    title: "Medicine Reminder",
    message: "Iron tablets and calcium supplements are due now.",
    time: "3 hours ago",
    unread: false,
    type: "medicine",
  },
  {
    id: 4,
    title: "Home Visit Reminder",
    message: "ASHA visit is planned for Kothapalli village this evening.",
    time: "Yesterday",
    unread: false,
    type: "visit",
  },
  {
    id: 5,
    title: "Report Uploaded",
    message: "New lab report has been uploaded and is ready for review.",
    time: "Yesterday",
    unread: true,
    type: "report",
  },
  {
    id: 6,
    title: "Referral Approved",
    message: "The PHC referral for Nirmala was approved successfully.",
    time: "2 days ago",
    unread: false,
    type: "referral",
  },
];

export default function NotificationList() {
  return (
    <div className="rounded-[28px] border border-pink-100 bg-white/80 p-6 shadow-[0_16px_45px_-20px_rgba(190,24,93,0.25)] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-pink-700">Notifications</h2>
          <p className="mt-1 text-sm text-gray-600">Stay updated with important maternal care alerts.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-pink-50 px-3 py-2 text-sm font-semibold text-pink-700">
          <BellRing size={16} />
          {notifications.filter((n) => n.unread).length} New
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {notifications.map((item) => {
          const meta = notificationMeta[item.type];
          const Icon = meta.icon;

          return (
            <div
              key={item.id}
              className={`rounded-[22px] border p-4 transition ${meta.ring} ${
                item.unread ? "bg-pink-50 shadow-sm" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-2xl p-2 ${meta.accent}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{item.message}</p>
                </div>
                {item.unread ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-600" />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
