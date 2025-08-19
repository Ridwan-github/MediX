'use client';

import Header from '@/components/pharmacist/header';
import SubHeader from '@/components/pharmacist/subHeader';
import Footer from '@/components/footer';
import { useState } from 'react';


type TableRow = {
  date: string;
  prescriptionId: string;
  patientId: string;
  name: string;
  phone: string;
  sellType: 'normal' | 'quick'; // 'normal' for hospital patients, 'quick' for general public
};


export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [sellTypeFilter, setSellTypeFilter] = useState('');
  const [tableData, setTableData] = useState<TableRow[]>([
    {
      date: '2025-08-15',
      prescriptionId: 'RX-1001',
      patientId: 'P-001',
      name: 'John Doe',
      phone: '555-1234',
      sellType: 'normal',
    },
    {
      date: '2025-08-16',
      prescriptionId: 'RX-1002',
      patientId: 'P-002',
      name: 'Jane Smith',
      phone: '555-5678',
      sellType: 'quick',
    },
    {
      date: '2025-08-17',
      prescriptionId: 'RX-1003',
      patientId: 'P-003',
      name: 'Alice Johnson',
      phone: '555-8765',
      sellType: 'normal',
    },
  ]);



  // Filtered and searched data
  const filteredData = tableData.filter(row => {
    const matchesSearch =
      search === '' ||
      row.prescriptionId.toLowerCase().includes(search.toLowerCase()) ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.patientId.toLowerCase().includes(search.toLowerCase());
    let matchesFilter = true;
    if (filter === 'today') {
      const today = new Date().toISOString().slice(0, 10);
      matchesFilter = row.date === today;
    } else if (filter === 'week') {
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      matchesFilter = row.date >= weekAgo.toISOString().slice(0, 10) && row.date <= now.toISOString().slice(0, 10);
    } else if (filter === 'month') {
      const now = new Date();
      const monthAgo = new Date(now);
      monthAgo.setMonth(now.getMonth() - 1);
      matchesFilter = row.date >= monthAgo.toISOString().slice(0, 10) && row.date <= now.toISOString().slice(0, 10);
    }
    let matchesSellType = true;
    if (sellTypeFilter === 'normal') {
      matchesSellType = row.sellType === 'normal';
    } else if (sellTypeFilter === 'quick') {
      matchesSellType = row.sellType === 'quick';
    }
    return matchesSearch && matchesFilter && matchesSellType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-green-50 text-gray-900">
      <Header />
      <SubHeader />

      <main className="flex flex-col items-center flex-grow px-6 mt-10">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="flex flex-col w-full sm:w-3/4 gap-4 bg-white/80 p-6 rounded-lg shadow-md border border-green-100">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="text"
                  placeholder="Search by Prescription ID, Patient Name, or Patient ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-2 border-green-700 rounded px-4 py-2 focus:outline-none flex-1"
                />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border-2 border-green-700 rounded px-4 py-2 focus:outline-none w-48"
                >
                  <option value="">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <select
                  value={sellTypeFilter}
                  onChange={(e) => setSellTypeFilter(e.target.value)}
                  className="border-2 border-green-700 rounded px-4 py-2 focus:outline-none w-48"
                >
                  <option value="">All Sell Types</option>
                  <option value="normal">Normal Sell (Patient)</option>
                  <option value="quick">Quick Sell (General)</option>
                </select>
              </div>
              <span className="text-xs text-gray-500">Showing {filteredData.length} of {tableData.length} records</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg shadow mb-16">
            <table className="w-full border border-green-900 bg-white">
              <thead className="bg-green-900 text-white">
                <tr>
                  <th className="p-3 border border-white">Date</th>
                  <th className="p-3 border border-white">Prescription ID</th>
                  <th className="p-3 border border-white">Patient ID</th>
                  <th className="p-3 border border-white">Patient Name</th>
                  <th className="p-3 border border-white">Patient Phone</th>
                  <th className="p-3 border border-white">Sell Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-6 text-gray-500">No records found.</td>
                  </tr>
                ) : (
                  filteredData.map((row, idx) => (
                    <tr key={idx} className="text-center hover:bg-green-50 transition">
                      <td className="p-2 border">{row.date}</td>
                      <td className="p-2 border">{row.prescriptionId}</td>
                      <td className="p-2 border">{row.patientId}</td>
                      <td className="p-2 border">{row.name}</td>
                      <td className="p-2 border">{row.phone}</td>
                      <td className="p-2 border">{row.sellType === 'normal' ? 'Normal Sell' : 'Quick Sell'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
