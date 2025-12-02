import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddLead() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function saveLead(e) {
    e.preventDefault();
    setMessage("");

    try {
      let user = JSON.parse(localStorage.getItem("crmUser"));

      await axios.post("https://crm-backend-1-f3ch.onrender.com/lead", {
        userId: user._id,
        name,
        phone,
      });

      setMessage("Lead added successfully!");
      setTimeout(() => navigate("/user/leads"), 700);
    } catch (error) {
      setMessage("Failed to save lead");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">➕ Add Lead</h2>

        <form className="space-y-4" onSubmit={saveLead}>
          <input
            type="text"
            placeholder="Lead Name"
            className="w-full px-3 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full px-3 py-2 border rounded-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button className="w-full py-2 bg-blue-600 text-white rounded-lg">Save Lead</button>
        </form>

        {message && (
          <p className="text-center text-green-600 text-sm mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}
