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
      id: appt.id,
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

    // Build request payload
    const payload = {
      age: parseInt(vitals.age, 10),
      gender: vitals.gender,
      weight: parseFloat(vitals.weight),
      bloodPressure: vitals.pressure,
    };

    console.log(
      "Submitting vitals:",
      payload,
      "for patient Id:",
      selectedPatient.id
    );

    try {
      const res = await fetch(
        `http://localhost:8080/api/patients/${selectedPatient.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      console.log("Vitals saved for:", selectedPatient.name, payload);
      clearForm();
      setSelectedPatient(null);
    } catch (err: any) {
      console.error("Failed to save vitals:", err);
    }

    const statusRes = await fetch(
      `http://localhost:8080/api/appointments/${selectedPatient.id}/status`,
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
    <main className="min-h-screen flex flex-col">
      <Header />
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

        <h1 className="text-2xl font-bold mb-6 text-center">
          Select a Patient to Enter Vitals
        </h1>

        {loading && <p className="text-center">Loading appointments...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        <table className="w-full  border border-gray-300 rounded-lg shadow-md text-center justify-center">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Doctor</th>
              <th className="p-2 border">Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-900 cursor-pointer"
                onClick={() => setSelectedPatient(item)}
              >
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.phoneNumber}</td>
                <td className="p-2 border">{item.doctorName}</td>
                <td className="p-2 border">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className=" p-6 rounded-lg w-full max-w-md shadow-lg bg-gray-900 text-white">
            <h2 className="text-xl font-bold mb-4 text-center">
              Enter Vitals for {selectedPatient.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {["age", "gender", "weight", "pressure"].map((field) => {
                if (field === "gender") {
                  return (
                    <select
                      key={field}
                      name="gender"
                      value={vitals.gender}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 p-2 rounded bg-gray-900 text-white"
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
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                );
              })}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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
