"use client";

import { useState, useRef, useEffect } from "react";

type Item = {
  qty: string;
  itemNo: string;
  description: string;
  price: string;
};

export default function Invoice() {
  // refs for table inputs: [row][col]
  const inputRefs = useRef<Array<Array<HTMLInputElement | null>>>([]);

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState<Item[]>([
    { qty: "1", itemNo: "", description: "", price: "0" },
  ]);

  // Ensure refs array matches items
  useEffect(() => {
    inputRefs.current = items.map((item: Item, rowIdx: number) =>
      [0, 1, 2, 3].map((colIdx: number) => inputRefs.current[rowIdx]?.[colIdx] || null)
    );
  }, [items]);

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    // Allow empty string for qty and price, otherwise keep as string
    updated[index] = {
      ...updated[index],
      [field]: (field === "price" || field === "qty") ? value.replace(/^0+(?!$)/, "") : value,
    };
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { qty: "1", itemNo: "", description: "", price: "0" }]);
  };


  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => {
    const qty = item.qty === "" ? 0 : Number(item.qty);
    const price = item.price === "" ? 0 : Number(item.price);
    return sum + qty * price;
  }, 0);
  const tax = 10;
  const total = subtotal + tax;

  // Handle Enter key navigation
  const handleKeyDown = (rowIdx: number, colIdx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Move to next cell in row, or next row's first cell
      let nextRow = rowIdx;
      let nextCol = colIdx + 1;
      if (nextCol > 3) {
        nextRow = rowIdx + 1;
        nextCol = 0;
      }
      if (inputRefs.current[nextRow]?.[nextCol]) {
        inputRefs.current[nextRow][nextCol]?.focus();
      }
    }
  };

  return (
    <div className="bg-white p-8 shadow-xl max-w-4xl mx-auto my-10 border border-gray-200">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-green-700">INVOICE</h1>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-bold text-gray-700">Hikmah Hospital</h2>
          <p className="text-sm text-green-600">
            We provide the very best pharmacy solutions.
          </p>
        </div>
      </div>

<div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-800">
  <div>
    <p className="font-bold text-lg">Billed to</p>
    <label className="block mt-2 font-semibold">Customer Name</label>
    <input
      value={customerName}
      onChange={(e) => setCustomerName(e.target.value)}
      className="w-full border px-2 py-1 rounded"
    />
  </div>

  <div>
    <label className="block mt-9 font-semibold">Phone Number</label>
    <input
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      className="w-full border px-2 py-1 rounded"
    />
  </div>


  <div>
    <label className="block mt-2 font-semibold">Date</label>
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="w-full border px-2 py-1 rounded"
    />
  </div>
</div>



      <table className="w-full mt-8 text-sm border">
        <thead className="bg-green-900 text-white">
          <tr>
            <th className="p-2 border">Qty.</th>
            <th className="p-2 border">Item No.</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="p-2 border">
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                  className="w-16 border rounded px-1"
                  min=""
                  ref={el => {
                    inputRefs.current[idx] = inputRefs.current[idx] || [];
                    inputRefs.current[idx][0] = el;
                  }}
                  onKeyDown={e => handleKeyDown(idx, 0, e)}
                />
              </td>
              <td className="p-2 border">
                <input
                  type="text"
                  value={item.itemNo}
                  onChange={(e) => handleItemChange(idx, "itemNo", e.target.value)}
                  className="w-20 border rounded px-1"
                  ref={el => {
                    inputRefs.current[idx] = inputRefs.current[idx] || [];
                    inputRefs.current[idx][1] = el;
                  }}
                  onKeyDown={e => handleKeyDown(idx, 1, e)}
                />
              </td>
              <td className="p-2 border">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                  className="w-full border rounded px-1"
                  ref={el => {
                    inputRefs.current[idx] = inputRefs.current[idx] || [];
                    inputRefs.current[idx][2] = el;
                  }}
                  onKeyDown={e => handleKeyDown(idx, 2, e)}
                />
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                  className="w-20 border rounded px-1"
                  min=""
                  ref={el => {
                    inputRefs.current[idx] = inputRefs.current[idx] || [];
                    inputRefs.current[idx][3] = el;
                  }}
                  onKeyDown={e => handleKeyDown(idx, 3, e)}
                />
              </td>
              <td className="p-2 border font-semibold text-right pr-4 flex items-center justify-between">
                <span>${((item.qty === "" ? 0 : Number(item.qty)) * (item.price === "" ? 0 : Number(item.price))).toFixed(2)}</span>
                <button onClick={() => handleRemoveItem(idx)} title="Remove item" className="ml-2 text-red-600 hover:text-red-800 text-lg font-bold" style={{ lineHeight: 1 }}>
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={addItem}
        className="mt-4 text-sm text-green-700 hover:underline"
      >
        + Add another item
      </button>


      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          <h3 className="font-bold text-gray-700">Payment info</h3>
          <p>Best Bank</p>
          <p>Account no. 56–67892</p>
          <p>Ref : 0145 76590</p>

          <h3 className="font-bold text-gray-700 mt-4">Terms and Conditions</h3>
          <p className="text-sm text-gray-600">
            The origins of the first constellations date back to prehistoric
            times. Their purpose was to tell stories of their beliefs,
            experiences, creations.
          </p>
        </div>

        <div className="text-right space-y-2 text-sm">
          <p className="flex justify-between border-b py-1">
            <span className="font-semibold">Subtotal</span>{" "}
            <span>৳{subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between border-b py-1">
            <span className="font-semibold">Tax</span>{" "}
            <span>৳{tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg bg-lime-400 p-2 font-bold text-green-900 rounded">
            <span>Total</span> <span>৳{total.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
