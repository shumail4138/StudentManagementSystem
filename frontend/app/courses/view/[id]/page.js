"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import api from "../../../../services/api";

export default function ViewCourse() {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!course) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#27c6b2] via-[#22b8a6] to-[#1fa08d] dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">

          <div className="flex flex-col lg:flex-row flex-1">

            <Sidebar />

            <main className="flex-1 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">
                Loading...
              </h1>
            </main>

          </div>

        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#27c6b2] via-[#22b8a6] to-[#1fa08d] dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">

        <div className="flex flex-col lg:flex-row flex-1">

          <Sidebar />

          <main className="flex-1 pt-20 lg:pt-8 p-4 sm:p-6 lg:p-8 overflow-auto">

            <div className="max-w-3xl mx-auto">

              {/* Heading */}
              <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Course Details
                </h1>

                <p className="text-white/90 dark:text-slate-300 mt-2">
                  View complete course information.
                </p>

              </div>

              {/* Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-transparent dark:border-slate-700 p-8">

                {/* Avatar */}
                <div className="flex flex-col items-center mb-10">

                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-5xl shadow-lg">
                    📚
                  </div>

                  <h2 className="text-3xl font-bold mt-5 text-slate-800 dark:text-white">
                    {course.name}
                  </h2>

                  <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Course Information
                  </p>

                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5">

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Course ID
                    </p>

                    <p className="text-xl font-semibold text-slate-800 dark:text-white mt-2">
                      {course.id}
                    </p>

                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5">

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Course Name
                    </p>

                    <p className="text-xl font-semibold text-slate-800 dark:text-white mt-2">
                      {course.name}
                    </p>

                  </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-10">

                  <button
                    onClick={() => router.push(`/courses/edit/${course.id}`)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg transition"
                  >
                    ✏️ Edit Course
                  </button>

                  <button
                    onClick={() => router.back()}
                    className="bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-8 py-3 rounded-xl transition"
                  >
                    ← Back
                  </button>

                </div>

              </div>

            </div>

          </main>

        </div>

      </div>
    </ProtectedRoute>
  );
}