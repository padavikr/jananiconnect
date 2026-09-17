'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CircleAlert,
  ClipboardCheck,
  HeartPulse,
  Hospital,
  Microscope,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Baby,
  CalendarDays,
  Pill,
  Siren,
  Wifi,
  Smartphone,
  ScanLine,
  Activity,
  BookOpen,
  BellRing,
  FileText,
  Monitor,
  Stars,
  Waves,
  PersonStanding,
  Syringe,
  TestTube2,
  House,
  CheckCircle2,
  MoveRight,
  ArrowUpRight,
  Trees,
} from 'lucide-react';

type Slide = {
  id: number;
  eyebrow: string;
  title: string;
  subtitle?: string;
  description?: string;
  accent: string;
  highlight?: string;
};

const slides: Slide[] = [
  {
    id: 1,
    eyebrow: 'AI-POWERED WOMEN’S HEALTHCARE ECOSYSTEM',
    title: 'Arogya Sakhi',
    subtitle: 'Empowering Women Through Connected, AI-Driven Healthcare',
    description:
      'A premium digital ecosystem that supports women through every stage of life with intelligent, compassionate care.',
    accent: 'from-[#8b5cf6] via-[#c4a8ff] to-[#fdf2f8]',
    highlight: 'Connected care for every milestone',
  },
  {
    id: 2,
    eyebrow: 'THE CHALLENGE',
    title: 'Healthcare remains fragmented, reactive, and difficult to navigate.',
    description:
      'Women often face scattered records, confusing reports, missed appointments, poor coordination, and unequal access to care.',
    accent: 'from-[#fdf2f8] to-[#ede5ff]',
    highlight: 'Care should be proactive, not reactive.',
  },
  {
    id: 3,
    eyebrow: 'OUR SOLUTION',
    title: 'One connected platform. One intelligent care journey.',
    description:
      'Arogya Sakhi brings women, doctors, hospitals, ASHA workers, and AI into a single ecosystem for continuous, trusted support.',
    accent: 'from-[#fce7f3] to-[#f8f5ff]',
    highlight: 'Human care, amplified by intelligence.',
  },
  {
    id: 4,
    eyebrow: 'LIFE-STAGE CARE',
    title: 'Supporting every stage of life with compassionate continuity.',
    description:
      'Pregnancy is fully implemented today, while the remaining modules are designed for scalable expansion across the lifecycle.',
    accent: 'from-[#ede5ff] to-[#fdf2f8]',
    highlight: 'Built for growth, ready for impact.',
  },
  {
    id: 5,
    eyebrow: 'USER JOURNEY',
    title: 'From discovery to daily care, in one seamless flow.',
    description:
      'Every step is designed to feel clear, reassuring, and human—from first access to ongoing support.',
    accent: 'from-[#f8f5ff] to-[#fce7f3]',
    highlight: 'Simple journeys create stronger trust.',
  },
  {
    id: 6,
    eyebrow: 'PREGNANCY DASHBOARD',
    title: 'A personalised healthcare companion for every expectant mother.',
    description:
      'The dashboard unifies reminders, guidance, community access, and medical visibility in one elegant experience.',
    accent: 'from-[#fdf2f8] to-[#ede5ff]',
    highlight: 'Care that feels close, calm, and clear.',
  },
  {
    id: 7,
    eyebrow: 'AI REPORT ANALYSIS',
    title: 'Complex medical information made understandable.',
    description:
      'Reports can be uploaded through PDF, image, or camera scan and transformed into simple insights, alerts, and next steps.',
    accent: 'from-[#fce7f3] to-[#fff]',
    highlight: 'Clarity when it matters most.',
  },
  {
    id: 8,
    eyebrow: 'CONNECTED ECOSYSTEM',
    title: 'A healthcare network built around the woman.',
    description:
      'Local communities, awareness sessions, anonymous discussions, plus updates on schemes and health education connect every layer of support.',
    accent: 'from-[#f8f5ff] to-[#fdf2f8]',
    highlight: 'Care becomes collective and community-led.',
  },
  {
    id: 9,
    eyebrow: 'PROFESSIONAL DASHBOARDS',
    title: 'Built for ASHA workers, doctors, and administrators alike.',
    description:
      'Each role sees the right information at the right time: visits, follow-ups, referrals, insights, and alerts.',
    accent: 'from-[#ede5ff] to-[#fce7f3]',
    highlight: 'Better coordination leads to better outcomes.',
  },
  {
    id: 10,
    eyebrow: 'AI INNOVATION',
    title: 'Intelligence that turns complexity into compassionate guidance.',
    description:
      'Gemini AI, OCR-enabled reading, risk insights, nutrition guidance, reminders, and multilingual support create a deeply personalised experience.',
    accent: 'from-[#fdf2f8] to-[#ede5ff]',
    highlight: 'Personalised care, at scale.',
  },
  {
    id: 11,
    eyebrow: 'TECHNOLOGY ARCHITECTURE',
    title: 'A modern stack designed for trust, speed, and scale.',
    description:
      'Built on a premium digital foundation with responsive experiences, real-time data, AI capabilities, and reliable delivery.',
    accent: 'from-[#f8f5ff] to-[#fce7f3]',
    highlight: 'Technology that supports human impact.',
  },
  {
    id: 12,
    eyebrow: 'FUTURE IMPACT',
    title: 'Arogya Sakhi is more than an app—it is a connected healthcare ecosystem.',
    description:
      'From earlier detection to stronger collaboration and wider access, the vision extends across all life stages with measurable impact.',
    accent: 'from-[#ede5ff] to-[#fdf2f8]',
    highlight: 'Empowering every woman with intelligent, accessible, continuous care.',
  },
];

const stages = [
  { label: 'Adolescent Girl', icon: PersonStanding },
  { label: 'Young Woman', icon: Users },
  { label: 'Planning Pregnancy', icon: HeartPulse },
  { label: 'Pregnancy', icon: Baby, active: true },
  { label: 'New Mother', icon: House },
  { label: 'Menopause & Healthy Ageing', icon: Stars },
];

const journeySteps = [
  'Landing Page',
  'Life Stage Selection',
  'Login',
  'Pregnancy Onboarding',
  'Pregnancy Dashboard',
  'Medical Report Upload',
  'AI Report Analysis',
  'Community',
  'ASHA Dashboard',
  'Doctor Dashboard',
];

const features = [
  { label: 'Pregnancy Week Tracker', icon: CalendarDays },
  { label: 'Baby Growth', icon: Baby },
  { label: 'AI Health Score', icon: Activity },
  { label: 'Appointment Reminder', icon: BellRing },
  { label: 'Medicine Reminder', icon: Pill },
  { label: 'Assigned Doctor', icon: Stethoscope },
  { label: 'Assigned ASHA Worker', icon: ShieldCheck },
  { label: 'Health Tips', icon: BookOpen },
  { label: 'Emergency SOS', icon: Siren },
  { label: 'Community Access', icon: Users },
];

const reportOutputs = [
  'Simple explanations',
  'Risk level',
  'Important findings',
  'Nutrition suggestions',
  'Doctor recommendations',
  'Visit reminders',
  'Emergency alerts',
];

const ecosystemPillars = [
  'Women',
  'Doctors',
  'Hospitals',
  'ASHA Workers',
  'AI',
  'Community',
];

const professionalCards = [
  {
    title: 'ASHA Worker Dashboard',
    points: [
      'Assigned mothers',
      'Home visits',
      'Vaccination tracking',
      'Medicine distribution',
      'Follow-ups',
      'Report uploads',
      'Emergency alerts',
    ],
    icon: HeartPulse,
  },
  {
    title: 'Doctor Dashboard',
    points: [
      'AI summaries',
      'Patient management',
      'Appointments',
      'Prescriptions',
      'Medical notes',
      'Referrals',
      'Emergency notifications',
    ],
    icon: Stethoscope,
  },
  {
    title: 'Admin Dashboard',
    points: [
      'Analytics',
      'User management',
      'District-wise reports',
      'Maternal risk monitoring',
    ],
    icon: Monitor,
  },
];

const innovations = [
  'Gemini AI',
  'OCR Report Reading',
  'AI Health Insights',
  'Risk Prediction',
  'Nutrition Guidance',
  'Smart Reminders',
  'Multilingual Chatbot',
  'Voice Assistant',
];

const techLayers = [
  { title: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { title: 'Backend', items: ['Firebase Authentication', 'Firestore Database', 'Firebase Storage'] },
  { title: 'AI', items: ['Gemini API'] },
  { title: 'Notifications', items: ['Firebase Cloud Messaging'] },
  { title: 'Deployment', items: ['Vercel'] },
];

const futureFocus = [
  'Digital Health Passport',
  'Telemedicine',
  'Wearable Device Integration',
  'Ambulance Tracking',
  'Predictive Healthcare Analytics',
  'Offline Rural Access',
  'Expansion across all life stages',
];

const impactStats = [
  'Earlier disease detection',
  'Better maternal outcomes',
  'Improved healthcare accessibility',
  'Reduced missed appointments',
  'Stronger collaboration',
  'AI-powered personalised healthcare',
];

export default function PresentationPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        setActiveSlide((current) => (current + 1) % slides.length);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const slide = slides[activeSlide];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(196,168,255,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.16),_transparent_30%),linear-gradient(135deg,_#fcfbff_0%,_#fdf7ff_45%,_#fff8fc_100%)] px-4 py-4 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col rounded-[32px] border border-white/80 bg-white/70 p-3 shadow-[0_35px_90px_rgba(139,92,246,0.14)] backdrop-blur-xl sm:p-4">
        <header className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[#f1e9ff] bg-white/80 px-4 py-3 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8b5cf6]">JANANI CONNECT</p>
            <h1 className="text-lg font-semibold text-slate-900">Arogya Sakhi • Hackathon Pitch</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#f3e6ff] bg-[#fdf8ff] px-3 py-2 text-sm text-slate-600">
            <Sparkles size={16} className="text-[#8b5cf6]" />
            Premium healthcare storytelling deck
          </div>
        </header>

        <section className="flex-1 overflow-hidden rounded-[28px] border border-[#f5ebff] bg-gradient-to-br from-[#fcfbff] via-white to-[#fff7fb] p-3 sm:p-4 lg:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#f6ebff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#7c3aed]">
                {slide.eyebrow}
              </div>
              <div className="text-sm text-slate-500">Slide {activeSlide + 1} of {slides.length}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)}
                className="rounded-full border border-[#e8ddff] bg-white p-2 text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label="Previous slide"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => setActiveSlide((current) => (current + 1) % slides.length)}
                className="rounded-full border border-[#e8ddff] bg-white p-2 text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label="Next slide"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative h-full min-h-[700px] overflow-hidden rounded-[24px] border border-white/80 bg-white/80 p-4 shadow-inner sm:p-6 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(196,168,255,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.12),_transparent_30%)]" />
            <div className="relative h-full">
              {activeSlide === 0 && <HeroSlide slide={slide} />}
              {activeSlide === 1 && <ProblemSlide slide={slide} />}
              {activeSlide === 2 && <SolutionSlide slide={slide} />}
              {activeSlide === 3 && <LifecycleSlide slide={slide} />}
              {activeSlide === 4 && <JourneySlide slide={slide} />}
              {activeSlide === 5 && <DashboardSlide slide={slide} />}
              {activeSlide === 6 && <ReportSlide slide={slide} />}
              {activeSlide === 7 && <EcosystemSlide slide={slide} />}
              {activeSlide === 8 && <ProfessionalsSlide slide={slide} />}
              {activeSlide === 9 && <InnovationSlide slide={slide} />}
              {activeSlide === 10 && <TechnologySlide slide={slide} />}
              {activeSlide === 11 && <ImpactSlide slide={slide} />}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {slides.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition ${activeSlide === index ? 'w-8 bg-[#8b5cf6]' : 'w-2.5 bg-[#e8ddff]'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function HeroSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col justify-between gap-8 lg:flex-row lg:items-center">
      <div className="max-w-2xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f0e2ff] bg-[#f8f3ff] px-3 py-2 text-sm font-medium text-[#8037d8]">
          <HeartPulse size={16} />
          {slide.highlight}
        </div>
        <h2 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {slide.title}
        </h2>
        <p className="mt-4 text-xl font-medium text-[#7c3aed]">{slide.subtitle}</p>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{slide.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <div className="rounded-2xl border border-[#f0e3ff] bg-white/90 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <ShieldCheck size={16} className="text-[#8b5cf6]" />
              Trusted guidance
            </div>
          </div>
          <div className="rounded-2xl border border-[#f0e3ff] bg-white/90 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Brain size={16} className="text-[#f472b6]" />
              Intelligent support
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-[480px] overflow-hidden rounded-[32px] border border-[#f4e7ff] bg-gradient-to-br from-[#f8f3ff] via-white to-[#fff2f8] p-6 shadow-[0_20px_60px_rgba(139,92,246,0.16)]">
        <div className="absolute right-3 top-3 h-20 w-20 rounded-full bg-[#f4d8ff] blur-3xl" />
        <div className="absolute bottom-0 left-8 h-28 w-28 rounded-full bg-[#ffdce9] blur-3xl" />
        <div className="relative rounded-[24px] border border-white/80 bg-white/85 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Care journey</p>
              <p className="text-lg font-semibold text-slate-900">Connected support</p>
            </div>
            <div className="rounded-full bg-[#f6ebff] p-2 text-[#8b5cf6]">
              <Wifi size={18} />
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl bg-[#f9f5ff] p-3">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ClipboardCheck size={16} className="text-[#8b5cf6]" />
                Health snapshot
              </div>
              <div className="h-2 rounded-full bg-[#e9dcff]">
                <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#f472b6]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#f2e6ff] bg-white p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Reminders</p>
                <p className="mt-2 text-sm font-semibold">2 pending</p>
              </div>
              <div className="rounded-2xl border border-[#f2e6ff] bg-white p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">AI insight</p>
                <p className="mt-2 text-sm font-semibold">Low risk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemSlide({ slide }: { slide: Slide }) {
  const problems = [
    'Fragmented healthcare systems',
    'Scattered medical records',
    'Difficulty understanding reports',
    'Missed appointments',
    'Limited access in rural areas',
    'Poor coordination across stakeholders',
  ];

  return (
    <div className="h-full">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">{slide.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {problems.map((item, index) => (
          <div key={item} className="rounded-[24px] border border-[#f0e3ff] bg-white/90 p-4 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f6ebff] text-[#8b5cf6]">
              {index % 2 === 0 ? <CircleAlert size={18} /> : <Stethoscope size={18} />}
            </div>
            <p className="text-base font-medium text-slate-700">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#f0e3ff] bg-[#f8f3ff] px-4 py-2 text-sm font-semibold text-[#7c3aed]">
        <ArrowUpRight size={16} />
        {slide.highlight}
      </div>
    </div>
  );
}

function SolutionSlide({ slide }: { slide: Slide }) {
  return (
    <div className="grid h-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{slide.description}</p>
        <div className="mt-6 rounded-[24px] border border-[#f0e3ff] bg-[#fdf8ff] p-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#7c3aed]">
            <Sparkles size={16} />
            Connected intelligence
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {ecosystemPillars.map((item) => (
              <div key={item} className="rounded-full border border-[#e8ddff] bg-white px-3 py-2 text-sm font-medium text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#f0e3ff] bg-gradient-to-br from-[#f7f0ff] via-white to-[#fff3f8] p-6 shadow-[0_20px_60px_rgba(139,92,246,0.12)]">
        <div className="relative mx-auto flex h-[300px] w-full max-w-[320px] items-center justify-center rounded-[24px] bg-white/90 p-6">
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#f472b6] shadow-lg" />
          <div className="absolute left-7 top-8 rounded-2xl border border-[#e8ddff] bg-white px-3 py-2 text-sm font-semibold text-slate-700">
            Women
          </div>
          <div className="absolute right-7 top-8 rounded-2xl border border-[#e8ddff] bg-white px-3 py-2 text-sm font-semibold text-slate-700">
            Doctors
          </div>
          <div className="absolute bottom-8 left-8 rounded-2xl border border-[#e8ddff] bg-white px-3 py-2 text-sm font-semibold text-slate-700">
            ASHA
          </div>
          <div className="absolute bottom-8 right-8 rounded-2xl border border-[#e8ddff] bg-white px-3 py-2 text-sm font-semibold text-slate-700">
            Hospitals
          </div>
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-2xl border border-[#e8ddff] bg-[#f7f0ff] px-3 py-2 text-sm font-semibold text-[#7c3aed]">
            AI Care Hub
          </div>
        </div>
      </div>
    </div>
  );
}

function LifecycleSlide({ slide }: { slide: Slide }) {
  return (
    <div className="h-full">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">{slide.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stages.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`rounded-[24px] border p-4 shadow-sm ${item.active ? 'border-[#d6bfff] bg-gradient-to-br from-[#f6ebff] to-white' : 'border-[#efe4ff] bg-white/90'}`}>
              <div className={`mb-3 inline-flex rounded-full p-2 ${item.active ? 'bg-[#8b5cf6] text-white' : 'bg-[#f6ebff] text-[#8b5cf6]'}`}>
                <Icon size={18} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{item.label}</h3>
              {item.active && <p className="mt-2 text-sm text-slate-600">Fully implemented today</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JourneySlide({ slide }: { slide: Slide }) {
  return (
    <div className="h-full">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">{slide.description}</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-[24px] border border-[#f0e3ff] bg-white/90 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3aed]">
            <MoveRight size={16} />
            Guided user flow
          </div>
          <div className="mt-5 space-y-3">
            {journeySteps.map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6ebff] text-sm font-semibold text-[#8b5cf6]">
                  {index + 1}
                </div>
                <div className="flex-1 rounded-2xl border border-[#f1e6ff] bg-[#fdf8ff] px-3 py-2 text-sm font-medium text-slate-700">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#f0e3ff] bg-gradient-to-br from-[#f8f3ff] via-white to-[#fff2f8] p-5 shadow-[0_16px_40px_rgba(139,92,246,0.12)]">
          <div className="rounded-[20px] border border-white/80 bg-white/85 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Experience</p>
                <h3 className="text-xl font-semibold text-slate-900">Trusted, continuous care</h3>
              </div>
              <div className="rounded-full bg-[#f6ebff] p-2 text-[#8b5cf6]">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-[#f9f5ff] p-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <House size={16} className="text-[#8b5cf6]" />
                  One place for support
                </div>
              </div>
              <div className="rounded-2xl bg-[#fff6fb] p-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <MessageCircleHeart size={16} className="text-[#f472b6]" />
                  Community and guidance
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSlide({ slide }: { slide: Slide }) {
  return (
    <div className="h-full">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">{slide.description}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[24px] border border-[#f0e3ff] bg-white/90 p-5 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="rounded-[20px] border border-[#f0e3ff] bg-[#fdf8ff] p-3">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#8b5cf6] shadow-sm">
                    <Icon size={16} />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{feature.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#f0e3ff] bg-gradient-to-br from-[#f8f3ff] via-white to-[#fff2f8] p-5 shadow-[0_16px_40px_rgba(139,92,246,0.12)]">
          <div className="rounded-[20px] border border-white/80 bg-white/90 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Dashboard preview</p>
                <h3 className="text-xl font-semibold text-slate-900">Pregnancy companion</h3>
              </div>
              <div className="rounded-full bg-[#f6ebff] p-2 text-[#8b5cf6]">
                <Smartphone size={18} />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-[#f9f5ff] p-3">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>Week 28</span>
                  <span className="text-[#7c3aed]">Healthy</span>
                </div>
              </div>
              <div className="rounded-2xl bg-[#fff7fb] p-3">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>Next visit</span>
                  <span className="text-[#f472b6]">Tomorrow</span>
                </div>
              </div>
              <div className="rounded-2xl border border-[#f0e3ff] p-3 text-sm text-slate-600">
                Continuous guidance, reminders, and support in one place.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportSlide({ slide }: { slide: Slide }) {
  return (
    <div className="grid h-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">{slide.description}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[20px] border border-[#f0e3ff] bg-white/90 p-4 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f6ebff] text-[#8b5cf6]">
              <ScanLine size={18} />
            </div>
            <p className="text-sm font-semibold text-slate-700">PDF, image, or camera scan</p>
          </div>
          <div className="rounded-[20px] border border-[#f0e3ff] bg-white/90 p-4 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f6ebff] text-[#8b5cf6]">
              <Microscope size={18} />
            </div>
            <p className="text-sm font-semibold text-slate-700">OCR and AI-led interpretation</p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#f0e3ff] bg-gradient-to-br from-[#f8f3ff] via-white to-[#fff2f8] p-5 shadow-[0_16px_40px_rgba(139,92,246,0.12)]">
        <div className="rounded-[24px] border border-white/80 bg-white/90 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Understanding</p>
              <h3 className="text-xl font-semibold text-slate-900">AI medical insight</h3>
            </div>
            <div className="rounded-full bg-[#f6ebff] p-2 text-[#8b5cf6]">
              <FileText size={18} />
            </div>
          </div>
          <div className="space-y-2">
            {reportOutputs.map((output) => (
              <div key={output} className="flex items-center gap-2 rounded-2xl border border-[#f0e3ff] bg-[#fdf8ff] px-3 py-2 text-sm font-medium text-slate-700">
                <CheckCircle2 size={15} className="text-[#8b5cf6]" />
                {output}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EcosystemSlide({ slide }: { slide: Slide }) {
  return (
    <div className="h-full">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">{slide.description}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[24px] border border-[#f0e3ff] bg-white/90 p-5 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: 'Local communities', icon: Users },
              { title: 'Anonymous discussions', icon: MessageCircleHeart },
              { title: 'Awareness sessions', icon: BookOpen },
              { title: 'Government scheme updates', icon: Hospital },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[20px] border border-[#f0e3ff] bg-[#fdf8ff] p-3">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#8b5cf6] shadow-sm">
                    <Icon size={16} />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#f0e3ff] bg-gradient-to-br from-[#f8f3ff] via-white to-[#fff2f8] p-5 shadow-[0_16px_40px_rgba(139,92,246,0.12)]">
          <div className="rounded-[20px] border border-white/80 bg-white/90 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3aed]">
              <Trees size={16} />
              Community-led care
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {ecosystemPillars.map((item) => (
                <div key={item} className="rounded-full border border-[#e8ddff] bg-[#f8f3ff] px-3 py-2 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfessionalsSlide({ slide }: { slide: Slide }) {
  return (
    <div className="h-full">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">{slide.description}</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {professionalCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-[24px] border border-[#f0e3ff] bg-white/90 p-5 shadow-sm">
              <div className="mb-4 inline-flex rounded-full bg-[#f6ebff] p-2 text-[#8b5cf6]">
                <Icon size={18} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {card.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#8b5cf6]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InnovationSlide({ slide }: { slide: Slide }) {
  return (
    <div className="grid h-full gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">{slide.description}</p>
      </div>

      <div className="rounded-[28px] border border-[#f0e3ff] bg-gradient-to-br from-[#f8f3ff] via-white to-[#fff2f8] p-5 shadow-[0_16px_40px_rgba(139,92,246,0.12)]">
        <div className="rounded-[24px] border border-white/80 bg-white/90 p-5">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3aed]">
            <Brain size={16} />
            AI capabilities
          </div>
          <div className="flex flex-wrap gap-3">
            {innovations.map((item) => (
              <div key={item} className="rounded-full border border-[#e8ddff] bg-[#f8f3ff] px-3 py-2 text-sm font-medium text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TechnologySlide({ slide }: { slide: Slide }) {
  return (
    <div className="h-full">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-3 text-lg leading-8 text-slate-600">{slide.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {techLayers.map((layer) => (
          <div key={layer.title} className="rounded-[24px] border border-[#f0e3ff] bg-white/90 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{layer.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {layer.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#8b5cf6]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImpactSlide({ slide }: { slide: Slide }) {
  return (
    <div className="grid h-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5cf6]">{slide.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">{slide.title}</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">{slide.description}</p>

        <div className="mt-6 rounded-[24px] border border-[#f0e3ff] bg-[#fdf8ff] p-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3aed]">
            <ArrowUpRight size={16} />
            Future scope
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {futureFocus.map((item) => (
              <div key={item} className="rounded-full border border-[#e8ddff] bg-white px-3 py-2 text-sm font-medium text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#f0e3ff] bg-gradient-to-br from-[#f8f3ff] via-white to-[#fff2f8] p-5 shadow-[0_16px_40px_rgba(139,92,246,0.12)]">
        <div className="rounded-[24px] border border-white/80 bg-white/90 p-5">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3aed]">
            <Waves size={16} />
            Measurable impact
          </div>
          <div className="space-y-3">
            {impactStats.map((item) => (
              <div key={item} className="rounded-2xl border border-[#f0e3ff] bg-[#fdf8ff] px-3 py-3 text-sm font-medium text-slate-700">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[20px] bg-gradient-to-r from-[#8b5cf6] to-[#f472b6] p-4 text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.25em]">Closing message</p>
            <p className="mt-2 text-lg font-medium leading-7">
              “Arogya Sakhi is not just a healthcare application—it is a connected healthcare ecosystem empowering every woman with intelligent, accessible, and continuous care.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
