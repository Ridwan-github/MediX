"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { usePathname } from "next/navigation";

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
      <nav className="backdrop-blur-md bg-green-600/20 border border-green-400 rounded-xl shadow-md mx-6 mt-2 mb-6 py-3 px-8 flex justify-center gap-8 text-green-800 font-semibold text-lg select-none">
        {[
          ["Add Appointment", "/receptionist/appointment"],
          ["Doctor", "/receptionist/appointment/doctor"],
          ["Vitals Entry", "/receptionist/appointment/vitals"],
          ["Appointment List", "/receptionist/appointment/list"],
        ].map(([label, path]) => (
          <Link
            key={path}
            href={path}
            className={`px-4 py-2 rounded-lg transition ${
              usePathname() === path
                ? "bg-green-700/80 text-white shadow-lg"
                : "hover:bg-green-600/40"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

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

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-[6px_6px_16px_#d0d4da,-6px_-6px_16px_#ffffff]">
          <table className="w-full text-center text-gray-800">
            <thead className="bg-green-700 text-white text-md select-none">
              <tr>
                {[
                  "Patient ID",
                  "Patient Name",
                  "Phone",
                  "Doctor Name",
                  "Serial #",
                  "Date",
                  "Show More",
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
              {filteredRows.map((row) => (
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
                  <td className="p-3 border border-gray-200">
                    {row.doctorName}
                  </td>
                  <td className="p-3 border border-gray-200">{row.id}</td>
                  <td className="p-3 border border-gray-200">
                    {row.appointmentDate}
                  </td>
                  <td className="p-3 border border-gray-200">
                    <button
                      onClick={() => handleShowMore(row)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-[3px_3px_8px_#bfc5cc,-3px_-3px_8px_#ffffff] transition"
                    >
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
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white text-gray-800 p-6 rounded-3xl w-full max-w-md relative">
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-6 text-center text-green-800">
                Patient Details
              </h2>
              <div className="space-y-4 text-base">
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
