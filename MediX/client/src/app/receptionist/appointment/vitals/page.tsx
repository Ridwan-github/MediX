"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VitalsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);

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
    (appt) => appt.status === "NOT_READY"
  );

  useEffect(() => {
    const fetchPatient = async () => {
      let patientPhone = pendingAppointments.map(
        (appointment) => appointment.contact
      );
      try {
        const res = await fetch(
          `http://localhost:8080/api/patients?phone=${patientPhone.join(",")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPatients(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, []);

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
    const doc = doctors.find((d) => d.doctorId === appt.doctorId) || {};
    return {
      appointmentId: appt.id, // appointment PK
      patientId: appt.patientId, // add this!
      name: pat.name,
      phoneNumber: pat.phoneNumber,
      doctorName: doc.user?.name || doc.name || "",
      date: appt.appointmentDate || appt.date || "",
    };
  });

  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [vitals, setVitals] = useState({
    age: "",
    gender: "",
    weight: "",
    pressure: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVitals((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const pid = selectedPatient.id;

    // Build request payload
    const payload = {
      age: parseInt(vitals.age, 10),
      gender: vitals.gender,
      weight: parseFloat(vitals.weight),
      bloodPressure: vitals.pressure,
    };

    console.log("PUT vitals for patient", pid, payload);

    try {
      const res = await fetch(`http://localhost:8080/api/patients/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      console.log("Vitals saved for:", selectedPatient.name, payload);
      clearForm();
      setSelectedPatient(null);
    } catch (err: any) {
      console.error("Failed to save vitals:", err);
    }

    const statusRes = await fetch(
      `http://localhost:8080/api/appointments/${selectedPatient.appointmentId}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "READY" }),
      }
    );
    if (!statusRes.ok) {
      console.error(
        "Failed to update appointment status:",
        statusRes.statusText
      );
    } else {
      console.log("Appointment status set to READY");
    }

    await fetchAppointments(); // Refresh appointments list

    clearForm();
    setSelectedPatient(null);
  };

  const clearForm = () => {
    setVitals({
      age: "",
      gender: "",
      weight: "",
      pressure: "",
    });
  };

  const [search, setSearch] = useState("");

  const filteredAppointments = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phoneNumber.includes(search) ||
      r.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      r.date.includes(search)
  );

  const lowerNavBgColor = "#1F4604";
  const lowerNavTextColor = "#ffffff";

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />

      {/* Subheader Nav */}
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

      <div className="px-6 sm:px-12 pb-10">
        {/* Search */}
        <div className="flex justify-center mb-8 gap-4 items-end">
          <div className="flex flex-col">
            <label className="font-semibold mb-2">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, contact, doctor, date..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow">
            SEARCH
          </button>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Select a Patient to Enter Vitals
        </h1>

        {/* Appointment Table */}
        {loading && (
          <p className="text-center text-gray-500">Loading appointments...</p>
        )}
        {error && <p className="text-center text-red-600">Error: {error}</p>}

        <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200">
          <table className="w-full text-center text-gray-700">
            <thead className="bg-green-700 text-white text-md">
              <tr>
                <th className="p-3 border border-green-600">Name</th>
                <th className="p-3 border border-green-600">Contact</th>
                <th className="p-3 border border-green-600">Doctor</th>
                <th className="p-3 border border-green-600">
                  Appointment Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((item) => (
                <tr
                  key={item.appointmentId}
                  className="hover:bg-green-50 cursor-pointer transition"
                  onClick={() => setSelectedPatient(item)}
                >
                  <td className="p-3 border border-gray-200">{item.name}</td>
                  <td className="p-3 border border-gray-200">
                    {item.phoneNumber}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {item.doctorName}
                  </td>
                  <td className="p-3 border border-gray-200">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vitals Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Enter Vitals for {selectedPatient.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Fields */}
              {["age", "gender", "weight", "pressure"].map((field) => {
                if (field === "gender") {
                  return (
                    <select
                      key={field}
                      name="gender"
                      value={vitals.gender}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 p-2 rounded-md bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  );
                }
                const type = ["age", "weight"].includes(field)
                  ? "number"
                  : "text";
                return (
                  <input
                    key={field}
                    type={type}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={(vitals as any)[field]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                );
              })}

              {/* Buttons */}
              <div className="flex justify-between pt-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearForm();
                    setSelectedPatient(null);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
