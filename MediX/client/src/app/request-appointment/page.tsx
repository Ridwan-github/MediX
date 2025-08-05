"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequestAppointment() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the doctors listing page
    router.replace("/request-appointment/doctors");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f2ec] via-[#f0f6f2] to-[#e6f2ec] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">
          Redirecting to doctor selection...
        </p>
      </div>
    </div>
  );
}
