"use client";
import Header from "@/components/doctor/header";
import SubHeader from "@/components/doctor/subHeader";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function DoctorPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const urlEmail = searchParams?.get("email");
    if (urlEmail) {
      localStorage.setItem("email", urlEmail);
      setEmail(urlEmail);
    } else {
      const stored = localStorage.getItem("email") || "";
      setEmail(stored);
    }
  }, [searchParams]);

  const [numberOfPatients, setNumberOfPatients] = useState("12");
  const [nextAppointment, setNextAppointment] = useState("Mr. Smith - 3:00 PM");
  const [patientsRemaining, setPatientsRemaining] = useState("5");
  const [reportsToReview, setReportsToReview] = useState("3");
  const [weeklyAppointments, setWeeklyAppointments] = useState("20");
  const [averageConsultationTime, setAverageConsultationTime] =
    useState("15 mins");

  // Color map for each stat card
  const cards = [
    {
      label: "Number of Patients Assigned Today",
      value: numberOfPatients,
      color: "text-teal-400",
    },
    {
      label: "Patients Remaining Today",
      value: patientsRemaining,
      color: "text-emerald-400",
    },
    {
      label: "Next Appointment",
      value: nextAppointment,
      color: "text-red-400",
    },
    {
      label: "Weekly Appointments",
      value: weeklyAppointments,
      color: "text-blue-400",
    },
    {
      label: "Reports to Review",
      value: reportsToReview,
      color: "text-indigo-400",
    },
    {
      label: "Average Consultation Time",
      value: averageConsultationTime,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-gray-800">
      <Header />
      <SubHeader />
      <main className="flex-grow py-10 px-6 sm:px-12 max-w-6xl mx-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#f0f6f2] rounded-3xl border border-green-900 shadow-[inset_6px_6px_10px_#c2d0c8,inset_-6px_-6px_10px_#ffffff] p-6 sm:p-8 transition-shadow duration-300 cursor-default hover:shadow-[inset_8px_8px_16px_#a0b6a9,inset_-8px_-8px_16px_#ffffff]"
            >
              <h2 className="text-md sm:text-lg font-semibold text-green-800 text-center mb-3 select-none">
                {card.label}
              </h2>
              <p
                className={`text-4xl font-extrabold text-center select-none ${card.color}`}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
