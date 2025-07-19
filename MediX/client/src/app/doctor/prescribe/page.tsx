"use client";
import Header from "@/components/doctor/header";
import SubHeader from "@/components/doctor/subHeader";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Prescribe() {
  const [showHistory, setShowHistory] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  // Form state
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    cc: "",
    oe: "",
    invs: "",
    adv: "",
  });

  useEffect(() => {
    const urlEmail = searchParams?.get("email");
    if (urlEmail) {
      localStorage.setItem("email", urlEmail);
      setEmail(urlEmail);
    } else {
      const stored = localStorage.getItem("email") || "";
      setEmail(stored);
    }
    // Only prefill if ?edit=1 is present
    const isEdit = searchParams?.get("edit") === "1";
    if (isEdit) {
      const prescriptionData = localStorage.getItem("prescriptionData");
      if (prescriptionData) {
        const parsed = JSON.parse(prescriptionData);
        setForm({
          name: parsed.name || "",
          age: parsed.age || "",
          gender: parsed.gender || "",
          cc: parsed.cc || "",
          oe: parsed.oe || "",
          invs: parsed.invs || "",
          adv: parsed.adv || "",
        });
      }
    } else {
      setForm({
        name: "",
        age: "",
        gender: "",
        cc: "",
        oe: "",
        invs: "",
        adv: "",
      });
    }
  }, [searchParams]);

  const mockHistory = [
    {
      id: 1,
      date: "2024-12-01",
      notes: "Prescribed Amoxicillin 500mg for 7 days. Advised rest.",
    },
    {
      id: 2,
      date: "2024-11-15",
      notes: "Follow-up visit. Condition improving. Reduced dosage.",
    },
    {
      id: 3,
      date: "2024-11-01",
      notes: "Initial consultation. Diagnosed with throat infection.",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setForm((prev) => ({ ...prev, gender: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContinue = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;
    localStorage.setItem(
      "prescriptionData",
      JSON.stringify({ ...form, date: currentDate })
    );
    router.push("/doctor/prescribe/preview");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* Form Section */}
          <div className="w-full max-w-2xl mx-auto md:mx-0 bg-white border border-green-200 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-green-800">New Prescription</h2>
            <form className="space-y-5">
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">Patient Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 h-[42px]"
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col w-24">
                  <label className="mb-1 text-sm font-medium text-gray-700">Age</label>
                  <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 h-[42px]"
                    autoComplete="off"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="flex flex-col justify-end h-full min-h-[60px]">
                  <label className="mb-1 text-sm font-medium text-gray-700">Gender:</label>
                  <div className="flex items-center gap-2 h-[42px]">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={form.gender === "Male"}
                        onChange={handleChange}
                        className="accent-green-600"
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={form.gender === "Female"}
                        onChange={handleChange}
                        className="accent-green-600"
                      />
                      <span>Female</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">C/C (Chief Complaint)</label>
                <textarea
                  name="cc"
                  value={form.cc}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows={3}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">O/E (On Examination)</label>
                <textarea
                  name="oe"
                  value={form.oe}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows={3}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">Invs (Investigations)</label>
                <textarea
                  name="invs"
                  value={form.invs}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows={2}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">ADV (Advice)</label>
                <textarea
                  name="adv"
                  value={form.adv}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition duration-200"
                  onClick={handleContinue}
                >
                  Save and Continue
                </button>
              </div>
            </form>
          </div>

          {/* History Toggle Section */}
          <div className="w-full md:w-[300px] flex flex-col justify-start items-center text-center">
            <button
              onClick={() => setShowHistory((prev) => !prev)}
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-4 rounded-2xl text-lg shadow-md transition-all duration-300"
            >
              {showHistory ? "Hide History" : "Show History"}
            </button>
            {showHistory && (
              <div className="mt-6 w-full bg-green-50/70 border border-green-200 rounded-2xl p-4 space-y-4 shadow">
                <h2 className="text-xl font-semibold border-b border-green-400 pb-2 text-green-800">
                  Prescription History
                </h2>
                {mockHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="border-l-4 border-green-600 pl-4 text-left"
                  >
                    <p className="text-sm text-gray-500">{entry.date}</p>
                    <p className="text-gray-800">{entry.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
