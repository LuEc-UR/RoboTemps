// components/LogoutButton.tsx
"use client";

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react'; // Richiede l'installazione di lucide-react

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/application/login' })}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-150 ease-in-out"
    >
      <LogOut className="w-4 h-4" />
      Log Out
    </button>
  );
}