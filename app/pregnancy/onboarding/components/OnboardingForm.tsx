"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/components/auth/AuthProvider";
import ProgressIndicator from "./ProgressIndicator";
import FormField from "./FormField";

type FormData = {
  fullName: string;
  age: string;
  pregnancyWeek: string;
  bloodGroup: string;
  height: string;
  weight: string;
  district: string;
  village: string;
  preferredHospital: string;
  preferredLanguage: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
};

const initialFormData: FormData = {
  fullName: "",
  age: "",
  pregnancyWeek: "",
  bloodGroup: "",
  height: "",
  weight: "",
  district: "",
  village: "",
  preferredHospital: "",
  preferredLanguage: "English",
  emergencyContactName: "",
  emergencyContactPhone: "",
};

const bloodGroups = [
  { value: "", label: "Select blood group" },
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

const languages = [
  { value: "English", label: "English" },
  { value: "Kannada", label: "Kannada" },
  { value: "Hindi", label: "Hindi" },
];

const TOTAL_STEPS = 4;

type Role = "pregnant" | "asha" | "doctor";

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || !user) return;

    const checkProfile = async () => {
      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists() && profileSnap.data().onboardingCompleted === true) {
        const role = profileSnap.data().role as Role | undefined;
        const targetRoute = role === "asha" ? "/asha-dashboard" : role === "doctor" ? "/doctor-dashboard" : "/dashboard";
        router.replace(targetRoute);
      }
    };

    void checkProfile();
  }, [loading, router, user]);

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    }
  }

  function handleBack() {
    if (step > 1) setStep((prev) => prev - 1);
  }

  async function handleComplete() {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);
      const existingProfile = profileSnap.exists() ? profileSnap.data() : {};
      const role = (existingProfile.role as Role | undefined) || "pregnant";

      await setDoc(
        profileRef,
        {
          ...existingProfile,
          fullName: formData.fullName.trim(),
          age: formData.age,
          pregnancyWeek: formData.pregnancyWeek,
          bloodGroup: formData.bloodGroup,
          height: formData.height,
          weight: formData.weight,
          district: formData.district,
          village: formData.village,
          preferredHospital: formData.preferredHospital,
          preferredLanguage: formData.preferredLanguage,
          emergencyContactName: formData.emergencyContactName,
          emergencyContactPhone: formData.emergencyContactPhone,
          email: user.email ?? existingProfile.email ?? "",
          role,
          onboardingCompleted: true,
          updatedAt: serverTimestamp(),
          createdAt: existingProfile.createdAt ?? serverTimestamp(),
        },
        { merge: true }
      );

      setIsComplete(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to save your profile.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isComplete) {
    return (
      <div className="animate-scale-in text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-lavender-500 to-pink-400 text-white shadow-lg shadow-lavender-300/40">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Welcome, {formData.fullName.split(" ")[0]}!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-foreground/65">
          Your profile has been set up. We&apos;ll personalize your pregnancy
          care based on week {formData.pregnancyWeek} and your preferences.
        </p>
        <Link
          href="/pregnancy"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-lavender-500 to-lavender-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-lavender-300/40 transition-all hover:shadow-xl"
        >
          Go to Pregnancy Module
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <ProgressIndicator currentStep={step} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step === TOTAL_STEPS) {
            void handleComplete();
          } else {
            handleNext();
          }
        }}
        className="mt-10 space-y-6"
      >
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-foreground">
                Personal Details
              </h2>
              <p className="mt-1 text-sm text-foreground/55">
                Tell us a little about yourself to get started.
              </p>
            </div>
            <FormField
              label="Full Name"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="Enter your full name"
              required
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                label="Age"
                id="age"
                name="age"
                type="number"
                min={15}
                max={55}
                value={formData.age}
                onChange={(e) => updateField("age", e.target.value)}
                placeholder="e.g. 28"
                required
              />
              <FormField
                label="Pregnancy Week"
                id="pregnancyWeek"
                name="pregnancyWeek"
                type="number"
                min={1}
                max={42}
                value={formData.pregnancyWeek}
                onChange={(e) => updateField("pregnancyWeek", e.target.value)}
                placeholder="e.g. 24"
                hint="Current week of pregnancy (1–42)"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-foreground">
                Health Profile
              </h2>
              <p className="mt-1 text-sm text-foreground/55">
                Help us understand your health baseline for personalized care.
              </p>
            </div>
            <FormField
              as="select"
              label="Blood Group"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={(e) => updateField("bloodGroup", e.target.value)}
              options={bloodGroups}
              required
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                label="Height (cm)"
                id="height"
                name="height"
                type="number"
                min={120}
                max={220}
                step={0.1}
                value={formData.height}
                onChange={(e) => updateField("height", e.target.value)}
                placeholder="e.g. 162"
                required
              />
              <FormField
                label="Weight (kg)"
                id="weight"
                name="weight"
                type="number"
                min={30}
                max={200}
                step={0.1}
                value={formData.weight}
                onChange={(e) => updateField("weight", e.target.value)}
                placeholder="e.g. 58"
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-foreground">
                Location &amp; Care
              </h2>
              <p className="mt-1 text-sm text-foreground/55">
                Connect with healthcare services near you.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                label="District"
                id="district"
                name="district"
                value={formData.district}
                onChange={(e) => updateField("district", e.target.value)}
                placeholder="e.g. Bengaluru Urban"
                required
              />
              <FormField
                label="Village"
                id="village"
                name="village"
                value={formData.village}
                onChange={(e) => updateField("village", e.target.value)}
                placeholder="e.g. Whitefield"
                required
              />
            </div>
            <FormField
              label="Preferred Hospital"
              id="preferredHospital"
              name="preferredHospital"
              value={formData.preferredHospital}
              onChange={(e) => updateField("preferredHospital", e.target.value)}
              placeholder="e.g. Victoria Hospital, Bengaluru"
              required
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-foreground">
                Preferences &amp; Emergency
              </h2>
              <p className="mt-1 text-sm text-foreground/55">
                Final details to complete your personalized care profile.
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-foreground/80">
                Preferred Language
              </p>
              <div className="grid grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <label
                    key={lang.value}
                    className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      formData.preferredLanguage === lang.value
                        ? "border-lavender-400 bg-lavender-50 text-lavender-600 shadow-sm ring-2 ring-lavender-100"
                        : "border-lavender-100 bg-white text-foreground/60 hover:border-lavender-200 hover:bg-lavender-50/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredLanguage"
                      value={lang.value}
                      checked={formData.preferredLanguage === lang.value}
                      onChange={(e) =>
                        updateField("preferredLanguage", e.target.value)
                      }
                      className="sr-only"
                    />
                    {lang.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-pink-100 bg-pink-50/40 p-5">
              <p className="mb-4 text-sm font-semibold text-foreground/80">
                Emergency Contact
              </p>
              <div className="space-y-4">
                <FormField
                  label="Contact Name"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) =>
                    updateField("emergencyContactName", e.target.value)
                  }
                  placeholder="e.g. Rajesh Kumar"
                  required
                />
                <FormField
                  label="Contact Phone"
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) =>
                    updateField("emergencyContactPhone", e.target.value)
                  }
                  placeholder="e.g. +91 98765 43210"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {submitError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-4 pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 rounded-full border border-lavender-200 bg-white px-6 py-3 text-sm font-semibold text-lavender-600 transition-all hover:border-lavender-300 hover:bg-lavender-50"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lavender-500 to-lavender-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-lavender-300/40 transition-all hover:from-lavender-600 hover:to-lavender-600 hover:shadow-xl hover:shadow-lavender-300/50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {step === TOTAL_STEPS ? (isSubmitting ? "Saving..." : "Complete Setup") : "Continue"}
            <svg
              className="h-4 w-4"
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
          </button>
        </div>
      </form>
    </div>
  );
}
