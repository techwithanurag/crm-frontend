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
  const [loading, setLoading] = useState(false);

  function updateValue(e) {
    setLead({ ...lead, [e.target.name]: e.target.value });
  }

  async function saveLead(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("crmUser"));

    if (!user?._id) {
      setMessage("Please login again");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API}/leads`, {
        userId: user._id,
        ...lead,
      });

      setMessage("Lead added successfully");
      setTimeout(() => navigate("/user/leads"), 800);
    } catch (err) {
      console.error(err);
      setMessage("Failed to add lead");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto border border-gray-400 rounded-md p-2">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Add Lead</h1>
          <button
            onClick={() => navigate("/user/leads")}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={saveLead} className="grid grid-cols-1 md:grid-cols-2 gap-4">


          <Input
            label="Name"
            name="name"
            value={lead.name}
            onChange={updateValue}
            required
          />

          <Input
            label="Phone"
            name="phone"
            value={lead.phone}
            onChange={updateValue}
            required
          />

          <Input
            label="Email"
            name="email"
            value={lead.email}
            onChange={updateValue}
          />

          <Select
            label="Source"
            name="source"
            value={lead.source}
            onChange={updateValue}
            required
            options={[
              "Google",
              "Facebook",
              "Instagram",
              "Referral",
              "WhatsApp",
              "Walk-in",
              "Website",
            ]}
          />

          <Input
            label="Budget"
            name="budget"
            value={lead.budget}
            onChange={updateValue}
          />

          <Select
            label="Status"
            name="status"
            value={lead.status}
            onChange={updateValue}
            options={[
              "New",
              "Follow Up",
              "Qualified",
              "Stage1",
              "Stage2",
              "Stage3",
              "Won",
              "Lost",
              "RNR",
            ]}
          />

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              rows="3"
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={lead.notes}
              onChange={updateValue}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              {loading ? "Saving..." : "Save Lead"}
            </button>

            {message && (
              <p className="mt-3 text-sm text-green-600">{message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* Reusable Components */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="mt-1 w-full border rounded-md px-3 py-2"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        {...props}
        className="mt-1 w-full border rounded-md px-3 py-2"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
