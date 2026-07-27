export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lavender-50 via-white to-pink-50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-lavender-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lavender-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-lavender-600 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lavender-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lavender-500" />
            </span>
            AI-Powered Maternal Healthcare
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-lavender-600 via-lavender-500 to-pink-400 bg-clip-text text-transparent">
              JANANI CONNECT
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 sm:text-xl">
            Connecting Pregnant Women, ASHA Workers &amp; Doctors Through AI
          </p>

          <p className="mx-auto mt-4 max-w-xl text-base text-foreground/55">
            A trusted digital bridge for safer pregnancies — personalized health
            insights, community support, and expert care at your fingertips.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/life-stage"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lavender-500 to-lavender-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-lavender-300/40 transition-all hover:from-lavender-600 hover:to-lavender-600 hover:shadow-xl hover:shadow-lavender-300/50 sm:w-auto"
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
            </a>
            <a
              href="#login"
              className="inline-flex w-full items-center justify-center rounded-full border border-lavender-200 bg-white px-8 py-3.5 text-base font-semibold text-lavender-600 shadow-sm transition-all hover:border-lavender-300 hover:bg-lavender-50 hover:shadow-md sm:w-auto"
            >
              Login
            </a>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-foreground/50">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-lavender-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              Secure &amp; Private
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-pink-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              Trusted by Healthcare Workers
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-lavender-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              24/7 Emergency Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
