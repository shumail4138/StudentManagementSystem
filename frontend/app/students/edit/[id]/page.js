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

      alert(error.response?.data?.detail);

    }
  };

  return (
    <ProtectedRoute>
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Edit Student
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >

          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="course"
            value={student.course}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            name="dob"
            value={student.dob}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            className="bg-blue-600 text-white px-5 py-3 rounded"
          >
            Update Student
          </button>

        </form>

      </div>
    </div>
    </ProtectedRoute>
  );
}