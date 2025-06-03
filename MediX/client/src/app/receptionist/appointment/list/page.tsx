"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type Appointment = {
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  serialNumber: string;
  time: string;
  age: string;
  height: string;
  weight: string;
  pressure: string;
};

const mockAppointments: Appointment[] = [
  {
    patientId: "P001",
    patientName: "John Doe",
    patientPhone: "0123456789",
    doctorName: "Dr. Smith",
    serialNumber: "S001",
    time: "10:00 AM",
    age: "30",
    height: "5'9\"",
    weight: "70 kg",
    pressure: "120/80",
  },
  {
    patientId: "P002",
    patientName: "Jane Doe",
    patientPhone: "0987654321",
    doctorName: "Dr. Jones",
    serialNumber: "S002",
    time: "11:00 AM",
    age: "25",
    height: "5'6\"",
    weight: "60 kg",
    pressure: "110/70",
  },
];

export default function AppointmentPage() {
  const lowerNavBgColor = "#1F4604";
  const lowerNavTextColor = "#ffffff";

  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(search.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      appointment.time.toLowerCase().includes(search.toLowerCase()) ||
      appointment.patientPhone.includes(search) ||
      appointment.serialNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowMore = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div
          style={{ backgroundColor: lowerNavBgColor, color: lowerNavTextColor }}
          className="p-4 justify-center text-center flex items-center text-2xl"
        >
          <Link
            href="/receptionist/appointment"
            className={
              usePathname() === "/receptionist/appointment"
                ? "text-white w-0 flex-1"
                : "text-black w-0 flex-1"
            }
          >
            Add Appointment
          </Link>
          <span> | </span>
          <Link
            href="/receptionist/appointment/doctor"
            className={
              usePathname() === "/receptionist/appointment/doctor"
                ? "text-white w-0 flex-1"
                : "text-black w-0 flex-1"
            }
          >
            Doctor
          </Link>
          <span> | </span>
          <Link
            href="/receptionist/appointment/vitals"
            className={
              usePathname() === "/receptionist/appointment/vitals"
                ? "text-white w-0 flex-1"
                : "text-black w-0 flex-1"
            }
          >
            Vitals Entry
          </Link>
          <span> | </span>
          <Link
            href="/receptionist/appointment/list"
            className={
              usePathname() === "/receptionist/appointment/list"
                ? "text-white w-0 flex-1"
                : "text-black w-0 flex-1"
            }
          >
            Appointment List
          </Link>
        </div>
        <div className="p-10">
          <div className="flex justify-center mb-8 space-x-4 items-center">
            <div>
              <label className="text-white-800 font-semibold">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-white-600 rounded px-4 py-2 w-96 block"
              />
            </div>
            <button className="bg-green-700 text-white px-4 py-2 mt-6 rounded hover:bg-green-900">
              SEARCH
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-900 text-white text-xl">
                <th className="p-4 border">Patient ID</th>
                <th className="p-4 border">Patient Name</th>
                <th className="p-4 border">Phone</th>
                <th className="p-4 border">Doctor Name</th>
                <th className="p-4 border">Serial Number</th>
                <th className="p-4 border">Time</th>
                <th className="p-4 border">Show More</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={index} className="">
                  <td className="p-4 border">{appointment.patientId}</td>
                  <td className="p-4 border">{appointment.patientName}</td>
                  <td className="p-4 border">{appointment.patientPhone}</td>
                  <td className="p-4 border">{appointment.doctorName}</td>
                  <td className="p-4 border">{appointment.serialNumber}</td>
                  <td className="p-4 border">{appointment.time}</td>
                  <td className="p-4 border">
                    <button
                      className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
                      onClick={() => handleShowMore(appointment)}
                    >
                      Show More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          {showModal && selectedAppointment && (
            <div className="fixed inset-0 flex items-center justify-center ">
              <div className="bg-black rounded-3xl shadow-lg p-8 w-full max-w-md relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-green-800">
                  Patient Details
                </h2>
                <div className="space-y-2 text-lg">
                  <div>
                    <span className="font-semibold">Age:</span>{" "}
                    {selectedAppointment.age}
                  </div>
                  <div>
                    <span className="font-semibold">Height:</span>{" "}
                    {selectedAppointment.height}
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
