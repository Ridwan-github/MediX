"use client";
import { useEffect, useState } from "react";
import Header from "@/components/admin/header";
import Footer from "@/components/footer";

type Specialization = {
  id: number;
  name: string;
};
type Qualification = {
  id: number;
  name: string;
};

export default function SpecificationsQualificationsPage() {
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch("http://localhost:8080/api/specializations").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch specializations");
        return res.json();
      }),
      fetch("http://localhost:8080/api/qualifications").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch qualifications");
        return res.json();
      })
    ])
      .then(([specs, quals]) => {
        setSpecializations(specs);
        setQualifications(quals);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto py-10 px-4 w-full">
        <div className="bg-gradient-to-r from-green-100/80 via-green-200/50 to-green-100/80 rounded-2xl shadow-lg p-8 border border-green-200">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl md:text-4xl">🎓</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 tracking-tight">Specializations & Degrees</h1>
          </div>
          {loading ? (
            <div className="flex items-center gap-2 text-green-800 animate-pulse">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              <span>Loading specializations and degrees...</span>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white/80 rounded-xl shadow p-6 border border-green-100 flex flex-col">
                <h2 className="text-2xl font-bold mb-4 text-green-800 flex items-center gap-2">
                  <span className="text-green-700">🩺</span> Specializations
                </h2>
                <ul className="flex-1 space-y-2">
                  {specializations.length === 0 ? (
                    <li className="text-gray-400 italic">No specializations found.</li>
                  ) : (
                    specializations.map((spec) => (
                      <li key={spec.id} className="px-3 py-2 rounded bg-green-50 border border-green-100 text-green-900 shadow-sm hover:bg-green-100 transition">
                        {spec.name}
                      </li>
                    ))
                  )}
                </ul>
              </section>
              <section className="bg-white/80 rounded-xl shadow p-6 border border-green-100 flex flex-col">
                <h2 className="text-2xl font-bold mb-4 text-green-800 flex items-center gap-2">
                  <span className="text-green-700">📜</span> Degrees
                </h2>
                <ul className="flex-1 space-y-2">
                  {qualifications.length === 0 ? (
                    <li className="text-gray-400 italic">No degrees found.</li>
                  ) : (
                    qualifications.map((qual) => (
                      <li key={qual.id} className="px-3 py-2 rounded bg-green-50 border border-green-100 text-green-900 shadow-sm hover:bg-green-100 transition">
                        {qual.name}
                      </li>
                    ))
                  )}
                </ul>
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
