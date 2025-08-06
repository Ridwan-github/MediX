import React from "react";

export default function Prescription3() {
  return (
    <div className="relative w-[794px] h-[1123px] mx-auto bg-white">
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-400 rounded-b-xl shadow-md z-10 border-t-4 border-gray-600"></div>

      <img
        src="/Prescription.png"
        alt="Prescription Background"
        className="absolute w-full h-full object-cover z-0"
      />

      <input
        className="absolute z-10 bg-transparent text-sm p-1 top-[217px] left-[140px] w-[200px] h-[38px] text-black"
        placeholder="Name"
      />
      <input
        className="absolute z-10 bg-transparent text-sm p-1 top-[217px] left-[480px] w-[70px] h-[38px]  text-black"
        placeholder="Age"
      />
      <input
        type="checkbox"
        className="absolute z-10 top-[217px] left-[620px] w-[40px] h-[40px]"
        title="Male"
      />
      <input
        type="checkbox"
        className="absolute z-10 top-[217px] left-[728px] w-[40px] h-[40px]"
        title="Female"
      />
      <input
        type="date"
        className="absolute z-10 bg-transparent text-xl p-1 top-[263px] left-[612.5px] w-[165px] h-[39px] text-black"
        placeholder="Date"
      />

      <textarea
        className="absolute z-10 bg-transparent text-xl p-2 top-[305px] left-[260px] w-[500px] h-[140px] text-black"
        placeholder="C/C"
      />
      <textarea
        className="absolute z-10 bg-transparent text-xl p-2 top-[471px] left-[260px] w-[500px] h-[140px] text-black"
        placeholder="O/E"
      />
      <textarea
        className="absolute z-10 bg-transparent text-xl p-2 top-[638px] left-[260px] w-[500px] h-[120px] text-black"
        placeholder="Invs"
      />
      <textarea
        className="absolute z-10 bg-transparent text-xl p-2 top-[778px] left-[260px] w-[500px] h-[140px] text-black"
        placeholder="ADV"
      />
    </div>
  );
}
