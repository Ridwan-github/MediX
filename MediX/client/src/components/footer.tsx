import React from 'react';

export default function Footer() {
    return (
        <footer
            className="bg-[#3a6a34] text-white pt-8 pb-6 px-6 sm:px-10 lg:px-16 rounded-t-2xl md:rounded-t-3xl mt-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 items-center">
                {/* Left Section: Logo Placeholder */}
                <div className="flex justify-center md:justify-start items-center">
                    <div className="bg-white w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center p-1 shadow-lg">
                        <span className="text-[#3a6a34] text-3xl md:text-4xl font-bold">HH</span>
                        <span className="text-[#3a6a34] text-[10px] md:text-xs uppercase tracking-wide">Hospital</span>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="text-center md:text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Hikmah Hospital</h2>
                    <p className="text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">Building - 5, Road - 10</p>
                    <p className="text-xs sm:text-sm md:text-base mb-2 sm:mb-4">Mirpur 12, Dhaka</p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-300">© SPL Team 5</p>
                </div>

                {/* Right Section */}
                <div className="text-right md:text-right text-xs sm:text-sm md:text-base">
                    <p className="mb-0.5 sm:mb-1">Help Line: 093-3123-456</p>
                    <p className="mb-0.5 sm:mb-1">mail: hikmahospital@gmail.com</p>
                    <p>fax: 333-444-555-666</p>
                </div>
            </div>
        </footer>
    );
}