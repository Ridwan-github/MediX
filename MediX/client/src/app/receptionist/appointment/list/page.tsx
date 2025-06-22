"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { usePathname } from "next/navigation";

// const mockAppointments: Appointment[] = [
//   {
//     patientId: "P001",
//     patientName: "John Doe",
//     patientPhone: "0123456789",
//     doctorName: "Dr. Smith",
//     serialNumber: "S001",
//     time: "10:00 AM",
//     age: "30",
//     height: "5'9\"",
//     weight: "70 kg",
//     pressure: "120/80",
//   },
//   {
//     patientId: "P002",
//     patientName: "Jane Doe",
//     patientPhone: "0987654321",
//     doctorName: "Dr. Jones",
//     serialNumber: "S002",
//     time: "11:00 AM",
//     age: "25",
//     height: "5'6\"",
//     weight: "60 kg",
//     pressure: "110/70",
//   },
// ];

export default function AppointmentPage() {
  const lowerNavBgColor = "#1F4604";
  const lowerNavTextColor = "#ffffff";

  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState(false);

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

  const pendingAppointments = appointments.filter(
    (appt) => appt.status === "READY"
  );

  useEffect(() => {
    if (pendingAppointments.length === 0) return;
    const fetchPatient = async () => {
      const ids = pendingAppointments.map((a) => a.patientId).join(",");
      try {
        const res = await fetch(`http://localhost:8080/api/patients?id=${ids}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setPatients(await res.json());
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchPatient();
  }, [pendingAppointments]);

  useEffect(() => {
    if (pendingAppointments.length === 0) return;

    const fetchDoctors = async () => {
      let doctorId = pendingAppointments.map(
        (appointment) => appointment.doctorId
      );
      try {
        const res = await fetch(
          `http://localhost:8080/api/doctors?id=${doctorId.join(",")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setDoctors(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [pendingAppointments]);

  const rows = pendingAppointments.map((appt) => {
    const pat = patients.find((p) => p.id === appt.patientId) || {};
    const doc =
      doctors.find(
        (d) => d.id === appt.doctorId || d.doctorId === appt.doctorId
      ) || {};

    return {
      ...appt,
      patientName: pat.name,
      patientPhone: pat.phoneNumber,
      doctorName: doc.user?.name || doc.name || "",
      appointmentDate: appt.appointmentDate,
      age: pat.age,
      gender: pat.gender,
      weight: pat.weight,
      pressure: pat.bloodPressure,
    };
  });

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-600 text-2xl">{error}</div>;
  }

  const filteredRows = rows.filter(
    (r) =>
      r.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      r.patientPhone?.includes(search) ||
      r.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toString().includes(search)
  );

  const handleShowMore = (row: any) => {
    setSelectedAppointment(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />

      {/* Subheader */}
      <nav className="backdrop-blur-md bg-green-600/20 border border-green-400 rounded-xl shadow-md mx-6 my-6 py-3 px-8 flex justify-center gap-8 text-green-800 font-semibold text-lg select-none">
        <Link
          href="/receptionist/appointment"
          className={`px-4 py-2 rounded-lg transition ${
            usePathname() === "/receptionist/appointment"
              ? "bg-green-700/80 text-white shadow-lg"
              : "hover:bg-green-600/40"
          }`}
        >
          Add Appointment
        </Link>
        <Link
          href="/receptionist/appointment/doctor"
          className={`px-4 py-2 rounded-lg transition ${
            usePathname() === "/receptionist/appointment/doctor"
              ? "bg-green-700/80 text-white shadow-lg"
              : "hover:bg-green-600/40"
          }`}
        >
          Doctor
        </Link>
        <Link
          href="/receptionist/appointment/vitals"
          className={`px-4 py-2 rounded-lg transition ${
            usePathname() === "/receptionist/appointment/vitals"
              ? "bg-green-700/80 text-white shadow-lg"
              : "hover:bg-green-600/40"
          }`}
        >
          Vitals Entry
        </Link>
        <Link
          href="/receptionist/appointment/list"
          className={`px-4 py-2 rounded-lg transition ${
            usePathname() === "/receptionist/appointment/list"
              ? "bg-green-700/80 text-white shadow-lg"
              : "hover:bg-green-600/40"
          }`}
        >
          Appointment List
        </Link>
      </nav>

      {/* Body */}
      <main className="flex-grow px-6 sm:px-12 pb-12">
        {/* Search */}
        <div className="flex justify-center mb-8 gap-4 items-end">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, doctor..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow">
            SEARCH
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-center text-gray-800">
            <thead className="bg-green-700 text-white text-md">
              <tr>
                <th className="p-3 border border-green-600">Patient ID</th>
                <th className="p-3 border border-green-600">Patient Name</th>
                <th className="p-3 border border-green-600">Phone</th>
                <th className="p-3 border border-green-600">Doctor Name</th>
                <th className="p-3 border border-green-600">Serial #</th>
                <th className="p-3 border border-green-600">Date</th>
                <th className="p-3 border border-green-600">Show More</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-green-50 transition cursor-pointer"
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
                  <td className="p-3 border border-gray-200">
                    {row.doctorName}
                  </td>
                  <td className="p-3 border border-gray-200">{row.id}</td>
                  <td className="p-3 border border-gray-200">
                    {row.appointmentDate}
                  </td>
                  <td className="p-3 border border-gray-200">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
                      Show More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white text-gray-800 p-6 rounded-2xl w-full max-w-md shadow-xl relative">
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-center text-green-800">
                Patient Details
              </h2>
              <div className="space-y-3 text-base">
                <div>
                  <span className="font-semibold">Age:</span>{" "}
                  {selectedAppointment.age}
                </div>
                <div>
                  <span className="font-semibold">Gender:</span>{" "}
                  {selectedAppointment.gender}
                </div>
                <div>
                  <span className="font-semibold">Weight:</span>{" "}
                  {selectedAppointment.weight}
                </div>
                <div>
                  <span className="font-semibold">Pressure:</span>{" "}
                  {selectedAppointment.pressure}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
