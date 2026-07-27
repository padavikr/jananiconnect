"use client";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FirebaseTest() {
  const testFirebase = async () => {
    try {
      await addDoc(collection(db, "test"), {
        name: "Shrunga",
        status: "Firebase Connected",
        createdAt: new Date(),
      });

      alert("✅ Firebase Connected Successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Firebase Connection Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <button
        onClick={testFirebase}
        className="rounded-lg bg-pink-600 px-6 py-3 text-white font-bold hover:bg-pink-700"
      >
        Test Firebase
      </button>
    </div>
  );
}