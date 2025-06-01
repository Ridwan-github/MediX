import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {

    const topNavBgColor = '#3a6a34'
    const titleBarBgColor = '#548235'
    const textColor = '#ffffff'
    const userIconBgColor = '#4a4a4a'
    const titleBarBorderBottomColor = '#333333'

    return (
        <header className="bg-green-500 text-white p-4">
            <div className='flex flex-row items-center justify-between text-3xl' >
                <div>
                    <Link href="/receptionist" className={usePathname() === "/receptionist" ? "text-white" : "text-black"}><span className="icon" role="img" aria-label="Home">🏠</span> Home</Link>
                    <span> | </span>
                    <Link
                    href="/receptionist/appointment"
                    className={usePathname().startsWith("/receptionist/appointment") ? "text-white" : "text-black"}
                    >
                    <span className="icon" role="img" aria-label="Appointments">📅</span> Appointments
                    </Link>   
             </div>
                <div className="user-profile-icon-container">
                {/* This div represents the circular user icon */}
                    Profile Pic
                </div>
            </div>
        </header>
    );
}
