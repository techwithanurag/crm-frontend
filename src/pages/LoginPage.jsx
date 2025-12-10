import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://crm-backend-1-f3ch.onrender.com";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/login`, {
        email,
        password,
      });

      // ✅ Store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("crmUser", JSON.stringify(res.data.user));

      setMessage("✅ Login successful!");

      setTimeout(() => navigate("/user/dashboard"), 800);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        
        {/* Header */}
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Welcome Back
        </h2>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-center text-red-400 text-sm mt-3">{message}</p>
        )}

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* Register Button */}
        <button
          onClick={() => navigate("/register")}
          className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition"
        >
          Create New Account
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Anur CRM v1.0
        </p>
      </div>
    </div>
  );
}
