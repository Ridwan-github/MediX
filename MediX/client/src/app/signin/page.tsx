"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger button press animation
    setClicked(true);
    setTimeout(() => setClicked(false), 150); // Reset animation

    try {
      if (!email.trim() || !password.trim()) {
        setError("Email and password cannot be empty.");
        return;
      } else if (
        email.trim() === "admin@admin.com" &&
        password.trim() === "admin"
      ) {
        router.push("/admin");
        return;
      }

      const resDoctors = await fetch("http://localhost:8080/api/doctors");
      let doctor = null;
      if (resDoctors.ok) {
        const doctors = await resDoctors.json();
        doctor = doctors.find(
          (d: any) =>
            d.user.email === email.trim() && d.user.password === password.trim()
        );
      }
      if (doctor) {
        router.push(`/doctor?email=${encodeURIComponent(email)}`);
        return;
      }

      const resReception = await fetch(
        "http://localhost:8080/api/receptionists/by-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
        }
      );
      if (resReception.ok) {
        const receptionistResponse = await resReception.json();
        if (receptionistResponse.success) {
          // Store receptionist data in localStorage
          const receptionistData = receptionistResponse.data;
          localStorage.setItem(
            "receptionistId",
            receptionistData.id.toString()
          );
          localStorage.setItem("receptionistName", receptionistData.name);
          localStorage.setItem("receptionistEmail", receptionistData.email);
          localStorage.setItem(
            "receptionistPhoneNumber",
            receptionistData.phoneNumber
          );
          localStorage.setItem(
            "receptionistPassword",
            receptionistData.password
          );
          localStorage.setItem("receptionistAddress", receptionistData.address);

          // Optionally, store the entire data object as JSON
          localStorage.setItem(
            "receptionistData",
            JSON.stringify(receptionistData)
          );

          router.push(`/receptionist?email=${encodeURIComponent(email)}`);
          return;
        }
      }

      setError("Invalid credentials.");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f2ec] px-4">
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="flex items-center text-green-700 hover:text-green-900 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md rounded-3xl bg-[#e6f2ec] p-10 shadow-[10px_10px_30px_#c2d0c8,-10px_-10px_30px_#ffffff]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/lo.png"
            alt="MediX Logo"
            width={100}
            height={80}
            className="rounded-xl"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          Welcome to{" "}
          <span className="text-green-700">
            Medi<span className="text-black">X</span>
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Please sign in to continue
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#e6f2ec] rounded-2xl shadow-[inset_8px_8px_16px_#c2d0c8,inset_-8px_-8px_16px_#ffffff] focus:outline-none focus:shadow-[inset_6px_6px_12px_#c2d0c8,inset_-6px_-6px_12px_#ffffff] transition-shadow duration-200 text-gray-700 placeholder-gray-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#e6f2ec] rounded-2xl shadow-[inset_8px_8px_16px_#c2d0c8,inset_-8px_-8px_16px_#ffffff] focus:outline-none focus:shadow-[inset_6px_6px_12px_#c2d0c8,inset_-6px_-6px_12px_#ffffff] transition-shadow duration-200 text-gray-700 placeholder-gray-500 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 transform ${
              clicked ? "scale-95" : "scale-100"
            } hover:shadow-xl`}
          >
            Sign In
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need an appointment?{" "}
            <Link
              href="/request-appointment"
              className="text-green-600 hover:text-green-800 font-semibold transition-colors duration-200"
            >
              Request here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
