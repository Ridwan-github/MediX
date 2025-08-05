"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AppointmentPage() {
  const lowerNavBgColor = "#1F4604";
  const lowerNavTextColor = "#ffffff";

  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [clickedShowMore, setClickedShowMore] = useState<number | null>(null);
  const [clickedEnterVitals, setClickedEnterVitals] = useState<number | null>(
    null
  );
  const [clickedApprove, setClickedApprove] = useState<number | null>(null);
  const [clickedRequests, setClickedRequests] = useState(false);
  const [clickedAddAppointment, setClickedAddAppointment] = useState(false);
  const [clickedDoctor, setClickedDoctor] = useState(false);
  const [clickedVitals, setClickedVitals] = useState(false);
  const [clickedList, setClickedList] = useState(false);
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const receptionistId = localStorage.getItem("receptionistId");
    if (!receptionistId || receptionistId.trim() === "") {
      router.push("/");
      return;
    }
  }, [router]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8080/api/appointments/with-details",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  const displayedAppointments = appointments.filter(
    (appt) =>
      appt.status === "READY" ||
      appt.status === "NOT_READY" ||
      appt.status === "REQUESTED"
  );

  const rows = displayedAppointments.map((appt) => ({
    ...appt,
    patientName: appt.patientName || "",
    patientPhone: appt.patientPhone || "",
    doctorName: appt.doctorName || "",
    appointmentDate: appt.appointmentDate,
    age: appt.age,
    gender: appt.gender,
    weight: appt.weight,
    pressure: appt.pressure,
  }));

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-600 text-2xl">{error}</div>;
  }

  const filteredRows = rows.filter(
    (r) =>
      r.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      r.patientPhone?.includes(search) ||
      r.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toString().includes(search)
  );

  const handleShowMore = (row: any) => {
    // Trigger button press animation
    setClickedShowMore(row.id);
    setTimeout(() => setClickedShowMore(null), 150); // Reset animation

    setSelectedAppointment(row);
    setShowModal(true);
  };

  const handleEnterVitals = (row: any) => {
    // Trigger button press animation
    setClickedEnterVitals(row.id);
    setTimeout(() => setClickedEnterVitals(null), 150); // Reset animation

    // Redirect to vitals page with appointment data
    router.push(
      `/receptionist/appointment/vitals?appointmentId=${row.id}&patientId=${row.patientId}`
    );
  };

  const handleApprove = (row: any) => {
    // Trigger button press animation
    setClickedApprove(row.id);
    setTimeout(() => setClickedApprove(null), 150); // Reset animation

    // Redirect to requests page
    router.push("/receptionist/appointment/requests");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handleNavClick = (navType: string) => {
    // Trigger button press animation based on nav type
    switch (navType) {
      case "requests":
        setClickedRequests(true);
        setTimeout(() => setClickedRequests(false), 150);
        break;
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
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />

      {/* Subheader */}
      <nav className="bg-green-100/60 backdrop-blur-sm rounded-2xl shadow-sm py-5 px-6 sm:px-10 lg:px-16 text-center border border-green-300 max-w-7xl mx-auto mt-2 mb-6">
        <div className="flex justify-center gap-6 text-green-800 font-semibold text-lg select-none transition-all duration-500">
          {[
            ["Appointment Requests", "/receptionist/appointment/requests"],
            ["Add Appointment", "/receptionist/appointment"],
            ["Doctor", "/receptionist/appointment/doctor"],
            ["Vitals Entry", "/receptionist/appointment/vitals"],
            ["Appointment List", "/receptionist/appointment/list"],
          ].map(([label, path]) => (
            <Link
              key={path}
              href={path}
              onClick={() =>
                handleNavClick(
                  path === "/receptionist/appointment/requests"
                    ? "requests"
                    : path === "/receptionist/appointment"
                    ? "addAppointment"
                    : path === "/receptionist/appointment/doctor"
                    ? "doctor"
                    : path === "/receptionist/appointment/vitals"
                    ? "vitals"
                    : "list"
                )
              }
              className={`px-4 py-2 rounded-lg transition transform ${
                usePathname() === path
                  ? "bg-green-700/80 text-white shadow-lg"
                  : "hover:bg-green-600/40"
              } ${
                (path === "/receptionist/appointment/requests" &&
                  clickedRequests) ||
                (path === "/receptionist/appointment" &&
                  clickedAddAppointment) ||
                (path === "/receptionist/appointment/doctor" &&
                  clickedDoctor) ||
                (path === "/receptionist/appointment/vitals" &&
                  clickedVitals) ||
                (path === "/receptionist/appointment/list" && clickedList)
                  ? "scale-95"
                  : "scale-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="flex-grow px-6 sm:px-12 pb-12">
        {/* Search */}
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
              placeholder="Search patients"
              className="w-96 p-4 rounded-xl bg-white shadow-[inset_2px_2px_4px_#c0c5cc,inset_-2px_-2px_4px_#ffffff] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-[6px_6px_16px_#d0d4da,-6px_-6px_16px_#ffffff]">
          <table className="w-full text-center text-gray-800">
            <thead className="bg-green-700 text-white text-md select-none">
              <tr>
                {[
                  "Patient ID",
                  "Patient Name",
                  "Phone",
                  "Doctor Name",
                  "Serial #",
                  "Date",
                  "Status",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="p-3 border border-green-600 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-green-50 cursor-pointer transition duration-200"
                >
                  <td className="p-3 border border-gray-200">
                    {row.patientId}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {row.patientName}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {row.patientPhone}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {row.doctorName}
                  </td>
                  <td className="p-3 border border-gray-200">{row.id}</td>
                  <td className="p-3 border border-gray-200">
                    {row.appointmentDate}
                  </td>
                  <td className="p-3 border border-gray-200">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        row.status === "READY"
                          ? "bg-green-100 text-green-800"
                          : row.status === "NOT_READY"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {row.status === "READY"
                        ? "Ready"
                        : row.status === "NOT_READY"
                        ? "Not Ready"
                        : "Requested"}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-200">
                    {row.status === "READY" ? (
                      <button
                        onClick={() => handleShowMore(row)}
                        aria-pressed={clickedShowMore === row.id}
                        className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-[3px_3px_8px_#bfc5cc,-3px_-3px_8px_#ffffff] transition transform ${
                          clickedShowMore === row.id ? "scale-95" : "scale-100"
                        }`}
                      >
                        Show More
                      </button>
                    ) : row.status === "NOT_READY" ? (
                      <button
                        onClick={() => handleEnterVitals(row)}
                        aria-pressed={clickedEnterVitals === row.id}
                        className={`bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-xl shadow-[3px_3px_8px_#bfc5cc,-3px_-3px_8px_#ffffff] transition transform ${
                          clickedEnterVitals === row.id
                            ? "scale-95"
                            : "scale-100"
                        }`}
                      >
                        Enter Vitals
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(row)}
                        aria-pressed={clickedApprove === row.id}
                        className={`bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-[3px_3px_8px_#bfc5cc,-3px_-3px_8px_#ffffff] transition transform ${
                          clickedApprove === row.id ? "scale-95" : "scale-100"
                        }`}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white text-gray-800 p-6 rounded-3xl w-full max-w-md relative">
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-6 text-center text-green-800">
                Patient Details
              </h2>
              <div className="space-y-4 text-base">
                <div>
                  <span className="font-semibold">Age:</span>{" "}
                  {selectedAppointment.age}
                </div>
                <div>
                  <span className="font-semibold">Gender:</span>{" "}
                  {selectedAppointment.gender}
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
      </main>

      <Footer />
    </div>
  );
}
