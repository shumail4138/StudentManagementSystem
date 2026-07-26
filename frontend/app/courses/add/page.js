"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import ProtectedRoute from "../../../components/ProtectedRoute";
import api from "../../../services/api";

export default function AddCourse() {
  const router = useRouter();

  const [course, setCourse] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/courses/", course);

      alert("Course Added Successfully");
      router.push("/courses");
    } catch (error) {
      alert(error.response?.data?.detail || "Error adding course");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#27c6b2] via-[#22b8a6] to-[#1fa08d] dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">

        <div className="flex flex-col lg:flex-row flex-1">

          <Sidebar />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">

            <div className="max-w-3xl mx-auto">

              {/* Heading */}
              <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Add Course
                </h1>

                <p className="text-white/90 dark:text-slate-300 mt-2">
                  Create a new course for students.
                </p>

              </div>

              {/* Form */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  <input
                    type="text"
                    name="name"
                    placeholder="Course Name"
                    value={course.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <div className="flex flex-col sm:flex-row gap-4">

                    <button
                      type="submit"
                      className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
                    >
                      Add Course
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/courses")}
                      className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-white px-8 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </main>

        </div>

      </div>
    </ProtectedRoute>
  );
}