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
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <SubHeader />
      <main className="flex-grow py-10 px-4 sm:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Heading */}
          <h1 className="text-4xl font-bold text-center text-green-800 mb-10">
            Doctor Dashboard
          </h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-green-50/40 backdrop-blur-md rounded-2xl border border-green-200 shadow-lg p-6 sm:p-8 hover:shadow-green-400/30 transition duration-200"
              >
                <h2 className="text-md sm:text-lg font-medium text-gray-700 text-center mb-2">
                  {card.label}
                </h2>
                <p
                  className={`text-3xl sm:text-4xl font-bold text-center ${card.color}`}
                >
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
