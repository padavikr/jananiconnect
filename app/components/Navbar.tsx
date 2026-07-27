import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-lavender-100/80 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-lavender-400 to-pink-300 shadow-md shadow-lavender-200/50">
            <svg
              className="h-5 w-5 text-white"
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
          <span className="text-lg font-bold tracking-tight text-foreground">
            JANANI CONNECT
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/role-selection"
            className="hidden text-sm font-medium text-foreground/70 transition-colors hover:text-lavender-600 sm:inline-block"
          >
            Role Selection
          </Link>
          <Link
            href="/dashboard"
            className="hidden text-sm font-medium text-foreground/70 transition-colors hover:text-lavender-600 md:inline-block"
          >
            Pregnant Dashboard
          </Link>
          <Link
            href="/asha_dashboard"
            className="hidden text-sm font-medium text-foreground/70 transition-colors hover:text-lavender-600 lg:inline-block"
          >
            ASHA Dashboard
          </Link>
          <a
            href="#login"
            className="rounded-full border border-lavender-200 bg-white px-5 py-2.5 text-sm font-semibold text-lavender-600 shadow-sm transition-all hover:border-lavender-300 hover:bg-lavender-50 hover:shadow-md"
          >
            Login
          </a>
        </div>
      </nav>
    </header>
  );
}
