import PregnantProfileCard from "../components/pregnant/PregnantProfileCard";

const profile = {
  name: "Lakshmi Devi",
  age: "28",
  pregnancyWeek: "24 Weeks",
  bloodGroup: "O+",
  village: "Kothapalli",
  emergencyContact: "+91 98765 43210",
  medicalHistory: [
    "No major complications",
    "Mild anemia observed in last checkup",
    "Regular folic acid intake",
  ],
  uploadedReports: [
    "Blood Report - 14 Jul 2026",
    "Ultrasound Scan - 10 Jul 2026",
    "Prescription - 08 Jul 2026",
  ],
  aiHealthScore: "92 / 100",
  appointments: [
    "ANC Checkup - 30 Jul 2026",
    "Doctor Follow-up - 05 Aug 2026",
  ],
  vaccinationStatus: [
    "TT Dose 1 - Completed",
    "Iron Tablets - Ongoing",
    "Calcium Tablets - Ongoing",
  ],
};

export default function PregnantProfilePage() {
  return <PregnantProfileCard {...profile} />;
}
