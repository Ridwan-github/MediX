"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resDoctors = await fetch("http://localhost:8080/api/doctors");
      let doctor = null;
      if (resDoctors.ok) {
        const doctors = await resDoctors.json();
        doctor = doctors.find(
          (d) =>
            d.user.email === email.trim() && d.user.password === password.trim()
        );
      }
      if (doctor) {
        router.push(`/doctor?email=${encodeURIComponent(email)}`);
        return;
      }

      const resReception = await fetch(
        "http://localhost:8080/api/receptionist"
      );
      if (resReception.ok) {
        const receptionists = await resReception.json();
        const receptionist = receptionists.find(
          (r) => r.email === email.trim() && r.password === password.trim()
        );
        if (receptionist) {
          router.push(`/receptionist?email=${encodeURIComponent(email)}`);
          return;
        }
      }

      alert("Invalid credentials.");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-3xl border border-green-200 shadow-xl bg-green-100/30 backdrop-blur-md p-10 text-gray-800">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.jpg"
            alt="MediX Logo"
            width={100}
            height={80}
            className="rounded-xl"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center mb-2">
          Welcome to{" "}
          <span className="text-green-700">
            Medi<span className="text-black">X</span>
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Smart hospital management system
        </p>

        {/* Sign-in Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 bg-green-700 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-green-700 font-semibold">MediX</span> &mdash;
          SPL Team 5
        </div>
      </div>
    </div>
  );
}
