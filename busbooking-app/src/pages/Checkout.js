import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Checkout.css";
import headImg from "../assets/Head.png";
import "../pages/SeatSelection.css";

const Checkout = () => {
  const { state } = useLocation();
  const { bus, selectedSeats = [], totalPrice = 0, date } = state || {};
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [passengers, setPassengers] = useState(
    selectedSeats.map((seat) => ({
      seat,
      name: "",
      gender: "",
      age: "",
    }))
  );

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const isPassengerValid = passengers.every(
    (p) => p.name && p.gender && p.age
  );

  const canProceed =
    isPassengerValid &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    paymentMethod;

  /* ✅ SINGLE PAYMENT FUNCTION */
  const handlePayment = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    if (!isLoggedIn) {
      alert("Please login to continue payment");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          busName: bus?.name || "Bus Service",
          from: bus?.from,
          to: bus?.to,
          departure: bus?.depart,
          arrival: bus?.arrive,
          journeyDate: date,
          seats: selectedSeats,
          passengers,
          totalPrice,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "Error saving booking. Seat might be already booked.");
        return;
      }

      navigate("/invoice", {
        state: {
          bus, // Passes the entire bus object containing name, company, amenities, etc.
          selectedSeats,
          totalPrice,
          passengers,
          email,
          phone,
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error saving booking");
    }
  };

  return (
    <>
      <div
        className="bus-header"
        style={{ backgroundImage: `url(${headImg})` }}
      >
        <div className="bus-header-overlay">
          <h1>Checkout</h1>
        </div>
      </div>

      <div className="container my-5">
        <div className="card p-4 mb-4">
          <h4 className="mb-3">Ticket Report</h4>

          <div className="d-flex justify-content-between mb-2">
            <div>
              <strong>From</strong><br />
              {bus?.from} ({bus?.depart})
            </div>
            <div>
              <strong>To</strong><br />
              {bus?.to} ({bus?.arrive})
            </div>
          </div>

          <h6>Your Seats</h6>
          <div className="seat-tags mb-3">
            {selectedSeats.map((seat) => (
              <span key={seat} className="seat-tag">
                {seat}
              </span>
            ))}
          </div>

          <div className="d-flex justify-content-between">
            <span>Total Price</span>
            <strong>NPR {totalPrice}</strong>
          </div>
        </div>

        <div className="card p-4 mb-4">
          <h4 className="mb-4">Passenger Information</h4>

          <input
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="form-control mb-4"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <hr />

          {passengers.map((p, index) => (
            <div key={p.seat} className="mb-4">
              <h6>
                Passenger {index + 1} (Seat {p.seat})
              </h6>

              <input
                className="form-control mb-2"
                placeholder="Name"
                value={p.name}
                onChange={(e) =>
                  handlePassengerChange(index, "name", e.target.value)
                }
              />

              <select
                className="form-control mb-2"
                value={p.gender}
                onChange={(e) =>
                  handlePassengerChange(index, "gender", e.target.value)
                }
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>

              <input
                type="number"
                className="form-control"
                placeholder="Age"
                value={p.age}
                onChange={(e) =>
                  handlePassengerChange(index, "age", e.target.value)
                }
              />
            </div>
          ))}
          {/* PAYMENT */}
          <h5>Select Payment Method</h5>

          <div className="row mt-3">
            <div className="col-md-4">
              <label className="payment-card text-center">
                <input
                  type="radio"
                  name="payment"
                  value="mastercard"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <img src="/yellow.png" alt="MasterCard" />
                <p className="fw-semibold">xxxx 9822</p>
              </label>
            </div>

            <div className="col-md-4">
              <label className="payment-card text-center">
                <input
                  type="radio"
                  name="payment"
                  value="visa"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <img src="/black.png" alt="Visa" />
                <p className="fw-semibold">xxxx 5677</p>
              </label>
            </div>

            <div className="col-md-4">
              <label className="payment-card text-center">
                <input
                  type="radio"
                  name="payment"
                  value="qr"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <img src="/paym.jpeg" alt="QR Code" />
                <p className="fw-semibold">Scan QR</p>
              </label>
            </div>
          </div>

          <button
            className="btn btn-danger w-100 mt-4"
            disabled={!canProceed}
            onClick={handlePayment}
          >
            PROCESSED TO PAY →
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
