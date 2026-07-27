type IllustrationProps = {
  className?: string;
};

export function AdolescentIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="50" fill="url(#adoGrad)" opacity="0.25" />
      <circle cx="60" cy="38" r="14" fill="#C4A8FF" />
      <path d="M38 88c4-18 16-26 22-26s18 8 22 26" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M48 52c-6 2-10 8-10 14" stroke="#F9A8D4" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="85" cy="35" r="8" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2" />
      <path d="M82 35l3 3 5-6" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <radialGradient id="adoGrad" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#C4A8FF" />
          <stop offset="1" stopColor="#F9A8D4" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function YoungWomanIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="50" fill="url(#ywGrad)" opacity="0.25" />
      <circle cx="60" cy="36" r="15" fill="#F9A8D4" />
      <path d="M34 90c6-20 18-28 26-28s20 8 26 28" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M78 48l12-8" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="92" cy="38" r="6" fill="#EDE5FF" stroke="#A87FFF" strokeWidth="2" />
      <path d="M42 58h36" stroke="#C4A8FF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <defs>
        <radialGradient id="ywGrad" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#F9A8D4" />
          <stop offset="1" stopColor="#C4A8FF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function PlanningIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="50" fill="url(#planGrad)" opacity="0.25" />
      <circle cx="52" cy="40" r="13" fill="#C4A8FF" />
      <circle cx="72" cy="44" r="11" fill="#F9A8D4" />
      <path d="M38 88c6-16 14-22 22-22s16 6 22 22" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M58 58c4 6 10 8 16 6" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="72" r="10" fill="none" stroke="#A87FFF" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M60 66v4l3 2" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <radialGradient id="planGrad" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#A87FFF" />
          <stop offset="1" stopColor="#F9A8D4" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function PregnantIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="50" fill="url(#pregGrad)" opacity="0.3" />
      <circle cx="60" cy="34" r="14" fill="#C4A8FF" />
      <ellipse cx="60" cy="72" rx="22" ry="20" fill="#FCE7F3" stroke="#F472B6" strokeWidth="2.5" />
      <circle cx="60" cy="74" r="6" fill="#F9A8D4" opacity="0.7" />
      <path d="M44 52c-2 4-2 10 0 14" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
      <path d="M76 52c2 4 2 10 0 14" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 98h24" stroke="#A87FFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <defs>
        <radialGradient id="pregGrad" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#F472B6" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function NewMotherIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="50" fill="url(#nmGrad)" opacity="0.25" />
      <circle cx="58" cy="38" r="13" fill="#F9A8D4" />
      <path d="M36 86c5-16 14-22 22-22s17 6 22 22" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="78" cy="68" rx="10" ry="8" fill="#EDE5FF" stroke="#A87FFF" strokeWidth="2" />
      <circle cx="78" cy="64" r="5" fill="#C4A8FF" />
      <path d="M72 72c2 2 4 3 6 3" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 48c-4-2-8 0-10 4" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" fill="none" />
      <defs>
        <radialGradient id="nmGrad" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#F9A8D4" />
          <stop offset="1" stopColor="#EDE5FF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function MenopauseIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="50" fill="url(#menoGrad)" opacity="0.25" />
      <circle cx="60" cy="36" r="14" fill="#A87FFF" />
      <path d="M34 90c6-18 16-26 26-26s20 8 26 26" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M30 50c8-6 18-8 30-6" stroke="#C4A8FF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <circle cx="88" cy="55" r="10" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="2" />
      <path d="M84 55h8M88 51v8" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 70h24" stroke="#DDD0FF" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <radialGradient id="menoGrad" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#A87FFF" />
          <stop offset="1" stopColor="#FCE7F3" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const illustrationMap = {
  adolescent: AdolescentIllustration,
  "young-woman": YoungWomanIllustration,
  planning: PlanningIllustration,
  pregnant: PregnantIllustration,
  "new-mother": NewMotherIllustration,
  menopause: MenopauseIllustration,
} as const;

export function LifeStageIllustration({
  type,
  className,
}: {
  type: keyof typeof illustrationMap;
  className?: string;
}) {
  const Component = illustrationMap[type];
  return <Component className={className} />;
}
