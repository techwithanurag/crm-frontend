import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);

  // Fetch leads when component loads
  useEffect(() => {
    async function fetchLeads() {
      try {
        let user = JSON.parse(localStorage.getItem("crmUser"));
        if (!user) return;

        const res = await axios.get(
          `https://crm-backend-1-f3ch.onrender.com/leads/${user._id}`
        );

        setLeads(res.data);
      } catch (error) {
        console.log("Failed to load leads:", error);
      }
    }

    fetchLeads();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Welcome Back</h2>

        <nav className="flex flex-col gap-3 text-gray-700">
          <button className="text-left hover:text-indigo-600"
                  onClick={() => navigate("/user/dashboard")}>
            Dashboard
          </button>
          
          <button className="text-left hover:text-indigo-600"
                   onClick={() => navigate("/user/leads")}>
            Leads
          </button>
        </nav>
      </div>

      {/* Main Section */}
      <div className="flex-1 p-10">

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
            <p className="text-2xl font-bold">$32,450</p>
            <p>Total Sales</p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl shadow">
            <p className="text-2xl font-bold">1,250</p>
            <p>New Leads</p>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-xl shadow">
            <p className="text-2xl font-bold">350</p>
            <p>Active Customers</p>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Leads</h3>

          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>

            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.phone}</td>
                    <td className="p-3">
                      <span className="bg-yellow-200 text-yellow-700 px-3 py-1 rounded-lg text-sm">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {lead.createdAt?.substring(0, 10)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
