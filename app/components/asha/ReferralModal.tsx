"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";

type ReferralModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  const [form, setForm] = useState({
    reason: "",
    symptoms: "",
    bp: "",
    weight: "",
    hemoglobin: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[28px] border border-pink-100 bg-white p-6 shadow-[0_24px_70px_-20px_rgba(190,24,93,0.45)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-pink-700">Referral to PHC</h2>
            <p className="mt-1 text-sm text-gray-600">Share the mother’s current condition for urgent review.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-pink-50 p-2 text-pink-700 transition hover:bg-pink-100"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-[24px] border border-emerald-200 bg-emerald-50 p-5 text-center text-emerald-700">
            <h3 className="text-lg font-semibold">Referral Sent Successfully</h3>
            <p className="mt-2 text-sm">The PHC team has been notified with the updated maternal health details.</p>
            <button
              onClick={onClose}
              className="mt-4 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Reason for Referral</label>
                <input
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm outline-none focus:border-pink-400"
                  placeholder="High BP / severe symptoms"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Symptoms</label>
                <input
                  name="symptoms"
                  value={form.symptoms}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm outline-none focus:border-pink-400"
                  placeholder="Headache, dizziness, swelling"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">BP</label>
                <input
                  name="bp"
                  value={form.bp}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm outline-none focus:border-pink-400"
                  placeholder="140/95"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Weight</label>
                <input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm outline-none focus:border-pink-400"
                  placeholder="62 kg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Hemoglobin</label>
              <input
                name="hemoglobin"
                value={form.hemoglobin}
                onChange={handleChange}
                className="w-full rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm outline-none focus:border-pink-400"
                placeholder="9.8 g/dL"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Doctor Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm outline-none focus:border-pink-400"
                placeholder="Add care instructions or notes for the PHC team"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-pink-200 px-4 py-2 text-sm font-semibold text-pink-700 transition hover:bg-pink-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
              >
                <Send size={15} /> Send Referral
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
