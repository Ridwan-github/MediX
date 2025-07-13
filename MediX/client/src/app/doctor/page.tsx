"use client";
import Header from "@/components/doctor/header";
import SubHeader from "@/components/doctor/subHeader";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Doctor {
  doctorId: number;
  user: {
    name: string;
    email: string;
  };
}

interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  status: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
}

export default function DoctorPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch doctor information
  const fetchDoctorInfo = async (email: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/doctors/email/${email}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const doctorData = await response.json();
      setDoctor(doctorData);
      return doctorData;
    } catch (err: any) {
      setError(`Failed to fetch doctor info: ${err.message}`);
      return null;
    }
  };

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/appointments/with-details");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const appointmentsData = await response.json();
      setAppointments(appointmentsData);
      return appointmentsData;
    } catch (err: any) {
      setError(`Failed to fetch appointments: ${err.message}`);
      return [];
    }
  };

  // Calculate statistics
  const calculateStats = (doctorData: Doctor, appointmentsData: Appointment[]) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of current week (Sunday)
    const endOfWeek = new Date();
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay())); // End of current week (Saturday)

    // Filter appointments for this doctor
    const doctorAppointments = appointmentsData.filter(
      (appt) => appt.doctorName === doctorData.user.name
    );

    // Today's appointments
    const todaysAppointments = doctorAppointments.filter(
      (appt) => appt.appointmentDate === today
    );

    // Weekly appointments (current week)
    const weeklyAppointments = doctorAppointments.filter((appt) => {
      const appointmentDate = new Date(appt.appointmentDate);
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
    });

    // Next appointment (first future appointment)
    const futureAppointments = doctorAppointments
      .filter((appt) => new Date(appt.appointmentDate) >= new Date())
      .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());

    const nextAppointment = futureAppointments.length > 0 ? futureAppointments[0] : null;

    return {
      numberOfPatients: todaysAppointments.length.toString(),
      patientsRemaining: todaysAppointments.filter(appt => appt.status === "READY").length.toString(),
      weeklyAppointments: weeklyAppointments.length.toString(),
      nextAppointment: nextAppointment 
        ? `${nextAppointment.patientName} - ${new Date(nextAppointment.appointmentDate).toLocaleDateString()}`
        : "No upcoming appointments"
    };
  };

  // Main data fetching effect
  useEffect(() => {
    const loadData = async () => {
      if (!email) return;
      
      setLoading(true);
      setError(null);

      try {
        const doctorData = await fetchDoctorInfo(email);
        if (!doctorData) return;

        const appointmentsData = await fetchAppointments();
        const stats = calculateStats(doctorData, appointmentsData);

        setNumberOfPatients(stats.numberOfPatients);
        setPatientsRemaining(stats.patientsRemaining);
        setWeeklyAppointments(stats.weeklyAppointments);
        setNextAppointment(stats.nextAppointment);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [email]);

  const [numberOfPatients, setNumberOfPatients] = useState("0");
  const [nextAppointment, setNextAppointment] = useState("Loading...");
  const [patientsRemaining, setPatientsRemaining] = useState("0");
  const [reportsToReview, setReportsToReview] = useState("0");
  const [weeklyAppointments, setWeeklyAppointments] = useState("0");
  const [averageConsultationTime, setAverageConsultationTime] = useState("0 mins");

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
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#ffffff] text-gray-800">
        <Header />
        <SubHeader />
        <main className="flex-grow py-10 px-6 sm:px-12 max-w-6xl mx-auto">
          <div className="text-center text-2xl text-green-800">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[#ffffff] text-gray-800">
        <Header />
        <SubHeader />
        <main className="flex-grow py-10 px-6 sm:px-12 max-w-6xl mx-auto">
          <div className="text-center text-2xl text-red-600">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-gray-800">
      <Header />
      <SubHeader />
      <main className="flex-grow py-10 px-6 sm:px-12 max-w-6xl mx-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
