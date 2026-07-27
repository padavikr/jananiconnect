import Link from "next/link";

const features = [
  {
    title: "AI Health Summary",
    description:
      "Get personalized AI-generated health summaries based on your trimester, symptoms, and medical history — helping you stay informed every step of the way.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
    gradient: "from-lavender-500 to-lavender-400",
    bgAccent: "bg-lavender-50",
  },
  {
    title: "ASHA Support",
    description:
      "Connect directly with ASHA workers in your community for guidance, home visits, and continuous care throughout your pregnancy journey.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
    gradient: "from-pink-400 to-pink-300",
    bgAccent: "bg-pink-50",
  },
  {
    title: "Doctor Dashboard",
    description:
      "Doctors access real-time patient data, AI insights, and appointment management — enabling faster, more informed clinical decisions.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75"
        />
      </svg>
    ),
    gradient: "from-lavender-400 to-pink-300",
    bgAccent: "bg-lavender-50",
  },
  {
    title: "Emergency Assistance",
    description:
      "One-tap emergency alerts connect you instantly with nearby healthcare facilities and your assigned care team when every second counts.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    ),
    gradient: "from-pink-500 to-pink-400",
    bgAccent: "bg-pink-50",
  },
  {
    title: "ASHA Worker",
    description:
      "Monitor pregnant women, manage home visits, update health records and refer high-risk mothers with guided care coordination.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
    gradient: "from-violet-500 to-violet-400",
    bgAccent: "bg-violet-50",
    href: "/asha-dashboard",
  },
  {
    title: "PHC / Doctor",
    description:
      "Review referrals, monitor high-risk pregnancies, schedule appointments and upload prescriptions for faster clinical decisions.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6.75v6.75"
        />
      </svg>
    ),
    gradient: "from-emerald-500 to-emerald-400",
    bgAccent: "bg-emerald-50",
    href: "/doctor-dashboard",
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-lavender-500">
            Platform Features
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Comprehensive Care, Connected
          </p>
          <p className="mt-4 text-lg text-foreground/60">
            Everything you need for a safe and supported pregnancy — powered by
            AI and backed by real healthcare professionals.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {features.map((feature) => {
            const cardContent = (
              <>
                <div
                  className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed text-foreground/65">
                  {feature.description}
                </p>

                <div
                  className={`pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full ${feature.bgAccent} opacity-60 transition-transform duration-300 group-hover:scale-125`}
                  aria-hidden="true"
                />
              </>
            );

            if (feature.href) {
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group relative overflow-hidden rounded-2xl border border-lavender-100 bg-white p-8 shadow-lg shadow-lavender-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-lavender-200 hover:shadow-xl hover:shadow-lavender-200/60"
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-lavender-100 bg-white p-8 shadow-lg shadow-lavender-100/50 transition-all duration-300 hover:-translate-y-1 hover:border-lavender-200 hover:shadow-xl hover:shadow-lavender-200/60"
              >
                {cardContent}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
