"use client";

import Link from "next/link";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setMessage("Password reset instructions have been sent to your email.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send password reset email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.12),_transparent_24%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-pink-100 bg-white/90 p-8 shadow-[0_24px_80px_-24px_rgba(190,24,93,0.35)] backdrop-blur">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">Reset password</p>
          <h1 className="mt-2 text-3xl font-bold text-pink-700">Forgot your password?</h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter your email and we’ll send the reset link.
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

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:from-pink-600 hover:to-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-600">
          <Link href="/auth/login" className="font-medium text-pink-600 hover:text-pink-700">
            Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
