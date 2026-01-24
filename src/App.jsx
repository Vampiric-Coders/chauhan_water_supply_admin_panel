// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import AuthPage from "./pages/Auth/Auth";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// import AdminLayout from './layout/AdminLayout'
// import Book from './pages/User/Profile/Profile'
// import Sidebar from "./components/Sidebar/Sidebar";

// export default function App() {

//   const auth = localStorage.getItem("authToken");

//   return (
//     <main>

//     <Router>

// <AdminLayout/>
//  <div className="ml-64 bg-gray-50 min-h-screen">

//       <ScrollToTop />
//         <Routes>

//           <Route
//             path="/"
//             element={auth ? <Dashboard /> : <AuthPage/>}
//           />
//            <Route
//             path="/dashboard"
//             element={<Dashboard/>}
//           />

//            <Route
//             path="/users"
//             element={<Book/>}
//           />

//         </Routes>
//         </div>
//       </Router>

//     </main>
//   );
// }

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AuthPage from "./pages/Auth/Auth";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import AdminLayout from "./layout/AdminLayout";
import Book from "./pages/User/Profile/Profile";
import ManageOrders from "./pages/Admin/ManageOrders/ManageOrders";
import Societies from "./pages/Admin/Societies/Societies";
import Users from "./pages/Admin/Users/Users";
import Reports from "./pages/Admin/Reports/Reports";
import Subscription from "./pages/Admin/Subscription/Subscription";
import UserHistory from "./pages/Admin/UserHistory/UserHistory";
// import Subscription from "./pages/Admin/Subscription/Subscription";

export default function App() {
  const auth = localStorage.getItem("authToken");

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Auth / Public */}
        <Route path="/" element={auth ? <Dashboard /> : <AuthPage />} />

        {/* Admin routes with sidebar layout */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<ManageOrders />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/UserHistory" element={<UserHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}
