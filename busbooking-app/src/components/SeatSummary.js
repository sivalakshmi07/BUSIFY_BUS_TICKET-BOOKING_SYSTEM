import React from "react";

const SeatSummary = ({
  from,
  to,
  departTime,
  arriveTime,
  selectedSeats,
  seatPrice,
  onCheckout, // ✅ ADD
}) => {
  const totalPrice = selectedSeats.length * seatPrice;

  return (
    <div className="card p-4 shadow-sm seat-summary">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Your Destination</h5>
        <span className="text-danger small cursor-pointer">
          Change route
        </span>
      </div>

      {/* ROUTE */}
      <div className="route-box mb-3">
        <div className="d-flex justify-content-between small text-muted">
          <span>From</span>
          <span>To</span>
        </div>

        <div className="d-flex justify-content-between align-items-center fw-semibold">
          <span>
            {from} ({departTime})
          </span>

          <span className="route-line"></span>

          <span>
            {to} ({arriveTime})
          </span>
        </div>
      </div>

      {/* SELECTED SEATS */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-1">Selected Seats</h6>
          <span className="badge bg-danger-subtle text-danger">
            NON-REFUNDABLE
          </span>
        </div>

        {selectedSeats.length === 0 ? (
          <p className="text-muted small mb-0">No seat selected</p>
        ) : (
          <p className="mb-0 fw-semibold">
            {selectedSeats.join(", ")}
          </p>
        )}
      </div>

      <hr />

      {/* FARE DETAILS */}
      <div className="mb-3">
        <h6 className="fw-bold">Fare Details</h6>

        <div className="d-flex justify-content-between small">
          <span>Basic Fare:</span>
          <span>NPR {seatPrice}</span>
        </div>

        <div className="d-flex justify-content-between fw-bold mt-1">
          <span>Total Price:</span>
          <span>NPR {totalPrice}</span>
        </div>

        <small className="text-muted">
          (Including all taxes)
        </small>
      </div>

      {/* BUTTON */}
      <button
        className="btn btn-danger w-100 py-2 fw-bold"
        disabled={selectedSeats.length === 0}
        onClick={onCheckout}
      >
        PROCEED TO CHECKOUT
      </button>

      {selectedSeats.length === 0 && (
        <p className="text-muted text-center small mt-2">
          Please select at least one seat to proceed to checkout page.
        </p>
      )}
    </div>
  );
};

export default SeatSummary;
