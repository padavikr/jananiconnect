import { AlertTriangle, CalendarDays, Droplets, FileText, HeartPulse, PhoneCall, ShieldCheck, Sparkles, UserCircle2 } from "lucide-react";

type PregnantProfileCardProps = {
  name: string;
  age: string;
  pregnancyWeek: string;
  bloodGroup: string;
  village: string;
  emergencyContact: string;
  medicalHistory: string[];
  uploadedReports: string[];
  aiHealthScore: string;
  appointments: string[];
  vaccinationStatus: string[];
};

export default function PregnantProfileCard({
  name,
  age,
  pregnancyWeek,
  bloodGroup,
  village,
  emergencyContact,
  medicalHistory,
  uploadedReports,
  aiHealthScore,
  appointments,
  vaccinationStatus,
}: PregnantProfileCardProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.16),_transparent_25%),linear-gradient(135deg,_#fdf2f8_0%,_#f5f3ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-pink-100 bg-white/80 p-6 shadow-[0_24px_60px_-20px_rgba(190,24,93,0.35)] backdrop-blur-sm sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full max-w-sm rounded-[28px] border border-pink-100 bg-gradient-to-br from-pink-50 to-violet-50 p-6 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-pink-600 shadow-md">
              <UserCircle2 size={64} />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-pink-700">{name}</h1>
            <p className="mt-2 text-sm text-gray-600">Pregnant Woman Profile</p>
            <div className="mt-5 rounded-2xl bg-white/80 p-4 text-left text-sm text-gray-700">
              <p><span className="font-semibold">Age:</span> {age}</p>
              <p className="mt-2"><span className="font-semibold">Pregnancy Week:</span> {pregnancyWeek}</p>
              <p className="mt-2"><span className="font-semibold">Blood Group:</span> {bloodGroup}</p>
              <p className="mt-2"><span className="font-semibold">Village:</span> {village}</p>
              <p className="mt-2"><span className="font-semibold">Emergency Contact:</span> {emergencyContact}</p>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="rounded-[28px] border border-pink-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <HeartPulse size={18} className="text-pink-700" />
                <h2 className="text-xl font-semibold text-pink-700">AI Health Score</h2>
              </div>
              <div className="mt-4 rounded-2xl bg-pink-50 p-4">
                <p className="text-4xl font-bold text-green-600">{aiHealthScore}</p>
                <p className="mt-2 text-sm text-gray-600">Healthy pregnancy trend with stable vitals.</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-pink-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-violet-700" />
                  <h2 className="text-lg font-semibold text-violet-700">Medical History</h2>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {medicalHistory.map((item) => (
                    <li key={item} className="rounded-xl bg-violet-50 px-3 py-2">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[28px] border border-pink-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-emerald-700" />
                  <h2 className="text-lg font-semibold text-emerald-700">Uploaded Reports</h2>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {uploadedReports.map((item) => (
                    <li key={item} className="rounded-xl bg-emerald-50 px-3 py-2">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-pink-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-pink-700" />
                  <h2 className="text-lg font-semibold text-pink-700">Appointments</h2>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {appointments.map((item) => (
                    <li key={item} className="rounded-xl bg-pink-50 px-3 py-2">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[28px] border border-pink-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-violet-700" />
                  <h2 className="text-lg font-semibold text-violet-700">Vaccination Status</h2>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {vaccinationStatus.map((item) => (
                    <li key={item} className="rounded-xl bg-violet-50 px-3 py-2">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-rose-700" />
                <h2 className="text-lg font-semibold text-rose-700">Emergency SOS</h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="tel:108" className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700">Call 108</a>
                <a href="tel:+919876543210" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm">Call Emergency Contact</a>
                <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700">Share Live Location</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
