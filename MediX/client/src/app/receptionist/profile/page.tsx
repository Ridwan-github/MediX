import Header from "@/components/receptionist/header";
import Footer from "@/components/footer";
import Link from "next/link";

type ReceptionistProfile = {
    name: string;
    gender: string;
    age: number;
    id: string;
    role: string;
    workingHours: string;
};

const receptionistProfile: ReceptionistProfile = {
    name: "John Doe",
    gender: "Male",
    age: 30,
    id: "REC123",
    role: "Receptionist",
    workingHours: "9 AM - 5 PM"
};

export default function ProfilePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-10">
                <h1 className="text-3xl font-bold mb-8 text-center">Receptionist Profile</h1>
                <div className=" mx-auto shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 justify-center items-center text-center">Profile Information</h2>
                    <div className="flex border rounded-lg shadow-md overflow-hidden">
                        {                            /* Left Side */}
                        <div className="w-1/2 p-8 flex flex-col justify-center items-center">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold">Name: {receptionistProfile.name}</h2>
                            </div>
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold">Gender: {receptionistProfile.gender}</h2>
                            </div>
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold">Age: {receptionistProfile.age}</h2>
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div className="w-px bg-gray-400"></div>

                        {/* Right Side */}
                        <div className="w-1/2 p-8 flex flex-col justify-center items-center">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold">ID: {receptionistProfile.id}</h2>
                            </div>
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold">Role: {receptionistProfile.role}</h2>
                            </div>
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold">Working Hours: {receptionistProfile.workingHours}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}