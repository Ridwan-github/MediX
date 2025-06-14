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
      // First, try to match against doctors
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

      // If not a doctor, then try receptionist
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

      // If neither match
      alert("Invalid credentials.");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        <Image
          src="/logo.jpg"
          alt="MediX Logo"
          width={120}
          height={90}
          className="rounded-xl mb-6"
          priority
        />

        <h1 className="text-4xl font-extrabold text-green-900 mb-2 text-center drop-shadow">
          Welcome to{" "}
          <span className="text-green-900">
            Medi<span className="text-white">X</span>
          </span>
        </h1>
        <h2 className="text-lg text-white mb-8 text-center">
          Your smart hospital management solution.
          <br />
          <span className="text-green-600 font-semibold">
            Sign in to begin your journey.
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-white"
            autoComplete="email"
            required
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-white w-full pr-10"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c..."
                  />
                  <line
                    x1="3"
                    y1="3"
                    x2="21"
                    y2="21"
                    stroke="currentColor"
                    strokeWidth={2}
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5..."
                  />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-900 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl text-lg shadow transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
      <footer className="mt-10 text-gray-500 text-xs text-center">
        &copy; {new Date().getFullYear()} MediX &mdash; SPL Team 5
      </footer>
    </div>
  );
}
