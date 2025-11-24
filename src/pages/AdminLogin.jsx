import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async () => {
    try {
      const res = await axios.post("http://crm-backend-bhcn.onrender.com:5000/api/admin/login", {
        username,
        password,
      });

      alert("Login Successful");
      navigate("/admin/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md border">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Admin Login
        </h2>

        <input
          className="w-full mb-4 p-3 border rounded"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-3 border rounded"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={loginAdmin}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
