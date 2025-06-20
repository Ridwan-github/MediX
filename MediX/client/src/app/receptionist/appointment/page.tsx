"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function AppointmentPage() {
  const lowerNavBgColor = "#1F4604";
  const lowerNavTextColor = "#ffffff";

  const searchParams = useSearchParams();
  const selectedDoctor = searchParams?.get("doctor");

  useEffect(() => {
    if (selectedDoctor) {
      setPatient((prev) => ({
        ...prev,
        doctor: selectedDoctor,
      }));
    }
  }, [selectedDoctor]);

  const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);

  useEffect(() => {
    // First fetch available doctors
    fetch("http://localhost:8080/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        // extract doctor names
        const doctorNames = data.map((d) => d.user.name);
        setAvailableDoctors(doctorNames);
      })
      .catch((err) => console.error(err));
  }, []);

  const todayDate = new Date().toISOString().split("T")[0];

  const [patient, setPatient] = useState({
    name: "",
    contact: "",
    appointmentDate: todayDate,
    doctor: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const appointment = {
        name: patient.name,
        contact: patient.contact,
        appointmentDate: patient.appointmentDate,
        doctor: patient.doctor,
      };
      const response = await fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });
      if (!response.ok) {
        console.error("Failed to add patient:", response.statusText);
      } else {
        console.log("Patient added successfully");
        clearForm();
      }
    } catch (error) {
      console.error("Error submitting patient:", error);
    }
  };

  const clearForm = () => {
    setPatient({
      name: "",
      contact: "",
      appointmentDate: todayDate,
      doctor: "",
    });
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

        <div className="justify-center text-center mt-10 mb-10">
          <h1 className="text-3xl font-bold">Patient Info</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center mt-4 justify-between space-y-4 bg-gray-800 rounded-3xl shadow-lg p-8"
            style={{ width: "400px", margin: "0 auto" }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={patient.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              style={{ width: "300px" }}
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              required
              value={patient.contact}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              style={{ width: "300px" }}
            />
            <select
              name="doctor"
              required
              value={patient.doctor}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded bg-gray-800 text-white"
              style={{ width: "300px" }}
            >
              <option value="">Select a Doctor</option>
              {availableDoctors.map((doctor, idx) => (
                <option key={idx} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="appointmentDate"
              required
              value={patient.appointmentDate || todayDate}
              onChange={handleChange}
              min={todayDate}
              className="border border-gray-300 p-2 rounded"
              style={{ width: "300px" }}
            />
            <div
              className="flex justify-center w-half max-w-md space-x-8"
              style={{ width: "300px" }}
            >
              <button
                type="submit"
                className="bg-green-500 text-black p-2 rounded transition-colors duration-200 hover:bg-blue-700 hover:text-white"
              >
                Add Patient
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="bg-red-500 text-white p-2 rounded transition-colors duration-200 hover:bg-red-700 hover:text-white"
                style={{ width: "110px" }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
