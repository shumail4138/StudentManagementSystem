"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import ProtectedRoute from "../../components/ProtectedRoute";
import ExportButtons from "../../components/ExportButtons";
import Footer from "../../components/Footer";

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
    <div className="min-h-screen flex flex-col">

      {/* Main Section */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <main className="flex-1 p-8 bg-gray-100">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">

            <h1 className="text-4xl font-bold">
              Students
            </h1>

            <div className="flex gap-3 items-center">

              <ExportButtons students={students} />

              <Link
                href="/students/add"
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
              >
                + Add Student
              </Link>

            </div>

          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by Name, Email or Course"
            className="border p-3 rounded w-full mb-6"
            value={search}
            onChange={(e) => searchStudents(e.target.value)}
          />

          {/* Table */}
          <table className="w-full bg-white shadow rounded">

            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Course</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>

              {students.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-500"
                  >
                    No students found.
                  </td>
                </tr>

              ) : (

                students.map((student) => (

                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{student.id}</td>
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">{student.phone}</td>
                    <td className="p-3">{student.course}</td>

                    <td className="p-3">
                      <div className="flex gap-2">

                        <Link
                          href={`/students/view/${student.id}`}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          View
                        </Link>

                        <Link
                          href={`/students/edit/${student.id}`}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  </ProtectedRoute>
);
}