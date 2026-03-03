import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    /* ADMIN LOGIN */
    if (username === "admin" && password === "admin@bus") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("username", "admin");

      const modal = document.getElementById("loginModal");
      const bsModal = window.bootstrap?.Modal.getOrCreateInstance(modal);
      bsModal.hide();

      navigate("/admin");
      return;
    }

    /* NORMAL USER LOGIN (Backend) */
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", data.username);
      localStorage.removeItem("isAdmin");

      const modal = document.getElementById("loginModal");
      const bsModal = window.bootstrap?.Modal.getOrCreateInstance(modal);
      bsModal.hide();

      navigate("/dashboard");

    } catch (error) {
      alert("Server error");
    }
  };


  return (
    <div className="modal fade" id="loginModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleLogin}>
              <input
                className="form-control mb-3"
                placeholder="Username"
                id="username"
                required
              />
              <div className="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              <button className="btn btn-danger w-100">
                Login
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
