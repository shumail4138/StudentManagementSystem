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
const [courses, setCourses] = useState([]);
const [selectedCourse, setSelectedCourse] = useState("");
const [sort, setSort] = useState("newest");

const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
const [page, setPage] = useState(1);
const limit = 10;

useEffect(() => {
  loadStudents();
}, [page]);

const loadStudents = async () => {
  try {
    setLoading(true);

let url = `/students/?page=${page}&limit=${limit}&sort=${sort}`;

if (search) {
  url += `&search=${search}`;
}

if (selectedCourse) {
  url += `&course_id=${selectedCourse}`;
}

const response = await api.get(url);

    setStudents(response.data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};

const searchStudents = (value) => {
  setSearch(value);
  setPage(1);
};

const filterByCourse = (courseId) => {
  setSelectedCourse(courseId);
  setPage(1);
};

const sortStudents = (value) => {
  setSort(value);
  setPage(1);
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

const loadCourses = async () => {
  try {
    const response = await api.get("/courses/");
    setCourses(response.data);
  } catch (error) {
    console.log(error);
  }
};  

useEffect(() => {
  loadStudents();
}, [page, search, selectedCourse, sort]);

useEffect(() => {
  loadCourses();
}, []);

return (
  <ProtectedRoute>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#27c6b2] via-[#22b8a6] to-[#1fa08d] dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">

        <div className="flex flex-col lg:flex-row flex-1">

          <Sidebar />

          <main className="flex-1 pt-20 lg:pt-8 p-4 sm:p-6 lg:p-8 overflow-auto">

            <div className="max-w-7xl mx-auto">

              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mt-3 lg:mt-0 mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
                    Students
                  </h1>

                  <p className="text-slate-500 dark:text-slate-300 mt-2">
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
<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 mb-6">

  <div className="grid md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="🔍 Search by Name, Email or Course..."
      className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      value={search}
      onChange={(e) => searchStudents(e.target.value)}
    />

    <select
      value={selectedCourse}
      onChange={(e) => filterByCourse(e.target.value)}
      className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Courses</option>

      {courses.map((course) => (
        <option key={course.id} value={course.id}>
          {course.name}
        </option>
      ))}

    </select>

    <select
  value={sort}
  onChange={(e) => sortStudents(e.target.value)}
  className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="newest">Newest First</option>
  <option value="oldest">Oldest First</option>
  <option value="az">Name (A-Z)</option>
  <option value="za">Name (Z-A)</option>
</select>

  </div>

</div>

              {/* Table */}
              {loading ? (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-10">
                  <p className="text-center text-xl text-slate-700 dark:text-white">
                    Loading Students...
                    </p>
                    </div>
                    ) : (

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">

                <div className="overflow-x-auto rounded-2xl">

                  <table className="min-w-[950px] w-full">

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
      className="text-center py-12 text-slate-500 dark:text-slate-300"
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
      className="border-b border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
    >
      <td className="p-3 md:p-4 whitespace-nowrap text-slate-700 dark:text-slate-200">{student.id}</td>

      <td className="p-3 md:p-4 font-medium text-slate-700 dark:text-white whitespace-nowrap">
        {student.name}
      </td>

      <td className="p-3 md:p-4 whitespace-nowrap text-slate-700 dark:text-slate-200">
        {student.email}
      </td>

      <td className="p-3 md:p-4 whitespace-nowrap text-slate-700 dark:text-slate-200">
        {student.phone}
      </td>

      <td className="p-3 md:p-4 whitespace-nowrap text-slate-700 dark:text-slate-200">
  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
    {student.course?.name}
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

            )}

          </div>
          
          {/* Pagination */}
<div className="flex justify-center items-center gap-4 mt-6 text-slate-800 dark:text-white">

  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className="bg-gray-300 dark:bg-slate-700 dark:text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="font-semibold">
    Page {page}
  </span>

  <button
    onClick={() => setPage(page + 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Next
  </button>

</div>

          </main>

        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <Footer />
        </div>

      </div>

    </ProtectedRoute>

  );
}
