"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

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
        <div className="lg:hidden fixed top-16 left-0 w-full bg-white dark:bg-slate-900 shadow-xl z-40">

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-6 py-4 border-b border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800 transition"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/students"
            onClick={() => setOpen(false)}
            className="block px-6 py-4 border-b border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800 transition"
          >
            👨‍🎓 Students
          </Link>

          <Link
            href="/courses"
            onClick={() => setOpen(false)}
            className="block px-6 py-4 border-b border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800 transition"
          >
            📚 Courses
          </Link>

          {/* Dark Mode */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white">
            <span>🌙 Dark Mode</span>
            <ThemeSwitcher />
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full text-left px-6 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-slate-800 transition"
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
            className="block px-5 py-3 rounded-xl hover:bg-white/20 dark:hover:bg-slate-700 transition duration-300"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/students"
            className="block px-5 py-3 rounded-xl hover:bg-white/20 dark:hover:bg-slate-700 transition duration-300"
          >
            👨‍🎓 Students
          </Link>

          <Link
            href="/courses"
            className="block px-5 py-3 rounded-xl hover:bg-white/20 dark:hover:bg-slate-700 transition duration-300"
          >
            📚 Courses
          </Link>

           {/* Dark Mode */}
  <div className="flex items-center justify-between px-5 py-3 rounded-xl hover:bg-white/20 transition">
    <span>🌙 Dark Mode</span>
    <ThemeSwitcher />
  </div>

        </nav>
        

        {/* Bottom Section */}
        <div className="p-6 border-t border-blue-500 space-y-4">

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-xl font-semibold"
          >
            🚪 Logout
          </button>

        </div>

      </aside>
    </>
  );
}