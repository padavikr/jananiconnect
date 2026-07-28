import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const requiredEnvKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
] as const;

const missingEnvKeys = requiredEnvKeys.filter((key) => !process.env[key]?.trim());

if (missingEnvKeys.length > 0) {
  console.error("[firebase] Missing Firebase environment variables:", missingEnvKeys);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim() ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim() ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim() ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim() ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim() ?? "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?.trim() ?? "",
};

if (process.env.NODE_ENV !== "production") {
  console.info("[firebase] Firebase config status", {
    apiKeyPresent: Boolean(firebaseConfig.apiKey),
    authDomainPresent: Boolean(firebaseConfig.authDomain),
    projectIdPresent: Boolean(firebaseConfig.projectId),
    storageBucketPresent: Boolean(firebaseConfig.storageBucket),
    messagingSenderIdPresent: Boolean(firebaseConfig.messagingSenderId),
    appIdPresent: Boolean(firebaseConfig.appId),
    measurementIdPresent: Boolean(firebaseConfig.measurementId),
  });
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;