'use client';

import Header from '@/components/pharmacist/header';
import SubHeader from '@/components/pharmacist/subHeader';
import Footer from '@/components/footer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TableRow = {
  date: string;
  prescriptionId: string;
  patientId: string;
  name: string;
  phone: string;
};

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [tableData, setTableData] = useState<TableRow[]>([
    { date: '', prescriptionId: '', patientId: '', name: '', phone: '' },
  ]);

  const router = useRouter();

  const handleInputChange = (index: number, field: keyof TableRow, value: string) => {
    const updated = [...tableData];
    updated[index][field] = value;
    setTableData(updated);
  };

  const addRow = () => {
    setTableData([
      ...tableData,
      { date: '', prescriptionId: '', patientId: '', name: '', phone: '' },
    ]);
  };

  const handleSell = () => {
    router.push('/pharmacist/Sell');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <SubHeader />

      <main className="flex flex-col items-center flex-grow px-6 mt-10">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="flex flex-col w-full sm:w-3/4 gap-4">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-2 border-purple-700 rounded px-4 py-2 focus:outline-none"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border-2 border-purple-700 rounded px-4 py-2 focus:outline-none"
              >
                <option value="">Filter</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <button className="bg-purple-700 text-white font-bold text-xl py-4 rounded hover:bg-purple-800 transition">
                SEARCH
              </button>
            </div>
          </div>

          <table className="w-full border border-green-900">
            <thead className="bg-green-900 text-white">
              <tr>
                <th className="p-3 border border-white">Date</th>
                <th className="p-3 border border-white">Prescription ID</th>
                <th className="p-3 border border-white">Patient ID</th>
                <th className="p-3 border border-white">Patient Name</th>
                <th className="p-3 border border-white">Patient Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="text-center">
                  <td className="p-2 border">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) => handleInputChange(idx, 'date', e.target.value)}
                      className="w-full border rounded px-1"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      value={row.prescriptionId}
                      onChange={(e) => handleInputChange(idx, 'prescriptionId', e.target.value)}
                      className="w-full border rounded px-1"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      value={row.patientId}
                      onChange={(e) => handleInputChange(idx, 'patientId', e.target.value)}
                      className="w-full border rounded px-1"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleInputChange(idx, 'name', e.target.value)}
                      className="w-full border rounded px-1"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      value={row.phone}
                      onChange={(e) => handleInputChange(idx, 'phone', e.target.value)}
                      className="w-full border rounded px-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col items-center justify-center gap-6 mt-10">
            <button
              onClick={addRow}
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
            >
              + Add Row
            </button>

            <button
              onClick={handleSell}
              className="bg-green-800 text-white text-xl px-10 py-5 rounded-lg font-bold hover:bg-green-900 transition"
            >
              Sell
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
