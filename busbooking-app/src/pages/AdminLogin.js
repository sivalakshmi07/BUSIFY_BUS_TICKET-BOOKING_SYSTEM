import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin200@gmail.com" &&
      password === "admin@34"
    ) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow col-md-5 mx-auto">
        <h4 className="mb-3 text-center">Admin Login</h4>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-danger w-100">
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
