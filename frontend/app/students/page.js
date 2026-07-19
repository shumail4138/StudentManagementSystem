"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import ProtectedRoute from "../../components/ProtectedRoute";
import ExportButtons from "../../components/ExportButtons";
import api from "../../services/api";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await api.get("/students/");
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchStudents = async (value) => {
    setSearch(value);

    try {
      const response = await api.get(`/students/?search=${value}`);
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/students/${id}`);
      alert("Student deleted successfully");
      loadStudents();
    } catch (error) {
      console.log(error);
      alert("Error deleting student");
    }
  };

return (
  <ProtectedRoute>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#27c6b2] via-[#22b8a6] to-[#1fa08d]">

        <div className="flex flex-col lg:flex-row flex-1">

          <Sidebar />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">

            <div className="max-w-7xl mx-auto">

              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                    Students
                  </h1>

                  <p className="text-slate-500 mt-1">
                    Manage all registered students
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

                  <ExportButtons students={students} />

                  <Link
                    href="/students/add"
                    className="w-full sm:w-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition"
                  >
                    + Add Student
                  </Link>

                </div>

              </div>

              {/* Search */}
              <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">

                <input
                  type="text"
                  placeholder="🔍 Search by Name, Email or Course..."
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={(e) => searchStudents(e.target.value)}
                />

              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                <div className="overflow-x-auto rounded-2xl">

                  <table className="min-w-[900px] w-full">

                    <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

                      <tr>
                        <th className="p-3 md:p-4 text-left whitespace-nowrap">ID</th>
                        <th className="p-3 md:p-4 text-left whitespace-nowrap">Name</th>
                        <th className="p-3 md:p-4 text-left whitespace-nowrap">Email</th>
                        <th className="p-3 md:p-4 text-left whitespace-nowrap">Phone</th>
                        <th className="p-3 md:p-4 text-left whitespace-nowrap">Course</th>
                        <th className="p-3 md:p-4 text-center whitespace-nowrap">Actions</th>
                      </tr>

                    </thead>

                    <tbody>
{students.length === 0 ? (

  <tr>
    <td
      colSpan="6"
      className="text-center py-12 text-slate-500"
    >
      <div className="flex flex-col items-center">

        <div className="text-5xl md:text-6xl mb-3">🎓</div>

        <h2 className="text-xl font-semibold">
          No Students Found
        </h2>

        <p className="mt-2">
          Add your first student to get started.
        </p>

      </div>
    </td>
  </tr>

) : (

  students.map((student) => (

    <tr
      key={student.id}
      className="border-b hover:bg-blue-50 transition"
    >
      <td className="p-3 md:p-4 whitespace-nowrap">{student.id}</td>

      <td className="p-3 md:p-4 font-medium text-slate-700 whitespace-nowrap">
        {student.name}
      </td>

      <td className="p-3 md:p-4 whitespace-nowrap">
        {student.email}
      </td>

      <td className="p-3 md:p-4 whitespace-nowrap">
        {student.phone}
      </td>

      <td className="p-3 md:p-4 whitespace-nowrap">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {student.course}
        </span>
      </td>

      <td className="p-3 md:p-4">

        <div className="flex flex-col sm:flex-row justify-center gap-2">

          <Link
            href={`/students/view/${student.id}`}
           className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm rounded-lg transition"
          >
            View
          </Link>

          <Link
            href={`/students/edit/${student.id}`}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm rounded-lg transition"
          >
            Edit
          </Link>

          <button
            onClick={() => deleteStudent(student.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm rounded-lg transition"
          >
            Delete
          </button>

        </div>

      </td>

    </tr>

  ))

)}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

          </main>

        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-white">
          <Footer />
        </div>

      </div>

    </ProtectedRoute>

  );
}
