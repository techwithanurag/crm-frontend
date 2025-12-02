import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

// Dashboard pages
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Leads & CRM features
import UserLeads from "./pages/UserLeads";
import AdminLeads from "./pages/AdminLeads";
import AddLead from "./pages/AddLead";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Pages */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Fix old links */}
        <Route
          path="/user/login"
          element={<Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={<Navigate to="/user/dashboard" replace />}
        />

        {/* User routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/leads" element={<UserLeads />} />
        <Route path="/user/add-lead" element={<AddLead />} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        


      </Routes>
    </BrowserRouter>
  );
}

export default App;
