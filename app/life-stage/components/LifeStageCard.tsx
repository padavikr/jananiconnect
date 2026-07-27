import Link from "next/link";
import type { ReactNode } from "react";
import type { LifeStage } from "../data";
import { LifeStageIllustration } from "./LifeStageIllustrations";

type LifeStageCardProps = {
  stage: LifeStage;
  index: number;
};

export default function LifeStageCard({ stage, index }: LifeStageCardProps) {
  const isAvailable = stage.href !== null;

  return (
    <article
      className="group animate-fade-in-up relative flex flex-col overflow-hidden rounded-3xl border border-lavender-100 bg-white shadow-lg shadow-lavender-100/40 transition-all duration-500 hover:-translate-y-2 hover:border-lavender-200 hover:shadow-2xl hover:shadow-lavender-200/50"
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      {!isAvailable && (
        <span className="absolute right-4 top-4 z-10 rounded-full border border-lavender-200/80 bg-white/90 px-3 py-1 text-xs font-medium tracking-wide text-lavender-500 shadow-sm backdrop-blur-sm">
          Coming Soon
        </span>
      )}

      <div
        className={`relative flex items-center justify-center overflow-hidden ${stage.iconBg} px-6 py-8`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent"
          aria-hidden="true"
        />
        <LifeStageIllustration
          type={stage.illustration}
          className="h-28 w-28 transition-transform duration-500 group-hover:scale-110 sm:h-32 sm:w-32"
        />
        <div
          className={`pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br ${stage.accent} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40`}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5">
        <div
          className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stage.accent} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}
        >
          <StageIcon type={stage.illustration} />
        </div>

        <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {stage.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/60 sm:text-base">
          {stage.description}
        </p>

        <div className="mt-6">
          {isAvailable ? (
            <Link
              href={stage.href!}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lavender-500 to-lavender-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-lavender-300/30 transition-all duration-300 hover:from-lavender-600 hover:to-lavender-600 hover:shadow-lg hover:shadow-lavender-300/40"
            >
              Continue
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
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
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-lavender-100 bg-lavender-50/50 px-6 py-3 text-sm font-semibold text-foreground/35"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function StageIcon({ type }: { type: LifeStage["illustration"] }) {
  const icons: Record<LifeStage["illustration"], ReactNode> = {
    adolescent: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    "young-woman": (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    planning: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    pregnant: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    "new-mother": (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    menopause: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  };

  return icons[type];
}
