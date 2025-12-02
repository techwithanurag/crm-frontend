import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserLeads() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-6">
      
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-md border">

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          📌 My Leads
        </h2>

        <button
          className="mb-6 w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
          onClick={() => navigate("/user/add-lead")}
        >
          ➕ Add Lead
        </button>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center text-gray-500">
          No leads found — add some!
        </div>

      </div>

    </div>
  );
}
