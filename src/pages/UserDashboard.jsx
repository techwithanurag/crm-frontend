import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <Link
          to="/user/leads"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          View My Leads
        </Link>
      </div>
    </div>
  );
}
