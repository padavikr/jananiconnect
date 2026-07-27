"use client";

import { useState } from "react";
import { MapPin, Hospital, Loader2, Navigation, Compass } from "lucide-react";

type LocationState = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
};

export default function NearbyHospitals() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  });

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
        loading: false,
      });
      return;
    }

    setLocation((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      () => {
        setLocation({
          latitude: null,
          longitude: null,
          error: "Location access was denied. Please allow location access to find nearby hospitals.",
          loading: false,
        });
      }
    );
  };

  const openMaps = () => {
    const mapsUrl = "https://www.google.com/maps/search/hospitals+near+me";
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-[28px] border border-pink-100 bg-gradient-to-br from-white via-pink-50 to-violet-50 p-6 shadow-[0_16px_45px_-20px_rgba(190,24,93,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-pink-100 p-2 text-pink-700">
              <Hospital size={20} />
            </div>
            <h2 className="text-lg font-semibold text-pink-700">Nearby Hospitals</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Find hospitals close to your current location quickly.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[24px] border border-pink-100 bg-white/80 p-4">
        <div className="flex items-center gap-2 text-pink-700">
          <MapPin size={18} />
          <span className="font-semibold">Current Location</span>
        </div>

        {location.loading ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-pink-50 px-3 py-3 text-sm text-pink-700">
            <Loader2 size={16} className="animate-spin" />
            <span>Fetching your location...</span>
          </div>
        ) : location.error ? (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            {location.error}
          </div>
        ) : location.latitude !== null && location.longitude !== null ? (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Latitude:</span> {location.latitude.toFixed(6)}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Longitude:</span> {location.longitude.toFixed(6)}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-600">
            Allow location access to see your coordinates and discover nearby care centers.
          </p>
        )}
      </div>

      <div className="mt-5 rounded-[24px] border border-violet-100 bg-violet-50/70 p-4">
        <div className="flex items-center gap-2 text-violet-700">
          <Compass size={18} />
          <span className="font-semibold">Nearby Hospitals</span>
        </div>

        <button
          onClick={requestLocation}
          className="mt-4 w-full rounded-xl bg-pink-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
        >
          Get My Location
        </button>

        <button
          onClick={openMaps}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300 bg-white px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
        >
          <Navigation size={16} />
          Open Nearby Hospitals
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Opens Google Maps with nearby hospitals near your location.
      </div>
    </div>
  );
}
