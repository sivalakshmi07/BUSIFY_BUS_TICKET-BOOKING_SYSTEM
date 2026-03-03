import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import busesData from "../data/buses";

const emptyBus = {
  id: null,
  name: "",
  from: "",
  to: "",
  depart: "",
  arrive: "",
  type: "",
  price: "",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState(busesData);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [busForm, setBusForm] = useState(emptyBus);

  /* 🔒 PROTECT ADMIN */
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) navigate("/");
  }, [navigate]);

  /* 🟡 DELETE */
  const deleteBus = (id) => {
    setBuses(buses.filter((bus) => bus.id !== id));
  };

  /* 🟢 OPEN ADD */
  const openAddBus = () => {
    setBusForm(emptyBus);
    setIsEdit(false);
    setShowModal(true);
  };

  /* 🟠 OPEN EDIT */
  const openEditBus = (bus) => {
    setBusForm(bus);
    setIsEdit(true);
    setShowModal(true);
  };

  /* 💾 SAVE */
  const handleSave = () => {
    if (
      !busForm.name ||
      !busForm.from ||
      !busForm.to ||
      !busForm.depart ||
      !busForm.arrive ||
      !busForm.type ||
      !busForm.price
    ) {
      alert("All fields are required");
      return;
    }

    if (isEdit) {
      setBuses(
        buses.map((b) => (b.id === busForm.id ? busForm : b))
      );
    } else {
      setBuses([
        ...buses,
        { ...busForm, id: Date.now() },
      ]);
    }

    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Admin Dashboard</h3>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Bus Name</th>
            <th>Route</th>
            <th>Time</th>
            <th>Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.name}</td>
              <td>{bus.from} → {bus.to}</td>
              <td>{bus.depart} - {bus.arrive}</td>
              <td>{bus.type}</td>
              <td>₹{bus.price}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openEditBus(bus)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteBus(bus.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD BUTTON */}
      <button className="btn btn-success mt-3" onClick={openAddBus}>
        + Add New Bus
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal show d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5 className="mb-3">
                {isEdit ? "Edit Bus" : "Add New Bus"}
              </h5>

              {["name","from","to","depart","arrive","type","price"].map((field) => (
                <input
                  key={field}
                  className="form-control mb-2"
                  placeholder={field.toUpperCase()}
                  value={busForm[field]}
                  onChange={(e) =>
                    setBusForm({ ...busForm, [field]: e.target.value })
                  }
                />
              ))}

              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
