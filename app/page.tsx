import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureCards />

        <section
          id="get-started"
          className="relative overflow-hidden py-20 lg:py-24"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-lavender-100/60 via-white to-pink-100/60"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
            <div className="rounded-3xl border border-lavender-100 bg-white/80 p-10 shadow-xl shadow-lavender-100/60 backdrop-blur-sm sm:p-14">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Begin Your Journey Today
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/60">
                Join thousands of mothers, ASHA workers, and doctors building a
                healthier future together.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="/life-stage"
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-lavender-500 to-lavender-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-lavender-300/40 transition-all hover:shadow-xl sm:w-auto"
                >
                  Get Started
                </a>
                <a
                  href="/role-selection"
                  className="inline-flex w-full items-center justify-center rounded-full border border-lavender-200 bg-white px-8 py-3.5 text-base font-semibold text-lavender-600 shadow-sm transition-all hover:bg-lavender-50 sm:w-auto"
                >
                  Choose Your Role
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
