import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthGuard from "../../components/auth/AuthGuard";
import OnboardingForm from "./components/OnboardingForm";

export const metadata = {
  title: "Onboarding | JANANI CONNECT",
  description:
    "Set up your personalized pregnancy care profile with JANANI CONNECT.",
};

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <div className="flex min-h-full flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-28">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lavender-50 via-white to-pink-50"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-lavender-200/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl px-6 lg:px-8">
            <Link
              href="/pregnancy"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-lavender-500 transition-colors hover:text-lavender-600"
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
              Back to Pregnancy Module
            </Link>

            <div className="rounded-3xl border border-lavender-100 bg-white/90 p-8 shadow-xl shadow-lavender-100/50 backdrop-blur-sm sm:p-10">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender-500 to-pink-400 text-white shadow-md shadow-lavender-200/50">
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.502 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  Create Your Profile
                </h1>
                <p className="mt-2 text-sm text-foreground/60 sm:text-base">
                  A few details help us personalize your pregnancy care journey.
                </p>
              </div>

              <OnboardingForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </AuthGuard>
  );
}
