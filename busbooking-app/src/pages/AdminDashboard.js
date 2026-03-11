import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [buses, setBuses] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [busForm, setBusForm] = useState(emptyBus);

  /* 🔒 PROTECT ADMIN */
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) navigate("/");
  }, [navigate]);

  /* 📥 FETCH LIVE BUSES */
  useEffect(() => {
    fetch("http://localhost:5000/api/buses")
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.error("Failed to fetch buses:", err));
  }, []);

  /* 🟡 DELETE */
  const deleteBus = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/buses/${id}`, { method: "DELETE" });
      if (response.ok) {
        setBuses(buses.filter((bus) => bus.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete bus:", err);
    }
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
  const handleSave = async () => {
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

    try {
      if (isEdit) {
        const response = await fetch(`http://localhost:5000/api/buses/${busForm.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(busForm)
        });
        const data = await response.json();
        if (response.ok) {
          setBuses(buses.map((b) => (b.id === busForm.id ? data.bus : b)));
        } else {
          alert("Error: " + data.message);
        }
      } else {
        const response = await fetch("http://localhost:5000/api/buses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(busForm)
        });
        const data = await response.json();
        if (response.ok) {
          setBuses([...buses, data.bus]);
        } else {
          alert("Error: " + data.message);
        }
      }

      setShowModal(false);
    } catch (err) {
      console.error("Failed to save bus:", err);
      alert("Network error. Could not save bus.");
    }
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

              {["name", "from", "to", "depart", "arrive", "type", "price"].map((field) => (
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
