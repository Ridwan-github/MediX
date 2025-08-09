"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/admin/header";
import Footer from "@/components/footer";
import SubHeader from "@/components/admin/subheader";

export default function AdminDashboardPage() {
  const router = useRouter();

  
  const [Totalemployees, setTotalemployees] = useState(0);
  const [Doctors, setDoctors] = useState(0);
  const [Receptionists, setReceptionists] = useState(0);
  const [Pharmacists, setPharmacists] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch employee counts from backend
  useEffect(() => {
    const fetchEmployeeCounts = async () => {
      try {
        console.log('Fetching users from API...');
        // Fetch all users from the API
        const usersResponse = await fetch('http://localhost:8080/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Response status:', usersResponse.status);
        console.log('Response ok:', usersResponse.ok);
        
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          console.log('Users data received:', usersData);
          console.log('Number of users:', usersData.length);
          
          // Filter users based on ID prefixes
          const doctorsCount = usersData.filter((user: any) => {
            const userId = user.id ? user.id.toString() : '';
            const isDoctor = userId.startsWith('2501');
            console.log(`User ID: ${userId}, Is Doctor: ${isDoctor}`);
            if (isDoctor) console.log('Found doctor:', user);
            return isDoctor;
          }).length;
          
          const receptionistsCount = usersData.filter((user: any) => {
            const userId = user.id ? user.id.toString() : '';
            const isReceptionist = userId.startsWith('2502');
            console.log(`User ID: ${userId}, Is Receptionist: ${isReceptionist}`);
            if (isReceptionist) console.log('Found receptionist:', user);
            return isReceptionist;
          }).length;
          
          const pharmacistsCount = usersData.filter((user: any) => {
            const userId = user.id ? user.id.toString() : '';
            const isPharmacist = userId.startsWith('2503');
            console.log(`User ID: ${userId}, Is Pharmacist: ${isPharmacist}`);
            if (isPharmacist) console.log('Found pharmacist:', user);
            return isPharmacist;
          }).length;
          
          console.log('Final Counts - Doctors:', doctorsCount, 'Receptionists:', receptionistsCount, 'Pharmacists:', pharmacistsCount);
          
          // Update state with the counts
          setDoctors(doctorsCount);
          setReceptionists(receptionistsCount);
          setPharmacists(pharmacistsCount);
          
          // Calculate total employees
          const total = doctorsCount + receptionistsCount + pharmacistsCount;
          console.log('Total employees:', total);
          setTotalemployees(total);
        } else {
          console.error('Failed to fetch users, status:', usersResponse.status);
          console.error('Response text:', await usersResponse.text());
        }
        
      } catch (error) {
        console.error('Error fetching employee counts:', error);
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        // Keep default values if API call fails
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchEmployeeCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-green-50 rounded-3xl shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-sm font-semibold text-green-700">Total Employees</h2>
              <p className="text-4xl font-bold text-green-500 mt-4">
                {loading ? "..." : Totalemployees}
              </p>
            </div>

          
            <div className="bg-green-50 rounded-3xl shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-sm font-semibold text-green-700">Doctors</h2>
              <p className="text-4xl font-bold text-green-500 mt-4">
                {loading ? "..." : Doctors}
              </p>
            </div>

            
            <div className="bg-green-50 rounded-3xl shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-sm font-semibold text-green-700">Pharmacists</h2>
              <p className="text-4xl font-bold text-green-500 mt-4">
                {loading ? "..." : Pharmacists}
              </p>
            </div>

            
            <div className="bg-green-50 rounded-3xl shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-sm font-semibold text-green-700">Receptionists</h2>
              <p className="text-4xl font-bold text-blue-600 mt-4">
                {loading ? "..." : Receptionists}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
