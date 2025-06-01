"use client";
import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState } from "react";

export default function ReceptionistPage() {
    return (
        <div>
            <Header />
            <h1>Receptionist Page</h1>
            <Footer />
        </div>
    );
}