"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/app/components/auth/AuthProvider";

type Role = "pregnant" | "asha" | "doctor";

const roleRoutes: Record<Role, string> = {
  pregnant: "/dashboard",
  asha: "/asha-dashboard",
  doctor: "/doctor-dashboard",
};

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      const redirectTarget = onboardingCompleted
        ? roleRoutes[role ?? "pregnant"] || "/dashboard"
        : "/pregnancy/onboarding";

      router.replace(redirectTarget);
    };

    void redirectBasedOnRole();
  }, [loading, router, user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { user: signedInUser } = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      const profileRef = doc(db, "users", signedInUser.uid);
      const profileSnap = await getDoc(profileRef);
      const profileData = profileSnap.exists() ? profileSnap.data() : {};
      const role = profileData.role as Role | undefined;
      const onboardingCompleted = profileData.onboardingCompleted === true;
      const redirectTarget = onboardingCompleted
        ? roleRoutes[role ?? "pregnant"] || "/dashboard"
        : "/pregnancy/onboarding";

      router.push(redirectTarget);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.12),_transparent_24%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-pink-100 bg-white/90 p-8 shadow-[0_24px_80px_-24px_rgba(190,24,93,0.35)] backdrop-blur">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold text-pink-700">Login to Janani Connect</h1>
          <p className="mt-2 text-sm text-slate-600">
            Continue your maternal care journey securely.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            <span className="mb-1 block">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-pink-400"
              placeholder="you@example.com"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            <span className="mb-1 block">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-pink-400"
              placeholder="Enter your password"
            />
          </label>

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
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <Link href="/auth/signup" className="font-medium text-pink-600 hover:text-pink-700">
            Create an account
          </Link>
          <Link href="/auth/forgot-password" className="font-medium text-slate-600 hover:text-slate-900">
            Forgot password?
          </Link>
        </div>
      </div>
    </main>
  );
}
