import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Pregnancy Module | JANANI CONNECT",
  description:
    "AI-powered pregnancy care with trimester tracking, ASHA support, and doctor connections.",
};

export default function PregnancyPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-lavender-50"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <Link
              href="/life-stage"
              className="animate-fade-in-up mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-lavender-500 transition-colors hover:text-lavender-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to Life Stages
            </Link>

            <div className="animate-fade-in-up mx-auto max-w-2xl rounded-3xl border border-lavender-100 bg-white/80 p-10 shadow-xl shadow-lavender-100/60 backdrop-blur-sm sm:p-14">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender-500 to-pink-400 text-white shadow-lg shadow-lavender-300/40">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Pregnancy Module
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-foreground/65">
                Welcome to your personalized pregnancy care hub. Track your
                trimester, connect with ASHA workers and doctors, and access
                AI-powered health summaries — all in one place.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  "AI Health Summary",
                  "ASHA Support",
                  "Emergency Assistance",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-lavender-100 bg-lavender-50/50 px-4 py-3 text-sm font-medium text-lavender-600"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href="/auth/login"
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lavender-500 to-lavender-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-lavender-300/40 transition-all hover:shadow-xl"
              >
                Get Started
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
