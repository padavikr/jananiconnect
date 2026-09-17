"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PremiumPageShell from "../components/PremiumPageShell";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  limit,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/app/components/auth/AuthProvider";

type ReportItem = {
  id: string;
  userId: string;
  reportName: string;
  reportType: string;
  downloadURL: string;
  uploadedAt?: {
    toDate?: () => Date;
  } | null;
  aiAnalysisStatus?: string;
};

const REPORTS_LIMIT = 10;

export default function UploadReport() {
  const router = useRouter();
  const { user } = useAuth();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!user) {
      setReports([]);
      return;
    }

    const reportsRef = collection(db, "reports");
    const reportsQuery = query(
      reportsRef,
      where("userId", "==", user.uid),
      orderBy("uploadedAt", "desc"),
      limit(REPORTS_LIMIT + 1)
    );

    const unsubscribe = onSnapshot(reportsQuery, (snapshot) => {
      const fetchedReports = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<ReportItem, "id">),
      }));

      if (fetchedReports.length > REPORTS_LIMIT) {
        setHasMore(true);
        setReports(fetchedReports.slice(0, REPORTS_LIMIT));
      } else {
        setHasMore(false);
        setReports(fetchedReports);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a medical report first.");
      setSuccessMessage("");
      return;
    }

    if (!user) {
      setErrorMessage("Please log in to upload your report.");
      setSuccessMessage("");
      return;
    }

    const allowedMimeTypes = ["application/pdf", "image/jpeg", "image/png"];
    const extension = selectedFile.name.toLowerCase().slice(
      selectedFile.name.lastIndexOf(".")
    );
    const isAllowedType =
      allowedMimeTypes.includes(selectedFile.type) ||
      [".pdf", ".jpg", ".jpeg", ".png"].includes(extension);

    if (!isAllowedType) {
      setErrorMessage("Only PDF, JPG, and PNG files are supported.");
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    setErrorMessage("");
    setSuccessMessage("");

    let progressInterval: ReturnType<typeof setInterval> | null = null;
    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/rtkjshzl/auto/upload";

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "jananiconnect");

      progressInterval = setInterval(() => {
        setUploadProgress((value) => Math.min(value + 10, 90));
      }, 300);

      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message =
          errorData?.error?.message ||
          `Cloudinary upload failed with status ${response.status}`;
        throw new Error(message);
      }

      const uploadResult = await response.json();
      const downloadURL = uploadResult.secure_url as string;

      const reportRef = await addDoc(collection(db, "reports"), {
        userId: user.uid,
        reportName: selectedFile.name,
        reportType: selectedFile.type || "application/octet-stream",
        downloadURL,
        uploadedAt: serverTimestamp(),
        aiAnalysisStatus: "Pending",
      });

      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportId: reportRef.id,
          userId: user.uid,
          reportName: selectedFile.name,
          reportType: selectedFile.type || "application/octet-stream",
          reportUrl: downloadURL,
        }),
      });

      if (!analysisResponse.ok) {
        const errorBody = await analysisResponse.json().catch(() => null);
        throw new Error(
          errorBody?.message || "AI analysis request failed. Please try again."
        );
      }

      setSuccessMessage(
        "✅ Report uploaded successfully. It is now available in My Reports."
      );
      setSelectedFile(null);
      setUploadProgress(100);
      router.push(`/ai-analysis?reportId=${reportRef.id}`);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Upload failed. Please try again."
      );
      setUploadProgress(0);
    } finally {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setLoading(false);
    }
  };

  return (
    <PremiumPageShell
      eyebrow="Care intake"
      title="Upload Medical Report"
      description="Share pregnancy reports securely and receive AI-guided insights in moments."
    >
      <div className="rounded-[32px] border border-pink-100 bg-white/80 p-4 shadow-[0_24px_60px_-20px_rgba(190,24,93,0.35)] backdrop-blur-sm sm:p-6">
        <div className="rounded-[24px] border border-pink-100 bg-gradient-to-br from-white to-pink-50 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-pink-700">Select Your Report</h2>

        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="mt-5 w-full rounded-lg border border-gray-300 p-3"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />

        {selectedFile && (
          <p className="mt-3 font-medium text-green-600">✅ {selectedFile.name}</p>
        )}

        {errorMessage ? (
          <p className="mt-3 font-medium text-red-600">{errorMessage}</p>
        ) : null}

        {successMessage ? (
          <p className="mt-3 font-medium text-green-600">{successMessage}</p>
        ) : null}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-green-600 py-3 text-lg font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "📤 Uploading..." : "📤 Upload & Analyze"}
        </button>

        {loading ? (
          <div className="mt-4">
            <div className="mb-2 text-sm font-medium text-pink-700">
              Uploading {uploadProgress}%
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-pink-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-8 rounded-[24px] border border-pink-100 bg-white/80 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-pink-700">My Reports</h2>

        {reports.length === 0 ? (
          <p className="mt-3 text-gray-600">
            No reports uploaded yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="rounded-[20px] border border-pink-100 bg-pink-50/70 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-800">{report.reportName}</p>
                    <p className="text-sm text-gray-600">
                      {report.reportType} • {report.aiAnalysisStatus || "Pending"}
                    </p>
                  </div>
                  <a
                    href={report.downloadURL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-pink-600 hover:text-pink-700"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link href="/dashboard">
          <button className="w-full rounded-lg border border-pink-600 py-3 font-semibold text-pink-700 hover:bg-pink-100">
            ← Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}