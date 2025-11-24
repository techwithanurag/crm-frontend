import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// New login selection page
import LoginSelection from "./pages/LoginSelection";

// User pages
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import UserLeads from "./pages/UserLeads";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLeads from "./pages/AdminLeads";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default — choose login type */}
        <Route path="/" element={<LoginSelection />} />

        {/* Fix old dashboard route */}
        <Route
          path="/dashboard"
          element={<Navigate to="/user/dashboard" replace />}
        />

        {/* User Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/leads" element={<UserLeads />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/leads" element={<AdminLeads />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
