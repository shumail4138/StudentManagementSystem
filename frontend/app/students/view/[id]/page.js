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
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#27c6b2] via-[#22b8a6] to-[#1fa08d]">

          <div className="flex flex-col lg:flex-row flex-1">

            <Sidebar />

            <main className="flex-1 flex items-center justify-center p-6">

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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#27c6b2] via-[#22b8a6] to-[#1fa08d]">

        <div className="flex flex-col lg:flex-row flex-1">

          <Sidebar />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">

            <div className="max-w-4xl mx-auto">

              {/* Heading */}
              <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Student Details
                </h1>

                <p className="text-teal-100 mt-2">
                  View complete information about the student.
                </p>

              </div>

              {/* Student Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <p className="text-sm text-slate-500">Student ID</p>
                    <p className="text-lg font-semibold">{student.id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Full Name</p>
                    <p className="text-lg font-semibold">{student.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="text-lg font-semibold break-all">
                      {student.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="text-lg font-semibold">{student.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Course</p>
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {student.course}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Date of Birth</p>
                    <p className="text-lg font-semibold">{student.dob}</p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-sm text-slate-500">Created At</p>
                    <p className="text-lg font-semibold">
                      {new Date(student.created_at).toLocaleString()}
                    </p>
                  </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                  <button
                    onClick={() => router.back()}
                    className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => router.push(`/students/edit/${student.id}`)}
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-xl shadow-lg transition"
                  >
                    Edit Student
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