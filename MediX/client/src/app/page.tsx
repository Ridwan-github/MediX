"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false); // 👈 Animation trigger state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger button press animation
    setClicked(true);
    setTimeout(() => setClicked(false), 150); // Reset animation

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
    <div className="min-h-screen flex items-center justify-center bg-[#e6f2ec] px-4">
      <div className="w-full max-w-md rounded-3xl bg-[#e6f2ec] p-10 shadow-[10px_10px_30px_#c2d0c8,-10px_-10px_30px_#ffffff]">
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
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          Welcome to{" "}
          <span className="text-green-700">
            Medi<span className="text-black">X</span>
          </span>
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Smart hospital management system
        </p>

        {/* Sign-in Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl border-none bg-[#e6f2ec] text-gray-800 shadow-[inset_6px_6px_10px_#c2d0c8,inset_-6px_-6px_10px_#ffffff] placeholder-gray-500 focus:outline-none"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 pr-10 w-full rounded-xl border-none bg-[#e6f2ec] text-gray-800 shadow-[inset_6px_6px_10px_#c2d0c8,inset_-6px_-6px_10px_#ffffff] placeholder-gray-500 focus:outline-none"
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

          {/* 👇 Animated Sign-In Button */}
          <button
            type="submit"
            aria-pressed={clicked}
            className={`mt-2 py-3 rounded-xl bg-[#e6f2ec] text-green-800 font-semibold shadow-[6px_6px_10px_#c2d0c8,-6px_-6px_10px_#ffffff] hover:bg-[#d9ede3] transition duration-150 ease-in-out transform ${
              clicked ? "scale-95" : "scale-100"
            }`}
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
