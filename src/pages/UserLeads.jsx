import { useEffect, useState } from "react";
import axios from "axios";

export default function UserLeads() {
  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    status: "",
    notes: "",
    followUp: "",
  });

  // ✅ Fetch all leads
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://crm-backend-1-f3ch.onrender.com/api/leads");
      setLeads(res.data);
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  // ✅ Add a new lead
  const addLead = async () => {
    if (!newLead.name || !newLead.phone) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://crm-backend-1-f3ch.onrender.com/api/leads", newLead);
      fetchLeads();
      setNewLead({ name: "", phone: "", status: "", notes: "", followUp: "" });
      setShowForm(false);
      alert("Lead added successfully ✅");
    } catch (err) {
      console.error("Error adding lead:", err);
      alert("Error saving lead. Check console for details.");
    }
  };

  // ✅ Delete a lead
  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await axios.delete(`http://crm-backend-1-f3ch.onrender.com/api/leads/${id}`);
      fetchLeads();
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Leads</h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            + Add Lead
          </button>
        </div>

        {/* Leads Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Notes</th>
              <th className="p-3">Next Follow-Up</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.status}</td>
                <td className="p-3 text-gray-700 text-sm">{lead.notes}</td>
                <td className="p-3">{lead.followUp}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteLead(lead._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Lead Popup Modal */}
        {showForm && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center"
            onClick={() => setShowForm(false)}
          >
            <div
              className="bg-white p-6 rounded-xl w-full max-w-sm relative"
              onClick={(e) => e.stopPropagation()} // Prevent background click close
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                Add New Lead
              </h2>

              <input
                className="w-full mb-3 p-3 border rounded"
                placeholder="Lead Name"
                value={newLead.name}
                onChange={(e) =>
                  setNewLead({ ...newLead, name: e.target.value })
                }
              />

              <input
                className="w-full mb-3 p-3 border rounded"
                placeholder="Phone Number"
                value={newLead.phone}
                onChange={(e) =>
                  setNewLead({ ...newLead, phone: e.target.value })
                }
              />

              <select
                className="w-full mb-3 p-3 border rounded"
                value={newLead.status}
                onChange={(e) =>
                  setNewLead({ ...newLead, status: e.target.value })
                }
              >
                <option value="">Select Status</option>
                <option value="Interested">Interested</option>
                <option value="Follow Up">Follow Up</option>
                <option value="Not Interested">Not Interested</option>
              </select>

              <textarea
                className="w-full mb-3 p-3 border rounded"
                placeholder="Notes (optional)"
                value={newLead.notes}
                onChange={(e) =>
                  setNewLead({ ...newLead, notes: e.target.value })
                }
              />

              <div className="mb-3">
                <label className="text-sm text-gray-600">
                  Next Follow-Up Date
                </label>
                <input
                  type="date"
                  className="w-full mt-1 p-3 border rounded"
                  value={newLead.followUp}
                  onChange={(e) =>
                    setNewLead({ ...newLead, followUp: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addLead}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
