"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import ProtectedRoute from "../../components/ProtectedRoute";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
const [dashboard, setDashboard] = useState({
  total_students: 0,
  total_courses: 0,
  today_students: 0,
  recent_students: [],
  students_by_course: [],
});

  useEffect(() => {
    fetchDashboard();
  }, []);

const fetchDashboard = async () => {
  try {
    const response = await api.get("/dashboard/");

    console.log("Dashboard Data:", response.data);

    setDashboard(response.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-500 via-teal-400 to-emerald-500 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">

        <div className="flex flex-col lg:flex-row flex-1 min-h-0">

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 pt-24 lg:pt-8 p-4 sm:p-6 lg:p-8 overflow-auto">

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white dark:text-white">
                Dashboard
              </h1>
              <p className="text-white/90 dark:text-slate-300 mt-2">
                Welcome to the Student Management System
              </p>
            </div>

            {/* Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border-l-8 border-teal-600 hover:scale-105 transition">

    <h2 className="text-gray-500 dark:text-slate-300 font-semibold">
      👨‍🎓 Total Students
    </h2>

    <p className="text-5xl font-bold text-teal-600 mt-4">
      {dashboard.total_students}
    </p>

  </div>

  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border-l-8 border-emerald-600 hover:scale-105 transition">

    <h2 className="text-gray-500 dark:text-slate-300 font-semibold">
      📚 Total Courses
    </h2>

    <p className="text-5xl font-bold text-emerald-600 mt-4">
      {dashboard.total_courses}
    </p>

  </div>

  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border-l-8 border-cyan-600 hover:scale-105 transition">

    <h2 className="text-gray-500 dark:text-slate-300 font-semibold">
      🆕 Students Added Today
    </h2>

    <p className="text-5xl font-bold text-cyan-600 mt-4">
      {dashboard.today_students}
    </p>

  </div>

</div>

            {/* Recent Students */}
            <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">

              <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-6">
                Recently Added Students
              </h2>

              {dashboard.recent_students.length === 0 ? (

                <div className="text-center py-10 text-gray-500 dark:text-slate-300">
                  No students found.
                </div>

              ) : (

                <div className="overflow-x-auto rounded-xl border border-slate-600">

                    <table className="min-w-[700px] w-full">

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
    ? "bg-gray-50 dark:bg-slate-700"
    : "bg-white dark:bg-slate-800"
} hover:bg-teal-50 dark:hover:bg-slate-600 transition`}
                        >

                          <td className="px-5 py-4 text-gray-800 dark:text-white">
                            {student.name}
                          </td>

                          <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                            {student.email}
                          </td>

                          <td className="px-5 py-4 text-gray-800 dark:text-white">
                            {student.course}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

            {/* Students by Course Chart */}
<div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">

  <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-6">
    Students by Course
  </h2>

  <div className="h-80">

    <ResponsiveContainer width="100%" height="100%">

      <BarChart data={dashboard.students_by_course}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="course" />

        <YAxis allowDecimals={false} />

        <Tooltip />

        <Bar
          dataKey="count"
          fill="#14b8a6"
          radius={[8, 8, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

          </main>

        </div>

        <div className="border-t border-white/20 bg-[#111827] dark:bg-black">
  <Footer />
</div>

      </div>
    </ProtectedRoute>
  );
}