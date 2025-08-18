'use client';
import Header from "@/components/pharmacist/header";
import SubHeader from "@/components/pharmacist/subHeader";
import Footer from "@/components/footer";
import React, { useState, useEffect } from 'react';
import medicinesData from '@/data/medicines.json';

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState(medicinesData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [form, setForm] = useState({
    company: '',
    name: '',
    genericName: '',
    quantity: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    setMedicines(medicinesData);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);  // Hide toast after 3 seconds
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.name || !form.genericName || !form.quantity) return;
    setMedicines([
      ...medicines,
      {
        id: Date.now(),
        company: form.company,
        name: form.name,
        genericName: form.genericName,
        quantity: Number(form.quantity)
      }
    ]);
    setForm({ company: '', name: '', genericName: '', quantity: '' });
    setShowAddForm(false);
    showToast('Medicine added successfully!', 'success');
  };

  const handleEdit = (id: number) => {
    const med = medicines.find((m) => m.id === id);
    if (med) {
      setForm({
        company: med.company,
        name: med.name,
        genericName: med.genericName,
        quantity: med.quantity.toString()
      });
      setEditId(id);
      setShowAddForm(true);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setMedicines(
      medicines.map((m) =>
        m.id === editId
          ? { ...m, ...form, quantity: Number(form.quantity) }
          : m
      )
    );
    setForm({ company: '', name: '', genericName: '', quantity: '' });
    setEditId(null);
    setShowAddForm(false);
    showToast('Medicine updated successfully!', 'success');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter((m) => m.id !== id));
      showToast('Medicine deleted successfully!', 'success');
    } else {
      showToast('Deletion canceled!', 'error');
    }
  };

  const filteredMeds = medicines.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLowStockFilter = () => {
    setFilterLowStock(!filterLowStock);
  };

  const medsToDisplay = filterLowStock
    ? filteredMeds.filter((m) => m.quantity < 30)
    : filteredMeds;

  // Function to determine stock tag based on quantity
  const getStockTag = (quantity: number) => {
    if (quantity >= 60) return 'High';
    if (quantity >= 30) return 'Medium';
    return 'Low';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <SubHeader />

      <main className="flex flex-col items-center flex-grow mt-10 px-4 w-full">
        <div className="flex gap-4 mb-6">
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded font-bold hover:bg-purple-800"
            onClick={() => { setShowAddForm(true); setEditId(null); setForm({ company: '', name: '', genericName: '', quantity: '' }); }}
          >
            ➕ Add Medicine
          </button>
          <button
            className={`px-4 py-2 rounded font-bold ${filterLowStock ? 'bg-green-800 text-white' : 'bg-green-700 text-white hover:bg-green-800'}`}
            onClick={toggleLowStockFilter}
          >
            {filterLowStock ? 'Show All' : 'Low Stock List'}
          </button>
        </div>

        {/* Search Input */}
        <div className="flex mb-6 w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by name, company, or generic name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-purple-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Medicine List Table */}
        <div className="w-full max-w-4xl mb-10">
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Medicine Name</th>
                <th className="py-3 px-4">Generic Name</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medsToDisplay.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">No medicines found.</td>
                </tr>
              ) : (
                medsToDisplay.map((med) => (
                  <tr key={med.id} className={med.quantity < 30 ? 'bg-red-100' : ''}>
                    <td className="py-2 px-4">{med.company}</td>
                    <td className="py-2 px-4">{med.name}</td>
                    <td className="py-2 px-4">{med.genericName}</td>
                    <td className="py-2 px-4">
                      {med.quantity} <span className={`px-2 py-1 rounded-full ${getStockTag(med.quantity) === 'High' ? 'bg-green-500' : getStockTag(med.quantity) === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>{getStockTag(med.quantity)}</span>
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => handleEdit(med.id)}
                      >Edit</button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(med.id)}
                      >Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {toast.message}
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <form
            onSubmit={editId ? handleUpdate : handleAdd}
            className="flex flex-col gap-6 w-full max-w-xl bg-white shadow-lg p-8 rounded-xl mb-10"
          >
            <h3 className="text-2xl font-bold mb-2">{editId ? 'Edit Medicine' : 'Add Medicine'}</h3>
            <div className="flex flex-col">
              <label htmlFor="company" className="text-gray-700 font-semibold mb-1">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="e.g. Square Pharmaceuticals"
                value={form.company}
                onChange={handleInputChange}
                className="border-2 border-purple-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 font-semibold mb-1">Medicine Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Napa"
                value={form.name}
                onChange={handleInputChange}
                className="border-2 border-purple-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="genericName" className="text-gray-700 font-semibold mb-1">Generic Name</label>
              <input
                id="genericName"
                name="genericName"
                type="text"
                placeholder="e.g. Paracetamol"
                value={form.genericName}
                onChange={handleInputChange}
                className="border-2 border-purple-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="quantity" className="text-gray-700 font-semibold mb-1">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                placeholder="e.g. 100"
                value={form.quantity}
                onChange={handleInputChange}
                className="border-2 border-purple-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
            </div>
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => { setShowAddForm(false); setEditId(null); setForm({ company: '', name: '', genericName: '', quantity: '' }); }}
              >Cancel</button>
              <button
                type="submit"
                className="bg-purple-700 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-800 active:scale-95 transition transform"
              >
                {editId ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
