"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AppointmentRequestsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new appointment requests page (now the main appointment page)
    router.replace("/receptionist/appointment");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
