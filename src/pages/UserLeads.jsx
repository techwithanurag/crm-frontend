import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const API = "https://crm-backend-1-f3ch.onrender.com";

export default function UserLeads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Load leads
  useEffect(() => {
    async function load() {
      const user = JSON.parse(localStorage.getItem("crmUser"));
      if (!user) return;

      try {
        const res = await axios.get(`${API}/leads/${user._id}`);
        setLeads(res.data);
      } catch {
        setMessage("❌ Error fetching leads");
      }
    }
    load();
  }, []);

  // Update status
  async function updateStatus(id, status) {
    try {
      await axios.patch(`${API}/lead/${id}`, { status });

      setLeads((prev) =>
        prev.map((l) => (l._id === id ? { ...l, status } : l))
      );
    } catch {
      setMessage("❌ Update failed");
    }
  }

  // Delete lead
  async function deleteLead(id) {
    if (!window.confirm("Delete this lead?")) return;

    try {
      await axios.delete(`${API}/lead/${id}`);
      setLeads((prev) => prev.filter((l) => l._id !== id));
    } catch {
      setMessage("❌ Delete failed");
    }
  }

  // Filter logic
  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search);

    const matchesStatus = filterStatus ? l.status === filterStatus : true;

    return matchesSearch && matchesStatus;
  });

  // Export Excel
  function exportExcel() {
    const ws = XLSX.utils.json_to_sheet(leads);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "leads.xlsx");
  }

  // Import Excel
  async function importExcel(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const binary = event.target.result;
        const workbook = XLSX.read(binary, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);

        for (let lead of data) {
          await axios.post(`${API}/lead`, lead);
        }

        alert("Import successful!");
        window.location.reload();
      } catch {
        alert("Import failed");
      }
    };

    reader.readAsBinaryString(file);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My Leads</h2>

        <div className="flex gap-2">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => navigate("/user/add-lead")}
          >
            Add Lead
          </button>

          {/* Export */}
          <button
            className="bg-purple-600 text-white px-3 py-1 rounded"
            onClick={exportExcel}
          >
            Export
          </button>

          {/* Import */}
          <label className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer">
            Import
            <input
              type="file"
              hidden
              accept=".xlsx, .xls"
              onChange={importExcel}
            />
          </label>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 mt-4">
        <input
          className="border p-2 flex-1"
          placeholder="Search leads"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Follow-Up">Follow-Up</option>
          <option value="Qualified">Qualified</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
          <option value="RNR">RNR</option>
          <option value="Stage 1">Stage 1</option>
          <option value="Stage 2">Stage 2</option>
          <option value="Stage 3">Stage 3</option>
        </select>
      </div>

      {message && <p className="text-red-500 mt-2">{message}</p>}

      {/* Table */}
      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((lead) => (
            <tr key={lead._id} className="border-b">
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.phone}</td>

              <td className="p-2">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead._id, e.target.value)}
                  className="border p-1"
                >
                  <option value="New">New</option>
                  <option value="Follow-Up">Follow-Up</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                  <option value="RNR">RNR</option>
                  <option value="Stage 1">Stage 1</option>
                  <option value="Stage 2">Stage 2</option>
                  <option value="Stage 3">Stage 3</option>
                </select>
              </td>

              <td className="p-2">
                {lead.createdAt ? lead.createdAt.substring(0, 10) : "-"}
              </td>

              <td className="p-2 flex gap-3">
                <a href={`tel:${lead.phone}`} className="text-blue-600 underline">
                  Call
                </a>

                <a
                  href={`https://wa.me/91${lead.phone}?text=Hi%20${lead.name},%20thank%20you%20for%20your%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline"
                >
                  WhatsApp
                </a>

                <button
                  className="text-red-600"
                  onClick={() => deleteLead(lead._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-3">
                No leads found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
