"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";

type AuthGuardProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const roleRoutes: Record<string, string> = {
  pregnant: "/dashboard",
  asha: "/asha-dashboard",
  doctor: "/doctor-dashboard",
};

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    const verifyAccess = async () => {
      if (!allowedRoles?.length) {
        setCheckingRole(false);
        return;
      }

      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);
      const profileData = profileSnap.exists() ? profileSnap.data() : {};
      const role = profileData.role as string | undefined;
      const onboardingCompleted = profileData.onboardingCompleted === true;
      const isOnboardingRoute = pathname === "/pregnancy/onboarding";

      if (!role || !allowedRoles.includes(role)) {
        router.replace(roleRoutes[role ?? ""] ?? "/auth/login");
        return;
      }

      if (!onboardingCompleted && !isOnboardingRoute) {
        router.replace("/pregnancy/onboarding");
        return;
      }

      if (onboardingCompleted && isOnboardingRoute) {
        router.replace(roleRoutes[role] ?? "/dashboard");
        return;
      }

      setCheckingRole(false);
    };

    void verifyAccess();
  }, [allowedRoles, loading, pathname, router, user]);

  if (loading || checkingRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.12),_transparent_24%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)]">
        <div className="rounded-2xl border border-pink-100 bg-white px-6 py-4 text-sm font-medium text-pink-700 shadow-sm">
          Checking your access...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
