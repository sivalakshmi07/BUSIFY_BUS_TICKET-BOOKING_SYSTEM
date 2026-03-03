import React from "react";

const BusList = () => {
  return (
    <>
      {/* BUS CARD */}
      <div className="card p-4 shadow-sm mb-4">
        <h5>🚌 Trivandrum Travels</h5>

        <div className="d-flex justify-content-between my-2">
          <div>
            <strong>06:15 PM</strong>
            <p className="text-muted mb-0">Kathmandu</p>
          </div>

          <div className="text-center">
            <span className="badge bg-secondary">AC</span>{" "}
            <span className="badge bg-warning text-dark">⭐ 4.5</span>
          </div>

          <div>
            <strong>08:45 AM</strong>
            <p className="text-muted mb-0">Pyuthan</p>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center">
          <h5>Rs. 1600 / seat</h5>
          <span className="text-success fw-bold">5 seats available</span>
          <button className="btn btn-danger">Reserve Seat</button>
        </div>
      </div>
    </>
  );
};

export default BusList;
