"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import api from "../../../../services/api";
import ProtectedRoute from "../../../../components/ProtectedRoute";

export default function EditStudent() {
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    dob: "",
  });

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

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/students/${id}`, student);

      alert("Student Updated Successfully");

      router.push("/students");
    } catch (error) {
      alert(error.response?.data?.detail || "Error updating student");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#27c6b2] via-[#22b8a6] to-[#1fa08d]">

        <div className="flex flex-col lg:flex-row flex-1">

          <Sidebar />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">

            <div className="max-w-3xl mx-auto">

              {/* Heading */}
              <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Edit Student
                </h1>

                <p className="text-teal-100 mt-2">
                  Update the student's information.
                </p>

              </div>

              {/* Form Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={student.name}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={student.email}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={student.phone}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={student.course}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <input
                    type="date"
                    name="dob"
                    value={student.dob}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
                    >
                      Update Student
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/students")}
                      className="w-full sm:w-auto border border-slate-300 bg-white text-slate-700 px-8 py-3 rounded-xl hover:bg-slate-100 transition"
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