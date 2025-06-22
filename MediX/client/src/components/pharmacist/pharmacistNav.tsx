// components/pharmacist/PharmacistNav.tsx
'use client';

import Link from 'next/link';

const menuItems = [
  { label: 'Add', path: '/add' },
  { label: 'Update', path: '/update' },
  { label: 'Edit', path: '/edit' },
  { label: 'Delete', path: '/delete' },
  { label: 'Show List', path: '/list' },
  { label: 'Low Stock List', path: '/low-stock' },
];

export default function PharmacistNav() {
  return (
    <nav className="bg-green-900 text-white py-3">
      <div className="flex justify-center gap-6 text-lg font-semibold">
        {menuItems.map((item, index) => (
          <div key={item.label} className="flex items-center">
            <Link href={item.path} className="hover:underline">
              {item.label}
            </Link>
            {index !== menuItems.length - 1 && (
              <span className="mx-4 text-white text-xl">|</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
