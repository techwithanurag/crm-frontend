import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-12 px-6">

      {/* Container */}
      <div className="w-full max-w-4xl bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-700">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-white text-center mb-3">
          👑 Admin Control Panel
        </h2>

        <p className="text-gray-400 text-center text-lg mb-10">
          Manage CRM users, leads, and system settings.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-gray-700 p-6 rounded-xl text-center shadow-md">
            <h3 className="text-xl font-semibold text-white">Total Users</h3>
            <p className="text-3xl font-bold text-green-400 mt-2">18</p>
          </div>

          <div className="bg-gray-700 p-6 rounded-xl text-center shadow-md">
            <h3 className="text-xl font-semibold text-white">Leads</h3>
            <p className="text-3xl font-bold text-blue-400 mt-2">112</p>
          </div>

          <div className="bg-gray-700 p-6 rounded-xl text-center shadow-md">
            <h3 className="text-xl font-semibold text-white">Pending</h3>
            <p className="text-3xl font-bold text-yellow-400 mt-2">9</p>
          </div>

        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <button
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-lg transition"
            onClick={() => navigate("/admin/users")}
          >
            👥 Manage Users
          </button>

          <button
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-lg transition"
            onClick={() => navigate("/admin/leads")}
          >
            📌 Manage Leads
          </button>

          <button
            className="w-full py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-lg transition"
            onClick={() => navigate("/settings")}
          >
            ⚙️ System Settings
          </button>

        </div>

        {/* Logout */}
        <button
          className="mt-10 w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-lg transition"
          onClick={logout}
        >
          🚪 Logout
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Admin Panel v1.0
        </p>
      </div>
    </div>
  );
}
