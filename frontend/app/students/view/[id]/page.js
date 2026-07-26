"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import api from "../../../../services/api";

export default function ViewStudent() {
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await api.get(`/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!student) {
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

          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">

            <div className="max-w-3xl mx-auto">

              {/* Heading */}
              <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Student Details
                </h1>

                <p className="text-teal-100 dark:text-slate-300 mt-2">
                  View complete student information.
                </p>

              </div>

              {/* Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-5">

                {/* Avatar */}
                <div className="flex flex-col items-center mb-8">

                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {student.name.charAt(0).toUpperCase()}
                  </div>

                  <h2 className="text-2xl font-bold mt-4 text-slate-800 dark:text-white">
                    {student.name}
                  </h2>

                  <p className="text-gray-500 dark:text-slate-300">
                    {student.course?.name}
                  </p>

                </div>

                {/* Student Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <div>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Student ID
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {student.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Full Name
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {student.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Email
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-white break-all">
                      {student.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Phone
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {student.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Course
                    </p>

                    <span className="inline-block mt-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                      {student.course?.name}
                    </span>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Date of Birth
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {student.dob}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Created At
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {new Date(student.created_at).toLocaleString()}
                    </p>
                  </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                  <button
                    onClick={() => router.push(`/students/edit/${student.id}`)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition shadow-lg"
                  >
                    ✏️ Edit Student
                  </button>

                  <button
                    onClick={() => router.push("/students")}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition shadow-lg"
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