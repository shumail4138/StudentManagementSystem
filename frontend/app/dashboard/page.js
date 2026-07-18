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
      <div className="min-h-screen flex flex-col">

        {/* Main Section */}
        <div className="flex flex-1">

          {/* Sidebar */}
          <Sidebar />

          {/* Content */}
          <main className="flex-1 bg-gray-100 p-8">

            <h1 className="text-4xl font-bold mb-8">
              Dashboard
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-500">Total Students</h2>
                <p className="text-4xl font-bold text-blue-600">
                  {dashboard.total_students}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-500">Total Courses</h2>
                <p className="text-4xl font-bold text-green-600">
                  {dashboard.total_courses}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-500">Recent Students</h2>
                <p className="text-4xl font-bold text-red-600">
                  {dashboard.recent_students.length}
                </p>
              </div>

            </div>

            <div className="bg-white mt-8 p-6 rounded-lg shadow">

              <h2 className="text-2xl font-bold mb-4">
                Recently Added Students
              </h2>

              {dashboard.recent_students.length === 0 ? (
                <p>No students found.</p>
              ) : (
                <table className="w-full border">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Course</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dashboard.recent_students.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.email}</td>
                        <td className="p-3">{student.course}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>

          </main>

        </div>

        <Footer />

      </div>
    </ProtectedRoute>
  );
}