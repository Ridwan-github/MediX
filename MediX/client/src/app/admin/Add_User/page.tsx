"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/admin/header";
import Footer from "@/components/footer";

export default function AddUserPage() {
  const router = useRouter();
  // State for basic user information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  // Doctor specific fields
  const [experience, setExperience] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  // State for additional specifications and degrees
  const [specifications, setSpecifications] = useState<string[]>([]);
  const [degrees, setDegrees] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  // State for custom input popups for specifications and degrees
  const [showSpecInput, setShowSpecInput] = useState(false);
  const [newSpec, setNewSpec] = useState("");
  const [showDegreeInput, setShowDegreeInput] = useState(false);
  const [newDegree, setNewDegree] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
      setMessageType("");
      const userData = {
        name,
        email,
        phone,
        password,
        address,
        role,
        gender,
        age,
        experience,
        licenseNumber,
        availableDays,
        availableTimes,
        specifications,
        degrees,
      };
      console.log("User data submitted:", userData);
      if (role === "Receptionist") {
        try {
          const receptionistData = {
            name,
            email,
            phoneNumber: phone,
            password,
            address,
          };
          const response = await fetch(
            "http://localhost:8080/api/receptionists",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(receptionistData),
            }
          );
          if (response.ok) {
            const result = await response.json();
            setMessage("Receptionist created successfully!");
            setMessageType("success");
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setAddress("");
            setRole("");
            setGender("");
            setAge("");
            setExperience("");
            setLicenseNumber("");
            setAvailableDays([]);
            setAvailableTimes([]);
            setSpecifications([]);
            setDegrees([]);
            setTimeout(() => {
              router.push("/admin");
            }, 4000);
          } else {
            const errorData = await response.json();
            setMessage(
              "Failed to create receptionist: " +
                (errorData.error || "Unknown error")
            );
            setMessageType("error");
          }
        } catch (error) {
          setMessage("Network error occurred while creating receptionist");
          setMessageType("error");
        }
      } else {
        setMessage("User role '" + role + "' creation not implemented yet");
        setMessageType("error");
      }
      setLoading(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow p-8">
          <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="flex flex-col space-y-4 w-full items-center justify-center">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-700 font-semibold">Full Name</label>
                    <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 font-semibold">Email Address</label>
                    <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-700 font-semibold">Phone Number</label>
                    <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm text-gray-700 font-semibold">Password</label>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black" />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm text-gray-700 font-semibold">Address</label>
                    <textarea id="address" value={address} onChange={e => setAddress(e.target.value)} required className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black" rows={3} placeholder="Street, City, State, ZIP" />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm text-gray-700 font-semibold">Role</label>
                    <select id="role" value={role} onChange={e => setRole(e.target.value)} required className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black">
                      <option value="">Select Role</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Pharmacist">Pharmacist</option>
                      <option value="Receptionist">Receptionist</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm text-gray-700 font-semibold">Gender</label>
                    <select id="gender" value={gender} onChange={e => setGender(e.target.value)} required className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-sm text-gray-700 font-semibold">Age</label>
                    <input id="age" type="number" value={age} onChange={e => setAge(e.target.value)} required className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-gray-500" />
                  </div>
                </div>
              </div>
              {role === "Doctor" && (
                <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4 mt-6">
                  <h2 className="text-lg text-gray-700 font-semibold mb-4">Doctor Specific Information</h2>
                  <div>
                    <label htmlFor="experience" className="block text-sm text-gray-700 font-semibold">Years of Experience</label>
                    <input id="experience" type="number" value={experience} onChange={e => setExperience(e.target.value)} className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black" />
                  </div>
                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm text-gray-700 font-semibold">License Number</label>
                    <input id="licenseNumber" type="text" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-semibold mb-2">Available Days</label>
                    <div className="flex flex-wrap gap-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
                        const selected = availableDays.includes(day);
                        return (
                          <button type="button" key={day} onClick={() => setAvailableDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])} className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${selected ? "bg-green-600 text-white border-green-700" : "bg-white text-green-700 border-green-400 hover:bg-green-50"}`}>{day}</button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-semibold mb-2">Available Time Slots</label>
                    <div className="flex flex-wrap gap-2">
                      {["08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-20:00"].map((slot) => {
                        const selected = availableTimes.includes(slot);
                        return (
                          <button type="button" key={slot} onClick={() => setAvailableTimes(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot])} className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${selected ? "bg-green-600 text-white border-green-700" : "bg-white text-green-700 border-green-400 hover:bg-green-50"}`}>{slot}</button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-semibold mb-2">Specifications</label>
                    <div className="flex flex-wrap gap-2 items-center">
                      {[
                        "General Physician",
                        "Cardiologist",
                        "Dermatologist",
                        "Pediatrician",
                        "Orthopedic",
                        "Gynecologist",
                        "ENT",
                        "Psychiatrist",
                        "Other",
                      ].concat(specifications.filter(
                        (s) => ![
                          "General Physician",
                          "Cardiologist",
                          "Dermatologist",
                          "Pediatrician",
                          "Orthopedic",
                          "Gynecologist",
                          "ENT",
                          "Psychiatrist",
                          "Other",
                        ].includes(s)
                      )).map((spec) => {
                        const selected = specifications.includes(spec);
                        return (
                          <button type="button" key={spec} onClick={() => setSpecifications(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec])} className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${selected ? "bg-blue-600 text-white border-blue-700" : "bg-white text-blue-700 border-blue-400 hover:bg-blue-50"}`}>{spec}</button>
                        );
                      })}
                      <button type="button" aria-label="Add specification" onClick={() => setShowSpecInput(true)} className="ml-2 px-2 py-2 rounded-full bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"><span className="text-xl font-bold">+</span></button>
                      {showSpecInput && (
                        <form onSubmit={e => {e.preventDefault(); if (newSpec.trim() && !specifications.includes(newSpec.trim())) { setSpecifications(prev => [...prev, newSpec.trim()]); } setNewSpec(""); setShowSpecInput(false);}} className="flex items-center gap-2 ml-2">
                          <input type="text" value={newSpec} onChange={e => setNewSpec(e.target.value)} className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Add specification" autoFocus />
                          <button type="submit" className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Add</button>
                        </form>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-semibold mb-2">Degrees</label>
                    <div className="flex flex-wrap gap-2 items-center">
                      {[
                        "MBBS",
                        "MD",
                        "MS",
                        "DM",
                        "MCh",
                        "BDS",
                        "MDS",
                        "PhD",
                        "Other",
                      ].concat(degrees.filter(
                        (d) => ![
                          "MBBS",
                          "MD",
                          "MS",
                          "DM",
                          "MCh",
                          "BDS",
                          "MDS",
                          "PhD",
                          "Other",
                        ].includes(d)
                      )).map((deg) => {
                        const selected = degrees.includes(deg);
                        return (
                          <button type="button" key={deg} onClick={() => setDegrees(prev => prev.includes(deg) ? prev.filter(d => d !== deg) : [...prev, deg])} className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${selected ? "bg-blue-600 text-white border-blue-700" : "bg-white text-blue-700 border-blue-400 hover:bg-blue-50"}`}>{deg}</button>
                        );
                      })}
                      <button type="button" aria-label="Add degree" onClick={() => setShowDegreeInput(true)} className="ml-2 px-2 py-2 rounded-full bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"><span className="text-xl font-bold">+</span></button>
                      {showDegreeInput && (
                        <form onSubmit={e => {e.preventDefault(); if (newDegree.trim() && !degrees.includes(newDegree.trim())) { setDegrees(prev => [...prev, newDegree.trim()]); } setNewDegree(""); setShowDegreeInput(false);}} className="flex items-center gap-2 ml-2">
                          <input type="text" value={newDegree} onChange={e => setNewDegree(e.target.value)} className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Add degree" autoFocus />
                          <button type="submit" className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Add</button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <button type="submit" disabled={loading} className={`px-8 py-4 rounded-xl shadow-md transition duration-200 ${loading ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-green-800 text-white hover:bg-green-700"}`}>{loading ? "Creating User..." : "Add User"}</button>
              </div>
            </form>
            {message && (
              <div className="mt-6">
                <div className={`p-6 rounded-xl text-center font-semibold text-lg shadow-lg border-2 ${messageType === "success" ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-300 shadow-green-200" : "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-300 shadow-red-200"}`}>
                  <div className="flex items-center justify-center space-x-3">
                    {messageType === "success" ? (
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"></path></svg>
                    )}
                    <span>{message}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
