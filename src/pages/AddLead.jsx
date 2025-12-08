import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://crm-backend-1-f3ch.onrender.com";

export default function AddLead() {
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    budget: "",
    notes: "",
    status: "New",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  function updateValue(e) {
    setLead({ ...lead, [e.target.name]: e.target.value });
  }

  // Save lead
  async function saveLead(e) {
    e.preventDefault();
    setMessage("");

    const user = JSON.parse(localStorage.getItem("crmUser"));

    if (!user || !user._id) {
      setMessage("⚠ Please login again");
      return;
    }

    try {
      await axios.post(`${API}/lead`, {
        userId: user._id,
        ...lead,
      });

      setMessage("🎉 Lead added successfully!");

      setTimeout(() => navigate("/user/leads"), 900);
    } catch (error) {
      console.log("Lead Save Error:", error);
      setMessage("❌ Failed to save lead");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Add New Lead</h2>
          <button
            onClick={() => navigate("/user/leads")}
            className="text-sm bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600 text-white"
          >
            ◀ Back
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={saveLead}>
          
          <div>
            <label className="block text-gray-300 text-sm mb-1">Lead Name</label>
            <input
              name="name"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
              placeholder="Enter lead name"
              value={lead.name}
              onChange={updateValue}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Phone</label>
            <input
              name="phone"
              type="tel"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
              placeholder="Enter phone number"
              value={lead.phone}
              onChange={updateValue}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
              placeholder="Enter email (optional)"
              value={lead.email}
              onChange={updateValue}
            />
          </div>

          {/* Lead Source */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Lead Source</label>
            <select
              name="source"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
              value={lead.source}
              onChange={updateValue}
              required
            >
              <option value="">Select source</option>
              <option>Google Search</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>Referral</option>
              <option>WhatsApp</option>
              <option>Walk-in</option>
              <option>Website Form</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Budget Range</label>
            <input
              name="budget"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
              placeholder="₹ 15,000 - ₹ 60,000"
              value={lead.budget}
              onChange={updateValue}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Notes</label>
            <textarea
              name="notes"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
              placeholder="Any requirements or discussion notes"
              value={lead.notes}
              onChange={updateValue}
            ></textarea>
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Status</label>
            <select
              name="status"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
              value={lead.status}
              onChange={updateValue}
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Save Lead
          </button>
        </form>

        {/* Feedback */}
        {message && (
          <p className="text-center text-green-400 text-sm mt-4">{message}</p>
        )}

        <p className="text-center text-gray-400 text-sm mt-6">
          Anur CRM v1.2
        </p>
      </div>
    </div>
  );
}
