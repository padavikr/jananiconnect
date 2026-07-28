"use client";

import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, onSnapshot, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { MapPin, Navigation, Radio, StopCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "../auth/AuthProvider";

type LiveLocationRecord = {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: { toDate?: () => Date } | null;
};

type LiveLocationCardProps = {
  mode?: "self" | "list";
  title?: string;
  description?: string;
};

export default function LiveLocationCard({
  mode = "self",
  title = "Live Location",
  description = "Share your current position with your care team.",
}: LiveLocationCardProps) {
  const { user } = useAuth();
  const [isSharing, setIsSharing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Share your live location so your care team can view your latest coordinates.");
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number; accuracy: number } | null>(null);
  const [locations, setLocations] = useState<LiveLocationRecord[]>([]);
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    if (mode !== "list") return;

    const unsubscribe = onSnapshot(collection(db, "liveLocations"), (snapshot) => {
      const records = snapshot.docs
        .map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<LiveLocationRecord, "id">) }))
        .filter((record) => typeof record.latitude === "number" && typeof record.longitude === "number")
        .sort((a, b) => {
          const aTime = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : 0;
          const bTime = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : 0;
          return bTime - aTime;
        });

      setLocations(records);
    });

    return () => unsubscribe();
  }, [mode]);

  useEffect(() => {
    if (mode !== "list" || locations.length === 0) return;

    const loadUserNames = async () => {
      const names: Record<string, string> = {};
      await Promise.all(
        locations.map(async (entry) => {
          if (names[entry.userId] || !entry.userId) return;
          try {
            const userDoc = await getDoc(doc(db, "users", entry.userId));
            if (userDoc.exists()) {
              const data = userDoc.data() as { fullName?: string; displayName?: string };
              names[entry.userId] = data.fullName || data.displayName || "Pregnant Woman";
            }
          } catch (error) {
            console.error("Unable to load user profile", error);
          }
        })
      );

      setUserNames(names);
    };

    void loadUserNames();
  }, [locations, mode]);

  useEffect(() => {
    if (mode !== "self" || !user) return;

    const unsubscribe = onSnapshot(doc(db, "liveLocations", user.uid), (docSnap) => {
      if (!docSnap.exists()) return;
      const data = docSnap.data() as Partial<LiveLocationRecord>;
      if (typeof data.latitude === "number" && typeof data.longitude === "number") {
        setCoordinates({
          latitude: data.latitude,
          longitude: data.longitude,
          accuracy: data.accuracy ?? 0,
        });
      }
    });

    return () => unsubscribe();
  }, [mode, user]);

  useEffect(() => {
    return () => {
      if (watchId !== null && typeof window !== "undefined" && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const stopSharing = async () => {
    if (watchId !== null && typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }

    setWatchId(null);
    setIsSharing(false);
    setStatusMessage("Location sharing stopped.");

    if (user) {
      try {
        await deleteDoc(doc(db, "liveLocations", user.uid));
      } catch (error) {
        console.error("Unable to stop sharing location", error);
      }
    }
  };

  const shareLocation = () => {
    if (!user) {
      setStatusMessage("Please sign in to share your location.");
      return;
    }

    if (typeof window === "undefined" || !navigator.geolocation) {
      setStatusMessage("Geolocation is not available in this browser.");
      return;
    }

    setIsSharing(true);
    setStatusMessage("Requesting location permission...");

    const nextWatchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setCoordinates({ latitude, longitude, accuracy });
        setStatusMessage(`Tracking your current location • ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);

        try {
          await setDoc(
            doc(db, "liveLocations", user.uid),
            {
              userId: user.uid,
              latitude,
              longitude,
              accuracy,
              timestamp: serverTimestamp(),
            },
            { merge: true }
          );
        } catch (error) {
          console.error("Unable to save live location", error);
          setStatusMessage("Unable to save your location right now.");
        }
      },
      (error) => {
        let message = "Unable to access your location right now.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location permission was denied. Please allow location access to continue.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location is temporarily unavailable. Please try again shortly.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out. Please try again.";
            break;
          default:
            break;
        }

        setIsSharing(false);
        setStatusMessage(message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 20000,
      }
    );

    setWatchId(nextWatchId);
  };

  if (mode === "list") {
    return (
      <div className="rounded-[24px] border border-pink-100 bg-white/80 p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-pink-600" />
          <h3 className="text-lg font-semibold text-pink-700">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-gray-600">{description}</p>

        <div className="mt-4 space-y-3">
          {locations.length === 0 ? (
            <p className="rounded-2xl bg-pink-50 p-3 text-sm text-gray-600">No pregnant women are currently sharing their location.</p>
          ) : (
            locations.map((entry) => {
              const updatedAt = entry.timestamp?.toDate
                ? entry.timestamp.toDate().toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })
                : "recently";

              return (
                <div key={entry.id} className="rounded-2xl border border-pink-100 bg-gradient-to-br from-white to-pink-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-800">{userNames[entry.userId] || "Pregnant Woman"}</p>
                      <p className="text-sm text-gray-500">Updated {updatedAt}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Live
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Lat: {entry.latitude.toFixed(4)}, Lng: {entry.longitude.toFixed(4)}
                  </p>
                  {typeof entry.accuracy === "number" ? (
                    <p className="text-xs text-gray-500">Accuracy: ±{entry.accuracy.toFixed(0)}m</p>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-pink-100 bg-white/80 p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Navigation size={16} className="text-pink-600" />
        <h3 className="text-lg font-semibold text-pink-700">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-gray-600">{description}</p>

      <div className="mt-4 rounded-2xl bg-pink-50 p-3 text-sm text-gray-700">
        <p>{statusMessage}</p>
      </div>

      {coordinates ? (
        <div className="mt-3 rounded-2xl border border-pink-100 bg-white/90 p-3">
          <p className="text-sm font-semibold text-gray-800">Current Coordinates</p>
          <p className="mt-1 text-sm text-gray-700">
            Latitude: {coordinates.latitude.toFixed(6)}
          </p>
          <p className="text-sm text-gray-700">
            Longitude: {coordinates.longitude.toFixed(6)}
          </p>
          <p className="text-xs text-gray-500">Accuracy: ±{coordinates.accuracy.toFixed(0)}m</p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={shareLocation}
          className="flex items-center gap-2 rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
        >
          <Radio size={16} />
          {isSharing ? "Sharing Live Location" : "Share Live Location"}
        </button>
        <button
          onClick={stopSharing}
          className="flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-pink-700 transition hover:bg-pink-50"
        >
          <StopCircle size={16} />
          Stop Sharing
        </button>
      </div>
    </div>
  );
}
