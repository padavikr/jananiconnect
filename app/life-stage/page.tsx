import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { lifeStages } from "./data";
import LifeStageCard from "./components/LifeStageCard";

export const metadata = {
  title: "Choose Your Life Stage | JANANI CONNECT",
  description:
    "Select the stage that best describes you so we can personalize your healthcare journey.",
};

export default function LifeStagePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lavender-50 via-white to-pink-50"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-lavender-200/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="animate-fade-in-up mx-auto max-w-2xl text-center">
              <Link
                href="/"
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
                Back to Home
              </Link>

              <p className="text-sm font-semibold uppercase tracking-widest text-lavender-500">
                Personalize Your Care
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Your Health Journey{" "}
                <span className="bg-gradient-to-r from-lavender-600 to-pink-400 bg-clip-text text-transparent">
                  Starts Here
                </span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-foreground/65 sm:text-xl">
                Select the stage that best describes you so we can personalize
                your care.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {lifeStages.map((stage, index) => (
                <LifeStageCard key={stage.id} stage={stage} index={index} />
              ))}
            </div>

            <p
              className="animate-fade-in mx-auto mt-14 max-w-lg text-center text-sm text-foreground/45"
              style={{ animationDelay: "900ms" }}
            >
              More life stage modules are on the way. Pregnant Woman is available
              now with full AI-powered support.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
