"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="text-xl font-bold">Student MS</h1>

          <button
            onClick={() => setOpen(!open)}
            className="text-3xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-white shadow-xl z-40">

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-6 py-4 border-b hover:bg-blue-50"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/students"
            onClick={() => setOpen(false)}
            className="block px-6 py-4 border-b hover:bg-blue-50"
          >
            👨‍🎓 Students
          </Link>

          <button
            onClick={logout}
            className="w-full text-left px-6 py-4 text-red-600 hover:bg-red-50"
          >
            🚪 Logout
          </button>

        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 min-h-screen bg-gradient-to-b from-blue-700 to-indigo-800 text-white shadow-2xl">

        {/* Logo */}
        <div className="p-8 border-b border-blue-500">
          <h1 className="text-3xl font-bold">
            Student MS
          </h1>

          <p className="text-blue-200 mt-2 text-sm">
            Management System
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-3">

          <Link
            href="/dashboard"
            className="block px-5 py-3 rounded-xl hover:bg-white/20 transition duration-300"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/students"
            className="block px-5 py-3 rounded-xl hover:bg-white/20 transition duration-300"
          >
            👨‍🎓 Students
          </Link>

        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-blue-500">

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}