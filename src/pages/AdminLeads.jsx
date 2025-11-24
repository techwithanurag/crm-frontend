import React, { useState } from "react";

export default function AdminLeads() {
  const [showForm, setShowForm] = useState(false);
  const [leads, setLeads] = useState([
    { id: 1, name: "Rohit Sharma", phone: "9876543210", status: "Interested", assigned: "Anurag" },
    { id: 2, name: "Priya Singh", phone: "9876500000", status: "Follow Up", assigned: "Rahul" },
    { id: 3, name: "Aman Verma", phone: "9988776655", status: "Not Interested", assigned: "Sneha" },
  ]);

  // form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [assigned, setAssigned] = useState("");

  const openForm = () => {
    setName("");
    setPhone("");
    setStatus("");
    setAssigned("");
    setShowForm(true);
  };

  const saveLead = () => {
    if (!name || !phone || !status) {
      alert("Please fill Name, Phone and Status.");
      return;
    }
    const newLead = {
      id: Date.now(),
      name,
      phone,
      status,
      assigned: assigned || "Unassigned",
    };
    setLeads((s) => [newLead, ...s]);
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-8">Admin Panel</h2>

        <nav className="space-y-4 text-gray-700">
          <a href="/admin/dashboard" className="block hover:text-black">Dashboard</a>
          <a href="/admin/users" className="block hover:text-black">Manage Users</a>
          <a href="/admin/leads" className="block text-black font-semibold">Manage Leads</a>
          <a href="/admin/settings" className="block hover:text-black">Settings</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Manage Leads</h1>
          <button
            onClick={openForm}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            + Add Lead
          </button>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <table className="w-full text-left border-collapse">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
                <th className="p-3">Assigned To</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.status}</td>
                  <td className="p-3">{lead.assigned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl">
            <h2 className="text-xl mb-4 font-semibold">Add New Lead</h2>

            <input
              className="w-full mb-3 p-3 border rounded"
              placeholder="Lead Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full mb-3 p-3 border rounded"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* Visible dropdown */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mb-3 p-3 border rounded bg-white text-gray-800"
            >
              <option value="">Select Status</option>
              <option value="Interested">Interested</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Not Interested">Not Interested</option>
            </select>

            <input
              className="w-full mb-3 p-3 border rounded"
              placeholder="Assign To"
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveLead}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
