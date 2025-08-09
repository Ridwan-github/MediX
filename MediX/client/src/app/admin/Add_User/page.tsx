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
  const [availableDays, setAvailableDays] = useState("");
  const [availableTimes, setAvailableTimes] = useState("");

  // State for additional specifications and degrees
  const [specifications, setSpecifications] = useState("");
  const [degrees, setDegrees] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    // Prepare user data
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

    // Handle different user types
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
          console.log("Receptionist created successfully:", result);
          setMessage("Receptionist created successfully!");
          setMessageType("success");

          // Reset form
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setAddress("");
          setRole("");
          setGender("");
          setAge("");

          // Redirect after a longer delay to show success message more prominently
          setTimeout(() => {
            router.push("/admin");
          }, 4000);
        } else {
          const errorData = await response.json();
          console.error("Failed to create receptionist:", errorData);
          setMessage(
            "Failed to create receptionist: " +
              (errorData.error || "Unknown error")
          );
          setMessageType("error");
        }
      } catch (error) {
        console.error("Network error:", error);
        setMessage("Network error occurred while creating receptionist");
        setMessageType("error");
      }
    } else {
      // Handle other roles (Doctor, Pharmacist) - placeholder for future implementation
      console.log("Other roles not implemented yet");
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
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black"
                    rows={3}
                    placeholder="Street, City, State, ZIP"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  >
                    <option value="">Select Role</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Receptionist">Receptionist</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {role === "Doctor" && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4">
                <h2 className="text-lg text-gray-700 font-semibold">
                  Doctor Specific Information
                </h2>

                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Years of Experience
                  </label>
                  <input
                    id="experience"
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="licenseNumber"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    License Number
                  </label>
                  <input
                    id="licenseNumber"
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="availableDays"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Available Days
                  </label>
                  <input
                    id="availableDays"
                    type="text"
                    value={availableDays}
                    onChange={(e) => setAvailableDays(e.target.value)}
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="availableTimes"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Available Times for Duty
                  </label>
                  <input
                    id="availableTimes"
                    type="text"
                    value={availableTimes}
                    onChange={(e) => setAvailableTimes(e.target.value)}
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="specifications"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Specifications
                  </label>
                  <textarea
                    id="specifications"
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-gray-500"
                    rows={4}
                    placeholder="Optional: specialties or other specifications"
                  />
                </div>

                <div>
                  <label
                    htmlFor="degrees"
                    className="block text-sm text-gray-700 font-semibold"
                  >
                    Degrees
                  </label>
                  <textarea
                    id="degrees"
                    value={degrees}
                    onChange={(e) => setDegrees(e.target.value)}
                    className="w-[32rem] max-w-full mx-auto p-4 mt-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black placeholder-gray-500"
                    rows={4}
                    placeholder="Optional: List degrees (e.g., MBBS, MD)"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-4 rounded-xl shadow-md transition duration-200 ${
                  loading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-green-800 text-white hover:bg-green-700"
                }`}
              >
                {loading ? "Creating User..." : "Add User"}
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-6">
              <div
                className={`p-6 rounded-xl text-center font-semibold text-lg shadow-lg border-2 ${
                  messageType === "success"
                    ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-300 shadow-green-200"
                    : "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-300 shadow-red-200"
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  {messageType === "success" ? (
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
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
