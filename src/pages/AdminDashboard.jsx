import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <Link
          to="/admin/leads"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          View All Leads
        </Link>
      </div>
    </div>
  );
}
