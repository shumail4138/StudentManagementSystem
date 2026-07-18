"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-700 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        Student MS
      </h1>

      <nav className="space-y-4">

        <Link
          href="/dashboard"
          className="block hover:bg-blue-600 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          href="/students"
          className="block hover:bg-blue-600 p-2 rounded"
        >
          Students
        </Link>

        <button
          onClick={()=>{
            localStorage.removeItem("token");
            window.location.href="/login";
          }}
          className="w-full text-left hover:bg-red-600 p-2 rounded"
        >
          Logout
        </button>

      </nav>

    </div>
  );
}