"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AppointmentPage() {
    const lowerNavBgColor = '#1F4604';
    const lowerNavTextColor = '#ffffff';
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <div style={{ backgroundColor: lowerNavBgColor, color: lowerNavTextColor }} className="p-4 justify-center text-center flex items-center text-2xl">
                    <Link href="/receptionist/appointment" className={usePathname() === "/receptionist/appointment" ? "text-white w-0 flex-1" : "text-black w-0 flex-1"}>Add Appointment</Link>
                    <span> | </span>
                    <Link href="/receptionist/appointment/doctor" className={usePathname() === "/receptionist/appointment/doctor" ? "text-white w-0 flex-1" : "text-black w-0 flex-1"}>Doctor</Link>
                    <span> | </span>
                    <Link href="/receptionist/appointment/list" className={usePathname() === "/receptionist/appointment/list" ? "text-white w-0 flex-1" : "text-black w-0 flex-1"}>Appointment List</Link>
                </div>
                <h1>Appointment List Page</h1>
            </main>
            <Footer />
        </div>
    );
}