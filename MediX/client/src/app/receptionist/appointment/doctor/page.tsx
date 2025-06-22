"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type Doctor = {
  name: string;
  specialization: string; // will remain blank for now
  degree: string; // will remain blank for now
  contact: string;
  available: boolean;
};

export default function DoctorListPage() {
  const pathname = usePathname();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const lowerNavBgColor = "#1F4604";
  const lowerNavTextColor = "#ffffff";

  useEffect(() => {
    fetch("http://localhost:8080/api/doctors")
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: any[]) => {
        const mapped: Doctor[] = data.map((d) => ({
          name: d.user.name,
          specialization: "", // foreign key for specializationId
          degree: "", // foreign key for qualificationId
          contact: d.user.phoneNumber,
          available: Boolean(d.availableDays),
        }));
        setDoctors(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase()) ||
      doctor.degree.toLowerCase().includes(search.toLowerCase()) ||
      doctor.contact.toLowerCase().includes(search.toLowerCase())
  );

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

      <main className="flex-grow px-6 sm:px-10 pb-10 max-w-7xl mx-auto">
        <div className="flex justify-center mb-8 space-x-6 items-end">
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
              className="border border-gray-300 rounded-lg px-4 py-2 w-96 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search doctors by name, contact..."
            />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition">
            SEARCH
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Loading doctors…</p>
        )}
        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full border-collapse text-gray-800">
              <thead className="bg-green-700 text-white text-lg select-none">
                <tr>
                  <th className="p-4 border border-green-600">Name</th>
                  <th className="p-4 border border-green-600">
                    Specialization
                  </th>
                  <th className="p-4 border border-green-600">Degree</th>
                  <th className="p-4 border border-green-600">Contact</th>
                  <th className="p-4 border border-green-600">Available</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor, index) => (
                  <Link
                    key={index}
                    href={`/receptionist/appointment?doctor=${encodeURIComponent(
                      doctor.name
                    )}`}
                    passHref
                    legacyBehavior
                  >
                    <tr
                      key={index}
                      className="hover:bg-green-50 cursor-pointer transition-colors duration-200"
                    >
                      <td className="p-4 border border-green-100">
                        {doctor.name}
                      </td>
                      <td className="p-4 border border-green-100">Surgery</td>
                      <td className="p-4 border border-green-100">MBBS, MD</td>
                      <td className="p-4 border border-green-100">
                        {doctor.contact}
                      </td>
                      <td className="p-4 border border-green-100">
                        {doctor.available ? "Yes" : "No"}
                      </td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
