"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const links = [
  { href: "/role-selection", label: "Role Selection" },
  { href: "/dashboard", label: "Pregnant Dashboard" },
  { href: "/asha-dashboard", label: "ASHA Dashboard" },
  { href: "/doctor-dashboard", label: "PHC Dashboard" },
];

export default function RoleNavigation() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 rounded-full border border-pink-100 bg-white/80 p-2 shadow-sm backdrop-blur-sm">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full px-3 py-2 text-sm font-semibold text-pink-700 transition hover:bg-pink-50"
        >
          {link.label}
        </Link>
      ))}
      <button
        type="button"
        onClick={handleLogout}
        className="ml-auto rounded-full bg-pink-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
      >
        Logout
      </button>
    </div>
  );
}
