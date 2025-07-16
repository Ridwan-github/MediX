"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
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
      } else if (
        email.trim() === "receptionist@gmail.com" &&
        password.trim() === "receptionist"
      ) {
        router.push("/receptionist");
        return;
      }

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

      setError("Invalid credentials.");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f2ec] px-4">
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
            className="px-4 py-3 rounded-xl border-none bg-[#e6f2ec] text-gray-800 shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] placeholder-gray-500 focus:outline-none"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 pr-10 w-full rounded-xl border-none bg-[#e6f2ec] text-gray-800 shadow-[inset_2px_2px_4px_#c2d0c8,inset_-2px_-2px_4px_#ffffff] placeholder-gray-500 focus:outline-none"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                // Eye Slash Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223C2.822 9.7 2 11.432 2 12c0 .568.822 2.3 1.98 3.777a18.49 18.49 0 003.566 3.567A10.956 10.956 0 0012 21c2.25 0 4.32-.66 6.02-1.656M15 12a3 3 0 11-6 0 3 3 0 016 0zM21 21L3 3"
                  />
                </svg>
              ) : (
                // Eye Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
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

        {/* Popup Error */}
        {error && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {error}
              </h2>
              <button
                onClick={() => setError(null)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-green-700 font-semibold">MediX</span> &mdash;
          SPL Team 5
        </div>
      </div>
    </div>
  );
}
