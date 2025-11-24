import { Link } from "react-router-dom";

export default function LoginSelection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md border text-center">
        <h1 className="text-2xl font-bold mb-6">Choose Login Type</h1>

        <div className="space-y-4">
          <Link
            to="/user/login"
            className="block bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            User Login
          </Link>

          <Link
            to="/admin"
            className="block bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
