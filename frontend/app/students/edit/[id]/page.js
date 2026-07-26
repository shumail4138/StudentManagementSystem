"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import api from "../../../../services/api";

export default function EditStudent() {
  const { id } = useParams();
  const router = useRouter();

  const [courses, setCourses] = useState([]);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course_id: "",
    dob: "",
  });

  useEffect(() => {
    fetchStudent();
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await api.get("/courses/");
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudent = async () => {
    try {
      const response = await api.get(`/students/${id}`);

      setStudent({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        dob: response.data.dob,
        course_id: response.data.course.id,
      });
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
      await api.put(`/students/${id}`, {
        ...student,
        course_id: Number(student.course_id),
      });

      alert("Student Updated Successfully");
      router.push("/students");
    } catch (error) {
      alert(error.response?.data?.detail || "Error updating student");
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
                  Edit Student
                </h1>

                <p className="text-teal-100 dark:text-slate-300 mt-2">
                  Update student information.
                </p>

              </div>

              {/* Form Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={student.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <select
                    name="course_id"
                    value={student.course_id}
                    onChange={handleChange}
                    className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select Course</option>

                    {courses.map((course) => (
                      <option
                        key={course.id}
                        value={course.id}
                      >
                        {course.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="date"
                    name="dob"
                    value={student.dob}
                    onChange={handleChange}
                    className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
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
                      className="w-full sm:w-auto border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-700 dark:text-white px-8 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition"
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