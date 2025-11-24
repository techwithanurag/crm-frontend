import { useNavigate } from "react-router-dom";

import { useState } from "react";

export default function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
  e.preventDefault();
  console.log("User Login:", email, password);

  // Later we will validate via API
  navigate("/user/dashboard");
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200">

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          User Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none"
              placeholder="•••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}
