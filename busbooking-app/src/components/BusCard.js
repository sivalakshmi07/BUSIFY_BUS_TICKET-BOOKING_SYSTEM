import React from "react";

const BusCard = ({ bus }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center">
          <h5>{bus.company}</h5>
          <span className="badge bg-warning text-dark">
            ⭐ {bus.rating}
          </span>
        </div>

        <div className="row mt-2">
          <div className="col-md-4">
            <strong>{bus.departure}</strong>
            <div className="text-muted">{bus.from}</div>
          </div>

          <div className="col-md-4 text-center">
            <div className="text-muted">{bus.duration}</div>
            🚌
          </div>

          <div className="col-md-4 text-end">
            <strong>{bus.arrival}</strong>
            <div className="text-muted">{bus.to}</div>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>₹ {bus.price}</strong> / seat  
            <div className="text-success">
              {bus.seatsAvailable} seats available
            </div>
          </div>

          <button className="btn btn-danger">
            Reserve Seat
          </button>
        </div>

      </div>
    </div>
  );
};

export default BusCard;
