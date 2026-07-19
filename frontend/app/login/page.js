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

      const response = await api.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", response.data.access_token);

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-500 via-teal-400 to-emerald-500">

      <main className="flex-1 flex items-center justify-center px-4 py-8">

        <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

          <div className="bg-teal-600 px-6 py-6">
            <h1 className="text-center text-2xl font-bold text-white sm:text-3xl">
              Student Management System
            </h1>
          </div>

          <div className="p-6 sm:p-8">

            <form onSubmit={handleLogin} className="space-y-5">

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && (
                <p className="text-center text-sm font-medium text-red-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-teal-600 py-3 text-base font-semibold text-white transition hover:bg-teal-700 disabled:bg-gray-400"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}