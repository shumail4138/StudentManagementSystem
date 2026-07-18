"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import api from "../../../services/api";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Footer from "../../components/Footer";

export default function AddStudent() {
  const router = useRouter();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    dob: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/students/", student);

      alert("Student Added Successfully");

      router.push("/students");
    } catch (error) {
      alert(error.response?.data?.detail || "Error adding student");
    }
  };

  return (
    <ProtectedRoute>
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-6">
          Add Student
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
            value={student.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={student.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-3 rounded"
            value={student.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            className="w-full border p-3 rounded"
            value={student.course}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dob"
            className="w-full border p-3 rounded"
            value={student.dob}
            onChange={handleChange}
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
    </ProtectedRoute>
  );
}