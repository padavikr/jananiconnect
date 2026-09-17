import type { ReactNode } from "react";

type PremiumPageShellProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function PremiumPageShell({
  eyebrow,
  title,
  description,
  children,
  className = "",
  contentClassName = "",
}: PremiumPageShellProps) {
  return (
    <div
      className={`min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.16),_transparent_25%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] px-4 py-6 sm:px-6 lg:px-8 ${className}`.trim()}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        {(eyebrow || title || description) ? (
          <header className="overflow-hidden rounded-[32px] border border-pink-100 bg-white/80 shadow-[0_24px_60px_-20px_rgba(190,24,93,0.35)] backdrop-blur-sm">
            <div className="rounded-[32px] bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 p-6 text-white sm:p-8">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  {eyebrow ? (
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-white" />
                      {eyebrow}
                    </div>
                  ) : null}
                  {title ? <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h1> : null}
                  {description ? <p className="mt-2 max-w-2xl text-sm text-pink-50 sm:text-base">{description}</p> : null}
                </div>
              </div>
            </div>
          </header>
        ) : null}

        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}
