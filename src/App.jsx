import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AuthPage from "./pages/Auth/Auth";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import AdminLayout from "./layout/AdminLayout";
import ManageOrders from "./pages/Admin/ManageOrders/ManageOrders";
import Societies from "./pages/Admin/Societies/Societies";
import Users from "./pages/Admin/Users/Users";
import Reports from "./pages/Admin/Reports/Reports";
import Subscription from "./pages/Admin/Subscription/Subscription";
import UserHistory from "./pages/Admin/UserHistory/UserHistory";

export default function App() {
  const auth = localStorage.getItem("authToken");

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Auth */}
        <Route path="/" element={auth ? <Dashboard /> : <AuthPage />} />

        {/* Admin layout */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<ManageOrders />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/subscription" element={<Subscription />} />

          {/* 🔥 IMPORTANT ROUTES */}
          <Route path="/UserHistory" element={<UserHistory />} />
          <Route path="/admin/user" element={<UserHistory />} />
          <Route path="/admin/user/:userId" element={<UserHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}
