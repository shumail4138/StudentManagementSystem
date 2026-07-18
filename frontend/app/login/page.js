"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import Footer from "../../components/Footer";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("========== LOGIN SUCCESS ==========");
      console.log("Full Response:", response);
      console.log("Response Data:", response.data);
      console.log("Access Token:", response.data.access_token);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      console.log(
        "Stored Token:",
        localStorage.getItem("token")
      );

      alert("Login Successful!");

      router.push("/dashboard");

    } catch (err) {

      console.log("========== LOGIN FAILED ==========");
      console.log("Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);
      }

      setError("Invalid Email or Password");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">

        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-6">
            Student Management
          </h1>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-red-500 mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}