"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    total_students: 0,
    total_courses: 0,
    recent_students: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard/");
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-500 via-teal-400 to-emerald-500">

        <div className="flex flex-col lg:flex-row flex-1 min-h-0">

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 pt-24 lg:pt-8 p-4 sm:p-6 lg:p-8 overflow-auto">

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Dashboard
              </h1>
              <p className="text-white/90 mt-2">
                Welcome to the Student Management System
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">

                <h2 className="text-gray-500 font-medium">
                  Total Students
                </h2>

                <p className="text-5xl font-bold text-teal-600 mt-3">
                  {dashboard.total_students}
                </p>

              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">

                <h2 className="text-gray-500 font-medium">
                  Total Courses
                </h2>

                <p className="text-5xl font-bold text-emerald-600 mt-3">
                  {dashboard.total_courses}
                </p>

              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">

                <h2 className="text-gray-500 font-medium">
                  Recent Students
                </h2>

                <p className="text-5xl font-bold text-cyan-600 mt-3">
                  {dashboard.recent_students.length}
                </p>

              </div>

            </div>

            {/* Recent Students */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">

              <h2 className="text-2xl font-bold text-teal-700 mb-6">
                Recently Added Students
              </h2>

              {dashboard.recent_students.length === 0 ? (

                <div className="text-center py-10 text-gray-500">
                  No students found.
                </div>

              ) : (

                <div className="overflow-x-auto">

                    <table className="min-w-[700px] w-full border">

                    <thead>

                      <tr className="bg-teal-600 text-white">

                        <th className="px-5 py-3 text-left">
                          Name
                        </th>

                        <th className="px-5 py-3 text-left">
                          Email
                        </th>

                        <th className="px-5 py-3 text-left">
                          Course
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {dashboard.recent_students.map((student, index) => (

                        <tr
                          key={student.id}
                          className={`${
                            index % 2 === 0
                              ? "bg-gray-50"
                              : "bg-white"
                          } hover:bg-teal-50 transition`}
                        >

                          <td className="px-5 py-4">
                            {student.name}
                          </td>

                          <td className="px-5 py-4">
                            {student.email}
                          </td>

                          <td className="px-5 py-4">
                            {student.course}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </main>

        </div>

        <div className="border-t border-white/20 bg-[#111827]">
  <Footer />
</div>

      </div>
    </ProtectedRoute>
  );
}