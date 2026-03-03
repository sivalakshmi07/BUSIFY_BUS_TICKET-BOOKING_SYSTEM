import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

/* PAGES */
import Home from "./pages/Home";
import BusResults from "./pages/BusResults";
import SeatSelection from "./pages/SeatSelection";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import UserDashboard from "./pages/UserDashboard";

/* ADMIN */
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname === "/admin-login";

  return (
    <>
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <Login />}
      {!isAdminPage && <Register />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<BusResults />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/dashboard" element={<UserDashboard />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
