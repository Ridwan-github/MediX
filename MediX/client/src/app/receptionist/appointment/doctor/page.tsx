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
              pathname === "/receptionist/appointment"
                ? "text-white flex-1"
                : "text-black flex-1"
            }
          >
            Add Appointment
          </Link>
          <span>|</span>
          <Link
            href="/receptionist/appointment/doctor"
            className={
              pathname === "/receptionist/appointment/doctor"
                ? "text-white flex-1"
                : "text-black flex-1"
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

          {loading && (
            <p className="text-center text-gray-500">Loading doctors…</p>
          )}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && !error && (
            <table className="w-full border-collapse ">
              <thead>
                <tr className="bg-green-900 text-white text-xl">
                  <th className="p-4 border">Name</th>
                  <th className="p-4 border">Specialization</th>
                  <th className="p-4 border">Degree</th>
                  <th className="p-4 border">Contact</th>
                  <th className="p-4 border">Available</th>
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
                      className="hover:bg-gray-800  transition-colors duration-200 cursor-pointer"
                    >
                      <td className="p-4 border">{doctor.name}</td>
                      <td className="p-4 border">Surgery</td>
                      <td className="p-4 border">MBBS, MD</td>
                      <td className="p-4 border">{doctor.contact}</td>
                      <td className="p-4 border">
                        {doctor.available ? "Yes" : "No"}
                      </td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
