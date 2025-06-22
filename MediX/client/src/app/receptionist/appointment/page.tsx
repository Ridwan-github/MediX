"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AppointmentPage() {
  const lowerNavBgColor = "#1F4604";
  const lowerNavTextColor = "#ffffff";
  const router = useRouter();

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

  const [availableDoctors, setAvailableDoctors] = useState<any[]>([]);

  useEffect(() => {
    // First fetch available doctors
    fetch("http://localhost:8080/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        setAvailableDoctors(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const todayDate = new Date().toISOString().slice(0, 10);

  const [patient, setPatient] = useState({
    name: "",
    contact: "",
    appointmentDate: todayDate,
    doctor: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let patientId;

      // Step 1 & 2: Check if patient exists by phone number
      const patientResponse = await fetch(
        `http://localhost:8080/api/patients/by-phone?phoneNumber=${patient.contact}`
      );

      console.log("Patient response status:", patientResponse.status);

      if (patientResponse.ok) {
        // Patient exists, get their ID
        const existingPatient = await patientResponse.json();
        patientId = existingPatient.id;
      } else if (patientResponse.status === 404) {
        console.log("Patient not found, creating a new one");
        // Step 3: Patient does not exist, create a new one
        const newPatientResponse = await fetch(
          "http://localhost:8080/api/patients/basic",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: patient.name,
              phoneNumber: patient.contact,
            }),
          }
        );
        console.log("New patient response status:", newPatientResponse.status);
        const newPatient = await newPatientResponse.json();
        patientId = newPatient.id;
        console.log("New patient created with ID:", patientId);
      } else {
        // Handle other errors
        console.error(
          "Failed to check for patient:",
          patientResponse.statusText
        );
        return;
      }

      // Step 4 & 5 is assumed: you have the doctorId
      if (!patient.doctor) {
        console.error("Doctor not selected");
        return;
      }

      // Step 6: Create the appointment
      const appointmentData = {
        patientId: patientId,
        doctorId: parseInt(patient.doctor, 10), // This should now be a valid ID
        appointmentDate: patient.appointmentDate,
      };

      const appointmentResponse = await fetch(
        "http://localhost:8080/api/appointments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentData),
        }
      );

      if (!appointmentResponse.ok) {
        console.error(
          "Failed to create appointment:",
          appointmentResponse.statusText
        );
      } else {
        console.log("Appointment created successfully");
        // clearForm();
      }
    } catch (error) {
      console.error("Error in appointment creation process:", error);
    }

    router.push("/receptionist/appointment/vitals");
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
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      {/* Subheader / Navigation Tabs */}
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

      {/* Body Content */}
      <main className="flex-grow bg-gray-50 text-gray-900 rounded-t-3xl shadow-lg mx-6 mb-10 p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Patient Info
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-md p-8 max-w-md mx-auto space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            required
            value={patient.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            required
            value={patient.contact}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            name="doctor"
            required
            value={patient.doctor}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              Select a Doctor
            </option>
            {availableDoctors.map((doctor) => (
              <option key={doctor.doctorId} value={doctor.doctorId}>
                {doctor.user.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="appointmentDate"
            required
            value={patient.appointmentDate || ""}
            onChange={handleChange}
            min={todayDate}
            className="w-full p-3 rounded-xl border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex justify-between gap-6">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-green-700 transition"
            >
              Add Patient
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-red-700 transition"
            >
              Clear
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
