import React from "react";
import { useNavigate } from "react-router-dom";

const routes = [
  { from: "Aluva", to: "Banglore", time: "8 Hrs", price: 1349 },
  { from: "Ernakulam", to: "Hyderabad", time: "19 Hrs", price: 3300 },
  { from: "Aluva", to: "Trivandrum", time: "4 Hrs", price: 463 },
  { from: "Banglore", to: "Manglore", time: "7 Hrs", price: 799 },
  { from: "Manglore", to: "Goa", time: "6 Hrs", price: 1080 },
  { from: "Jaipur", to: "Agra", time: "4 Hrs", price: 899 },
];

const TopRoutes = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div className="container py-5">
        <h2 className="text-center mb-5">
          Top Search <span className="text-danger">Routes</span>
        </h2>

        <div className="row">
          {routes.map((route, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card p-4 shadow-sm h-100">
                <div className="d-flex justify-content-between mb-2">
                  <div>
                    <small className="text-muted">From</small>
                    <h6>{route.from}</h6>
                  </div>

                  <div className="text-center">
                    <small className="text-muted">{route.time}</small>
                  </div>

                  <div className="text-end">
                    <small className="text-muted">To</small>
                    <h6>{route.to}</h6>
                  </div>
                </div>

                <div className="text-muted mb-3">
                  📶 Internet &nbsp; 🍴 Snacks &nbsp; 📺 TV &nbsp; 🔌 Charging
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Rs. {route.price}</h5>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      navigate("/buses", {
                        state: {
                          from: route.from,
                          to: route.to,
                        },
                      })
                    }
                  >
                    Reserve Seat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TopRoutes;
