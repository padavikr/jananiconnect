export type LifeStage = {
  id: string;
  title: string;
  description: string;
  href: string | null;
  illustration: "adolescent" | "young-woman" | "planning" | "pregnant" | "new-mother" | "menopause";
  accent: string;
  iconBg: string;
};

export const lifeStages: LifeStage[] = [
  {
    id: "adolescent",
    title: "Adolescent Girl",
    description:
      "Guidance on puberty, menstrual health, nutrition, and building healthy habits during your formative years.",
    href: null,
    illustration: "adolescent",
    accent: "from-lavender-300 to-lavender-400",
    iconBg: "bg-lavender-50",
  },
  {
    id: "young-woman",
    title: "Young Woman",
    description:
      "Personalized wellness plans, reproductive health education, and preventive care for active, independent living.",
    href: null,
    illustration: "young-woman",
    accent: "from-pink-300 to-pink-400",
    iconBg: "bg-pink-50",
  },
  {
    id: "planning",
    title: "Planning Pregnancy",
    description:
      "Preconception counseling, fertility insights, and lifestyle guidance to prepare your body and mind for motherhood.",
    href: null,
    illustration: "planning",
    accent: "from-lavender-400 to-pink-300",
    iconBg: "bg-lavender-50",
  },
  {
    id: "pregnant",
    title: "Pregnant Woman",
    description:
      "AI-powered trimester tracking, doctor connections, ASHA support, and emergency assistance throughout your pregnancy.",
    href: "/pregnancy",
    illustration: "pregnant",
    accent: "from-lavender-500 to-pink-400",
    iconBg: "bg-pink-50",
  },
  {
    id: "new-mother",
    title: "New Mother",
    description:
      "Postpartum recovery support, breastfeeding guidance, newborn care tips, and mental health check-ins for new moms.",
    href: null,
    illustration: "new-mother",
    accent: "from-pink-400 to-lavender-400",
    iconBg: "bg-pink-50",
  },
  {
    id: "menopause",
    title: "Menopause & Healthy Ageing",
    description:
      "Hormonal health management, bone density care, and wellness programs designed for graceful, confident ageing.",
    href: null,
    illustration: "menopause",
    accent: "from-lavender-400 to-lavender-500",
    iconBg: "bg-lavender-50",
  },
];
