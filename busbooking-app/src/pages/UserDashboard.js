import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const username = localStorage.getItem("username");
  const [bookings, setBookings] = useState([]);

  /* FETCH BOOKINGS FROM BACKEND */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.log("Error fetching bookings");
      }
    };

    if (username) {
      fetchBookings();
    }
  }, [username]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this ticket?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to cancel booking");
        return;
      }

      // Refresh list locally
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "Cancelled", cancelledAt: new Date() } : b
        )
      );
    } catch (error) {
      console.error("Cancellation error:", error);
      alert("Server error during cancellation");
    }
  };

  const isCompleted = (booking) => {
    if (!booking.bookingDate) return false;
    // Since exact journey date isn't saved, we assume a trip is 'Completed' 
    // if 24 hours have passed since the bookingDate.
    const bookingTime = new Date(booking.bookingDate).getTime();
    const now = new Date().getTime();
    return (now - bookingTime) > (24 * 60 * 60 * 1000);
  };

  return (
    <div className="container mt-5">
      <h3>Welcome, {username}</h3>

      <hr />

      <h5>Your Booking History</h5>

      {bookings.length === 0 ? (
        <p className="text-muted">
          No bookings found. Book a bus to see your history here.
        </p>
      ) : (
        bookings.map((booking, index) => {
          const completed = isCompleted(booking);
          const cancelled = booking.status === "Cancelled";

          return (
            <div key={index} className="card p-3 mb-3 shadow-sm position-relative">

              {/* STATUS BADGE */}
              <div className="position-absolute top-0 end-0 p-3">
                {cancelled ? (
                  <span className="badge bg-danger fs-6">Cancelled</span>
                ) : completed ? (
                  <span className="badge bg-secondary fs-6">Completed</span>
                ) : (
                  <span className="badge bg-success fs-6">Booked</span>
                )}
              </div>

              <h6>{booking.busName}</h6>
              <p className="mb-1">
                <strong>Route:</strong> {booking.from} <i className="bi bi-arrow-right"></i> {booking.to}
              </p>
              {booking.departure && booking.arrival && (
                <p className="mb-1 text-muted">
                  <strong>Schedule:</strong> {booking.departure} - {booking.arrival}
                </p>
              )}
              <p className="mb-1"><strong>Seats:</strong> {booking.seats.join(", ")}</p>
              <p className="mb-1"><strong>Total Paid:</strong> NPR {booking.totalPrice}</p>
              {booking.bookingDate && (
                <p className="mb-2 text-secondary" style={{ fontSize: "0.9rem" }}>
                  Booked On: {new Date(booking.bookingDate).toLocaleDateString()}
                  {cancelled && booking.cancelledAt && (
                    <span className="text-danger ms-2">
                      | Cancelled On: {new Date(booking.cancelledAt).toLocaleDateString()}
                    </span>
                  )}
                </p>
              )}

              {/* CANCEL BUTTON */}
              {!cancelled && !completed && (
                <div className="mt-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    Cancel Ticket
                  </button>
                </div>
              )}

            </div>
          );
        })
      )}
    </div>
  );
};

export default UserDashboard;
