import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://crm-backend-1-f3ch.onrender.com";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const res = await axios.get(`${API}/admin/leads`);
      setLeads(res.data);
    }
    load();
  }, []);

  const filtered = leads.filter((l) =>
    `${l.name} ${l.phone} ${l.userId?.name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Admin - All Leads</h2>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Search lead or user"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Lead</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Status</th>
            <th className="p-2">User Name</th>
            <th className="p-2">User Email</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((lead) => (
            <tr key={lead._id} className="border-b">
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.phone}</td>
              <td className="p-2">{lead.status}</td>
              <td className="p-2">{lead.userId?.name}</td>
              <td className="p-2">{lead.userId?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
