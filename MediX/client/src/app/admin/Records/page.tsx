"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/admin/header";
import Footer from "@/components/footer";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
  age: string;
  joinDate: string;
}

export default function RecordsPage() {
  const router = useRouter();

  // Sample list of users
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "Doctor", gender: "Male", age: "35", joinDate: "2020-01-15" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Pharmacist", gender: "Female", age: "30", joinDate: "2019-03-10" },
    { id: "3", name: "David Johnson", email: "david@example.com", role: "Receptionist", gender: "Male", age: "25", joinDate: "2021-07-20" },
    // More sample users...
  ]);

  const [filterRole, setFilterRole] = useState("All");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRole(e.target.value);
  };

  const handleEdit = (userId: string) => {
    router.push(`/admin/edit-user/${userId}`);
  };

  const handleDelete = (userId: string) => {
    // Simulate delete operation
    setUsers(users.filter((user) => user.id !== userId));
  };

  const filteredUsers = filterRole === "All" ? users : users.filter(user => user.role === filterRole);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    <Header />
      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-10">
          {/* Filter Dropdown */}
          <div className="mb-6 flex justify-end">
            <label htmlFor="role" className="mr-4 text-sm text-gray-700 font-semibold">Filter by Role</label>
            <select
              id="role"
              value={filterRole}
              onChange={handleFilterChange}
              className="p-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="All">All</option>
              <option value="Doctor">Doctor</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Receptionist">Receptionist</option>
            </select>
          </div>

          {/* User Records Table */}
          <table className="w-full table-auto bg-white border-collapse shadow-md rounded-xl">
            <thead>
              <tr className="bg-green-100 text-green-900">
                <th className="p-4 text-sm font-semibold">Name</th>
                <th className="p-4 text-sm font-semibold">Email</th>
                <th className="p-4 text-sm font-semibold">Role</th>
                <th className="p-4 text-sm font-semibold">Gender</th>
                <th className="p-4 text-sm font-semibold">Age</th>
                <th className="p-4 text-sm font-semibold">Join Date</th>
                <th className="p-4 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-300">
                  <td className="p-4 text-sm">{user.name}</td>
                  <td className="p-4 text-sm">{user.email}</td>
                  <td className="p-4 text-sm">{user.role}</td>
                  <td className="p-4 text-sm">{user.gender}</td>
                  <td className="p-4 text-sm">{user.age}</td>
                  <td className="p-4 text-sm">{user.joinDate}</td>
                  <td className="p-4 flex gap-4">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

    <Footer />
    </div>
  );
}
