"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        <Image
          src="/logo.jpg"
          alt="MediX Logo"
          width={90}
          height={90}
          className="rounded-xl mb-6 shadow-md"
          priority
        />
        <h1 className="text-4xl font-extrabold text-green-700 mb-2 text-center drop-shadow">
          Welcome to <span className="text-green-900">MediX</span>
        </h1>
        <h2 className="text-lg text-gray-700 mb-8 text-center">
          Your smart hospital management solution.<br />
          <span className="text-green-600 font-semibold">Sign in to begin your journey.</span>
        </h2>
        <form className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-black"
            autoComplete="email"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-black w-full pr-10"
              autoComplete="current-password"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                // Eye-off SVG
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675m2.062 2.062A9.956 9.956 0 002 9c0 5.523 4.477 10 10 10 1.657 0 3.236-.336 4.675-.938m2.062-2.062A9.956 9.956 0 0022 15c0-5.523-4.477-10-10-10-1.657 0-3.236.336-4.675.938" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth={2} />
                </svg>
              ) : (
                // Eye SVG
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl text-lg shadow transition duration-200"
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