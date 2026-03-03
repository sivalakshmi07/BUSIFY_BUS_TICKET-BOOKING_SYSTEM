import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../utils/showToast";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  // ✅ Update navbar whenever route changes
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [location.pathname]);

  const scrollToFooter = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      window.location.href = "/#footer";
    } else {
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      window.location.href = "/#services";
    } else {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    showToast("Logged out successfully", "warning");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">

        <Link className="navbar-brand busify-brand d-flex align-items-center gap-2" to="/">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Busify Logo" style={{ height: "55px", width: "auto", objectFit: "contain", transform: "scale(1.2)" }} />
          <span className="fw-bold fs-4 text-danger">Busify</span>
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <a href="#services" className="nav-link" onClick={scrollToServices}>
                Services
              </a>
            </li>

            <li className="nav-item">
              <a href="#footer" className="nav-link" onClick={scrollToFooter}>
                Need Help?
              </a>
            </li>

            <li className="nav-item">
              <a href="#footer" className="nav-link" onClick={scrollToFooter}>
                About Us
              </a>
            </li>

            {/* ================= AUTH BUTTONS ================= */}

            {!isLoggedIn && (
              <>
                <li className="nav-item ms-3">
                  <button
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                </li>

                <li className="nav-item ms-2">
                  <button
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Register
                  </button>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li className="nav-item ms-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => navigate("/dashboard")}
                  >
                    My Account
                  </button>
                </li>
                <li className="nav-item ms-2">
                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
