"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState } from "react";

export default function ReceptionistPage() {

    const [numberOfPatients, setNumberOfPatients] = useState("12");
    const [paymentDue, setPaymentDue] = useState("5");
    const [totalVisitingFeeToday, setTotalVisitingFeeToday] = useState("৳ 3,200");
    const [totalVisitingFeeThisMonth, setTotalVisitingFeeThisMonth] = useState("৳ 42,500");
    

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main>
                <div className="p-10">
                    <h1 className="text-3xl font-bold mb-8 text-center">My Dashboard</h1>

                    <div className="flex border rounded-lg shadow-md overflow-hidden">
                        {/* Left Side */}
                        <div className="w-1/2 p-8 flex flex-col justify-center items-center ">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold">Patients Added Today</h2>
                                <p className="text-2xl font-bold mt-2 text-blue-700">{numberOfPatients}</p>
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl font-semibold">Patients Payment Due</h2>
                                <p className="text-2xl font-bold mt-2 text-red-700">{paymentDue}</p>
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className="w-px bg-gray-400"></div>

                        {/* Right Side */}
                            <div className="w-1/2 p-8 flex flex-col justify-center items-center ">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold">Total Visiting Fee Today</h2>
                                <p className="text-2xl font-bold mt-2 text-green-700">{totalVisitingFeeToday}</p>
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl font-semibold">Total Visiting Fee This Month</h2>
                                <p className="text-2xl font-bold mt-2 text-green-800">{totalVisitingFeeThisMonth}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}