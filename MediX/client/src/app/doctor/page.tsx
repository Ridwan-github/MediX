"use client";
import Header from "@/components/doctor/header";
import SubHeader from "@/components/doctor/subHeader";
import Footer from "@/components/footer";
import Prescription from "@/components/doctor/prescription1";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface DoctorPageProps {
  searchParams: { email?: string };
}

export default function DoctorPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // If we have email in URL, store it
    const urlEmail = searchParams?.get("email");

    if (urlEmail) {
      localStorage.setItem("email", urlEmail);
      setEmail(urlEmail);
    } else {
      // Otherwise, fallback to whatever's in localStorage
      const stored = localStorage.getItem("email") || "";
      setEmail(stored);
    }
  }, [searchParams]);

  const [numberOfPatients, setNumberOfPatients] = useState("12");
  const [nextAppointment, setNextAppointment] = useState("Mr. Smith - 3:00 PM");
  const [patientsRemaining, setPatientsRemaining] = useState("5");
  const [reportsToReview, setReportsToReview] = useState("3");
  const [weeklyAppointments, setWeeklyAppointments] = useState("20");
  const [averageConsultaionTime, setAverageConsultationTime] =
    useState("15 mins");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow p-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-200">
            My Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Patients Added Today */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Number of Patients Assigned Today
              </h2>
              <p className="text-4xl font-bold mt-4 text-blue-400">
                {numberOfPatients}
              </p>
            </div>

            {/* Card 3: Total Visiting Fee Today */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Patients Remaining Today
              </h2>
              <p className="text-4xl font-bold mt-4 text-green-400">
                {patientsRemaining}
              </p>
            </div>

            {/* Card 2: Patients Payment Due */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Next Appointment
              </h2>
              <p className="text-4xl font-bold mt-4 text-red-400">
                {nextAppointment}
              </p>
            </div>

            {/* Card 5: Weekly Appointments */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Weekly Appointments
              </h2>
              <p className="text-4xl font-bold mt-4 text-purple-400">
                {weeklyAppointments}
              </p>
            </div>

            {/* Card 4: Total Visiting Fee This Month */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Reports to Review
              </h2>
              <p className="text-4xl font-bold mt-4 text-green-500">
                {reportsToReview}
              </p>
            </div>

            {/* Card 6: Average Consultation Time */}
            <div className="bg-gray-800 rounded-3xl shadow-lg p-8 flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-300">
                Average Consultation Time
              </h2>
              <p className="text-4xl font-bold mt-4 text-yellow-400">
                {averageConsultaionTime}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
