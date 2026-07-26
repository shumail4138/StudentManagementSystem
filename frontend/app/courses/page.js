"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import ProtectedRoute from "../../components/ProtectedRoute";
import api from "../../services/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    loadCourses();
  }, [page, search]);

  const loadCourses = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/courses/?page=${page}&limit=${limit}&search=${search}`
      );

      setCourses(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const searchCourses = (value) => {
    setSearch(value);
    setPage(1);
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/courses/${id}`);

      alert("Course deleted successfully");

      loadCourses();

    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Unable to delete course"
      );
    }
  };

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
                    Courses
                  </h1>

                  <p className="text-slate-500 dark:text-slate-300 mt-2">
                    Manage all available courses
                  </p>

                </div>

                <Link
                  href="/courses/add"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition text-center"
                >
                  + Add Course
                </Link>

              </div>

              {/* Search */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-5 mb-6">

                <input
                  type="text"
                  placeholder="🔍 Search by Course Name..."
                  value={search}
                  onChange={(e) => searchCourses(e.target.value)}
                  className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

                            {/* Table */}
              {loading ? (

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-10">
                  <p className="text-center text-xl text-slate-700 dark:text-white">
                    Loading Courses...
                  </p>
                </div>

              ) : (

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">

                  <div className="overflow-x-auto">

                    <table className="min-w-full">

                      <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

                        <tr>
                          <th className="p-4 text-left whitespace-nowrap">
                            ID
                          </th>

                          <th className="p-4 text-left whitespace-nowrap">
                            Course Name
                          </th>

                          <th className="p-4 text-center whitespace-nowrap">
                            Students
                          </th>

                          <th className="p-4 text-center whitespace-nowrap">
                            Actions
                          </th>
                        </tr>

                      </thead>

                      <tbody>

                        {courses.length === 0 ? (

                          <tr>

                            <td
                              colSpan="4"
                              className="text-center py-12 text-slate-500 dark:text-slate-300"
                            >

                              <div className="flex flex-col items-center">

                                <div className="text-6xl mb-3">
                                  📚
                                </div>

                                <h2 className="text-xl font-semibold">
                                  No Courses Found
                                </h2>

                                <p className="mt-2">
                                  Add your first course to get started.
                                </p>

                              </div>

                            </td>

                          </tr>

                        ) : (

                          courses.map((course) => (

                            <tr
                              key={course.id}
                              className="border-b border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
                            >

                              <td className="p-4 text-slate-700 dark:text-white">
                                {course.id}
                              </td>

                              <td className="p-4 font-semibold text-slate-700 dark:text-white">
                                {course.name}
                              </td>

                              <td className="p-4 text-center">

                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">

                                  {course.students}

                                </span>

                              </td>

                              <td className="p-4">

                                <div className="flex flex-wrap justify-center gap-2">

                                  <Link
                                    href={`/courses/view/${course.id}`}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                                  >
                                    View
                                  </Link>

                                  <Link
                                    href={`/courses/edit/${course.id}`}
                                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition"
                                  >
                                    Edit
                                  </Link>

                                  <button
                                    onClick={() => deleteCourse(course.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
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

              {/* Pagination */}

              <div className="flex justify-center items-center gap-4 mt-6">

                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="bg-gray-300 dark:bg-slate-700 dark:text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="font-semibold text-white dark:text-slate-200">
                  Page {page}
                </span>

                <button
                  onClick={() => setPage(page + 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Next
                </button>

              </div>

            </div>

          </main>

        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <Footer />
        </div>

      </div>

    </ProtectedRoute>

  );
}