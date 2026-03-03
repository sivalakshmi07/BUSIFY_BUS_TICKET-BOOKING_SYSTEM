import React, { useState } from "react";
import { showToast } from "../utils/showToast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      showToast("All fields are required", "danger");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "danger");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message, "danger");
        return;
      }

      showToast("Registration successful! Please login.", "success");

      const modal = document.getElementById("registerModal");
      const bsModal = window.bootstrap?.Modal.getOrCreateInstance(modal);
      bsModal.hide();

      const loginModal = new window.bootstrap.Modal(
        document.getElementById("loginModal")
      );
      loginModal.show();

    } catch (error) {
      showToast("Server error", "danger");
    }
  };

  return (
    <div className="modal fade" id="registerModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Register</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleRegister}>
              <input
                className="form-control mb-3"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div className="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>

              <div className="input-group mb-3">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>

              <button className="btn btn-primary w-100">
                Register
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
