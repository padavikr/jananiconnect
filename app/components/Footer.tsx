export default function Footer() {
  return (
    <footer className="border-t border-lavender-100 bg-white/60">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-lavender-400 to-pink-300">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </span>
            <span className="text-sm font-semibold text-foreground">
              JANANI CONNECT
            </span>
          </div>
          <p className="text-sm text-foreground/50">
            &copy; {new Date().getFullYear()} JANANI CONNECT. Empowering safer
            pregnancies through AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
