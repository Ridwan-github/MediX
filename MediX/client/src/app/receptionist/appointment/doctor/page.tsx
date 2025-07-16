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
  const [clickedAddAppointment, setClickedAddAppointment] = useState(false);
  const [clickedDoctor, setClickedDoctor] = useState(false);
  const [clickedVitals, setClickedVitals] = useState(false);
  const [clickedList, setClickedList] = useState(false);

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

  const handleNavClick = (navType: string) => {
    // Trigger button press animation based on nav type
    switch (navType) {
      case "addAppointment":
        setClickedAddAppointment(true);
        setTimeout(() => setClickedAddAppointment(false), 150);
        break;
      case "doctor":
        setClickedDoctor(true);
        setTimeout(() => setClickedDoctor(false), 150);
        break;
      case "vitals":
        setClickedVitals(true);
        setTimeout(() => setClickedVitals(false), 150);
        break;
      case "list":
        setClickedList(true);
        setTimeout(() => setClickedList(false), 150);
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      {/* Subheader / Navigation Tabs */}
      <nav className="bg-green-100/60 backdrop-blur-sm rounded-2xl shadow-sm py-5 px-6 text-center border border-green-300">
        <div className="flex justify-center gap-8 text-green-800 font-semibold text-lg select-none transition-all duration-500">
          <Link
            href="/receptionist/appointment"
            onClick={() => handleNavClick("addAppointment")}
            className={`px-4 py-2 rounded-lg transition transform ${
              pathname === "/receptionist/appointment"
                ? "bg-green-700/80 text-white shadow-lg"
                : "hover:bg-green-600/40"
            } ${clickedAddAppointment ? "scale-95" : "scale-100"}`}
          >
            Add Appointment
          </Link>
          <Link
            href="/receptionist/appointment/doctor"
            onClick={() => handleNavClick("doctor")}
            className={`px-4 py-2 rounded-lg transition transform ${
              pathname === "/receptionist/appointment/doctor"
                ? "bg-green-700/80 text-white shadow-lg"
                : "hover:bg-green-600/40"
            } ${clickedDoctor ? "scale-95" : "scale-100"}`}
          >
            Doctor
          </Link>
          <Link
            href="/receptionist/appointment/vitals"
            onClick={() => handleNavClick("vitals")}
            className={`px-4 py-2 rounded-lg transition transform ${
              pathname === "/receptionist/appointment/vitals"
                ? "bg-green-700/80 text-white shadow-lg"
                : "hover:bg-green-600/40"
            } ${clickedVitals ? "scale-95" : "scale-100"}`}
          >
            Vitals Entry
          </Link>
          <Link
            href="/receptionist/appointment/list"
            onClick={() => handleNavClick("list")}
            className={`px-4 py-2 rounded-lg transition transform ${
              pathname === "/receptionist/appointment/list"
                ? "bg-green-700/80 text-white shadow-lg"
                : "hover:bg-green-600/40"
            } ${clickedList ? "scale-95" : "scale-100"}`}
          >
            Appointment List
          </Link>
        </div>
      </nav>

      <main className="flex-grow px-6 sm:px-12 pb-12">
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
              placeholder="Search doctors"
              className="w-96 p-4 rounded-xl bg-white shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-500 text-lg">Loading doctors…</p>
        )}
        {error && <p className="text-center text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-[6px_6px_16px_#d0d4da,-6px_-6px_16px_#ffffff]">
            <table className="w-full border-collapse text-gray-800 text-center">
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
                    <tr className="hover:bg-green-50 cursor-pointer transition-all duration-200">
                      <td className="p-4 border border-green-100">
                        {doctor.name}
                      </td>
                      <td className="p-4 border border-green-100">Surgery</td>
                      <td className="p-4 border border-green-100">MBBS, MD</td>
                      <td className="p-4 border border-green-100">
                        {doctor.contact}
                      </td>
                      <td className="p-4 border border-green-100">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            doctor.available
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {doctor.available ? "Available" : "Not Available"}
                        </span>
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
