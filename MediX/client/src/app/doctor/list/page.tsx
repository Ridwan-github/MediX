"use client";
import Header from "@/components/doctor/header";
import SubHeader from "@/components/doctor/subHeader";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Appointment = {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  status: string;
  patientName?: string;
  patientPhone?: string;
  doctorName?: string;
};

export default function DoctorListPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [currentDoctor, setCurrentDoctor] = useState<any>(null);
  const [clickedStartAppointment, setClickedStartAppointment] = useState<number | null>(null);

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

  // Fetch current doctor info by email
  useEffect(() => {
    if (!email) return;

    const fetchCurrentDoctor = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/doctors/email/${email}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const doctorData = await res.json();
        setCurrentDoctor(doctorData);
      } catch (err: any) {
        console.error("Failed to fetch doctor info:", err);
        setError("Failed to fetch doctor information, email: " + email);
      }
    };

    fetchCurrentDoctor();
  }, [email]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAppointments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointments.length === 0) return;
    const fetchPatients = async () => {
      const ids = appointments.map((a) => a.patientId).join(",");
      try {
        const res = await fetch(`http://localhost:8080/api/patients?id=${ids}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setPatients(await res.json());
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchPatients();
  }, [appointments]);

  useEffect(() => {
    if (appointments.length === 0) return;
    const fetchDoctors = async () => {
      const ids = appointments.map((a) => a.doctorId).join(",");
      try {
        const res = await fetch(`http://localhost:8080/api/doctors?id=${ids}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setDoctors(await res.json());
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchDoctors();
  }, [appointments]);

  const rows = appointments.map((appt) => {
    const pat = patients.find((p) => p.id === appt.patientId) || {};
    const doc = doctors.find((d) => d.doctorId === appt.doctorId) || {};

    return {
      ...appt,
      patientName: pat.name,
      patientPhone: pat.phoneNumber,
      doctorName: doc.user?.name || doc.name || "",
    };
  });

  // Filter appointments to only show those for the current doctor
  const filteredRows = currentDoctor
    ? rows.filter((appt) => appt.doctorName === currentDoctor.user?.name)
    : [];

  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = filteredRows.filter(
    (appt) => appt.appointmentDate === today
  );
  const missedAppointments = filteredRows.filter(
    (appt) => appt.appointmentDate < today
  );
  const upcomingAppointments = filteredRows.filter(
    (appt) => appt.appointmentDate > today
  );

  const filteredToday = todayAppointments.filter(
    (r) =>
      r.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      r.patientPhone?.includes(search) ||
      r.id.toString().includes(search)
  );

  const filteredMissed = missedAppointments.filter(
    (r) =>
      r.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      r.patientPhone?.includes(search) ||
      r.id.toString().includes(search)
  );

  const filteredUpcoming = upcomingAppointments.filter(
    (r) =>
      r.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      r.patientPhone?.includes(search) ||
      r.id.toString().includes(search)
  );

  const handleStartAppointment = (appointment: any) => {
    // Trigger button press animation
    setClickedStartAppointment(appointment.id);
    setTimeout(() => setClickedStartAppointment(null), 150); // Reset animation
    
    console.log("Starting appointment:", appointment);
  };

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-600 text-2xl">{error}</div>;
  }
  if (!currentDoctor) {
    return (
      <div className="text-center text-yellow-600 text-2xl">
        Doctor information not found
      </div>
    );
  }

  const renderAppointmentSection = (
    appointments: any[],
    title: string,
    bgColor: string,
    textColor: string,
    showStartButton: boolean = true
  ) => (
    <div className="mb-8">
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No appointments found</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-[6px_6px_16px_#d0d4da,-6px_-6px_16px_#ffffff]">
          <table className="w-full text-center text-gray-800">
            <thead className={`${bgColor} text-white text-md select-none`}>
              <tr>
                {[
                  "Patient ID",
                  "Patient Name",
                  "Phone",
                  "Serial #",
                  "Date",
                  ...(showStartButton ? ["Action"] : []),
                ].map((header) => (
                  <th
                    key={header}
                    className="p-3 border border-green-600 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-green-50 cursor-pointer transition duration-200"
                >
                  <td className="p-3 border border-gray-200">
                    {row.patientId}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {row.patientName}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {row.patientPhone}
                  </td>
                  <td className="p-3 border border-gray-200">{row.id}</td>
                  <td className="p-3 border border-gray-200">
                    {row.appointmentDate}
                  </td>
                  {showStartButton && (
                    <td className="p-3 border border-gray-200">
                      <button
                        onClick={() => handleStartAppointment(row)}
                        aria-pressed={clickedStartAppointment === row.id}
                        className={`bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow-[3px_3px_8px_#bfc5cc,-3px_-3px_8px_#ffffff] transition transform ${
                          clickedStartAppointment === row.id ? "scale-95" : "scale-100"
                        }`}
                      >
                        Start Appointment
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <SubHeader />

      <main className="flex-grow px-6 sm:px-12 pb-12">
        {/* Search */}
        <div className="flex justify-center mb-10 items-end gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="search"
              className="text-gray-700 font-semibold mb-2"
            >
              Search
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients"
              className="w-96 p-4 rounded-xl bg-white shadow-[inset_4px_4px_6px_#c0c5cc,inset_-4px_-4px_6px_#ffffff] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Today's Appointments */}
        {renderAppointmentSection(
          filteredToday,
          "Today's Appointments",
          "bg-green-700",
          "text-green-800"
        )}

        {/* Missed Appointments */}
        {renderAppointmentSection(
          filteredMissed,
          "Missed Appointments",
          "bg-red-700",
          "text-red-800"
        )}

        {/* Upcoming Appointments */}
        {renderAppointmentSection(
          filteredUpcoming,
          "Upcoming Appointments",
          "bg-blue-700",
          "text-blue-800",
          false
        )}
      </main>

      <Footer />
    </div>
  );
}
