"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/app/components/auth/AuthProvider";

type Role = "pregnant" | "asha" | "doctor";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  district: string;
  village: string;
  pregnancyWeek: string;
};

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  role: "pregnant",
  district: "",
  village: "",
  pregnancyWeek: "",
};

const roleRoutes: Record<Role, string> = {
  pregnant: "/dashboard",
  asha: "/asha-dashboard",
  doctor: "/doctor-dashboard",
};

export default function SignupPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (loading || !user) return;

    const redirectBasedOnRole = async () => {
      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);
      const profileData = profileSnap.exists() ? profileSnap.data() : {};
      const role = profileData.role as Role | undefined;
      const onboardingCompleted = profileData.onboardingCompleted === true;

      router.replace(onboardingCompleted ? roleRoutes[role ?? "pregnant"] || "/dashboard" : "/pregnancy/onboarding");
    };

    void redirectBasedOnRole();
  }, [loading, router, user]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { user: createdUser } = await createUserWithEmailAndPassword(
        auth,
        form.email.trim().toLowerCase(),
        form.password
      );

      await setDoc(
        doc(db, "users", createdUser.uid),
        {
          fullName: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          role: form.role,
          district: form.district.trim(),
          village: form.village.trim(),
          pregnancyWeek: Number(form.pregnancyWeek) || 0,
          onboardingCompleted: false,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      router.push("/pregnancy/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.12),_transparent_24%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] px-4 py-10">
      <div className="w-full max-w-2xl rounded-[32px] border border-pink-100 bg-white/90 p-8 shadow-[0_24px_80px_-24px_rgba(190,24,93,0.35)] backdrop-blur">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Create account</p>
          <h1 className="mt-2 text-3xl font-bold text-pink-700">Join Janani Connect</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign up to access your personalized maternal care experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-1 block">Full name</span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-pink-400"
                placeholder="Shrunga Shekar"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-1 block">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-pink-400"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-1 block">Phone</span>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-pink-400"
                placeholder="+91 98765 43210"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-1 block">Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-pink-400"
                placeholder="At least 6 characters"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-1 block">Role</span>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-pink-400"
              >
                <option value="pregnant">Pregnant</option>
                <option value="asha">ASHA</option>
                <option value="doctor">Doctor</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-1 block">Pregnancy week</span>
              <input
                type="number"
                name="pregnancyWeek"
                value={form.pregnancyWeek}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-pink-400"
                placeholder="24"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-1 block">District</span>
              <input
                name="district"
                value={form.district}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-pink-400"
                placeholder="Bengaluru Urban"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-1 block">Village</span>
              <input
                name="village"
                value={form.village}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-pink-400"
                placeholder="Whitefield"
              />
            </label>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:from-pink-600 hover:to-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <Link href="/auth/login" className="font-medium text-pink-600 hover:text-pink-700">
            Already have an account? Login
          </Link>
          <Link href="/auth/forgot-password" className="font-medium text-slate-600 hover:text-slate-900">
            Forgot password?
          </Link>
        </div>
      </div>
    </main>
  );
}
