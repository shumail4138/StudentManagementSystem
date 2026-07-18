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
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold">
              Loading...
            </h1>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8 bg-gray-100 min-h-screen">

          <h1 className="text-4xl font-bold mb-8">
            Student Details
          </h1>

          <div className="bg-white p-8 rounded-lg shadow space-y-4">

            <p><strong>ID:</strong> {student.id}</p>

            <p><strong>Name:</strong> {student.name}</p>

            <p><strong>Email:</strong> {student.email}</p>

            <p><strong>Phone:</strong> {student.phone}</p>

            <p><strong>Course:</strong> {student.course}</p>

            <p><strong>Date of Birth:</strong> {student.dob}</p>

            <p>
              <strong>Created At:</strong>{" "}
              {new Date(student.created_at).toLocaleString()}
            </p>

            <button
              onClick={() => router.back()}
              className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Back
            </button>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}