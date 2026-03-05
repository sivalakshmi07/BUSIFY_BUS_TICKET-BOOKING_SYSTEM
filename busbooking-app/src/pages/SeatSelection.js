import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import busSeatData from "../data/busSeatData";
import SeatSummary from "../components/SeatSummary";
import Footer from "../components/Footer";
import "./SeatSelection.css";
import headImg from "../assets/Head.png";



const SeatSelection = () => {
  const { state } = useLocation();
  const bus = state?.bus;
  const journeyDate = state?.date;
  const navigate = useNavigate();

  const SEAT_PRICE = bus?.price || 1600;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [showBusDetails, setShowBusDetails] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (!bus?.name || !journeyDate) return;
      try {
        const res = await fetch(`http://localhost:5000/api/bookings/booked-seats?busName=${encodeURIComponent(bus.name)}&date=${encodeURIComponent(journeyDate)}`);
        const data = await res.json();
        if (res.ok) {
          setBookedSeats(data);
        }
      } catch (e) {
        console.error("Failed to fetch booked seats", e);
      }
    };
    fetchBookedSeats();
  }, [bus?.name, journeyDate]);

  const handleSeatClick = (seat) => {
    if (seat.status === "booked" || bookedSeats.includes(seat.id)) return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.id));
      setShowWarning(false);
      return;
    }

    if (selectedSeats.length >= 10) {
      setShowWarning(true);
      return;
    }

    setSelectedSeats([...selectedSeats, seat.id]);
    setShowWarning(false);
  };

  return (
    <div className="seat-page">

      {/* ===== BUS DETAILS HEADER ===== */}
      <div
        className="bus-header"
        style={{ backgroundImage: `url(${headImg})` }}
      >
        <div className="bus-header-overlay">
          <h1>Bus Details</h1>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container-fluid seat-content">

        {showWarning && (
          <div className="alert alert-warning d-flex justify-content-between">
            One individual can book only 10 seats.
            <button
              className="btn-close"
              onClick={() => setShowWarning(false)}
            />
          </div>
        )}

        <div className="row">

          {/* LEFT – SEAT LAYOUT */}
          <div className="col-md-8">

            <div className="card p-4 shadow-sm">
              <h5 className="text-center mb-4">
                Click on available seats to reserve your seat
              </h5>

              <div className="seat-grid">
                {busSeatData.map((seat) => {
                  const isBooked = bookedSeats.includes(seat.id) || seat.status === "booked";
                  return (
                    <div
                      key={seat.id}
                      className={`seat ${isBooked ? "booked" : seat.status} ${selectedSeats.includes(seat.id) ? "selected" : ""
                        }`}
                      onClick={() => !isBooked && handleSeatClick(seat)}
                    >
                      {seat.id}
                    </div>
                  );
                })}
              </div>

              <div className="legend mt-4">
                <span><div className="seat available"></div> Available</span>
                <span><div className="seat booked"></div> Booked</span>
                <span><div className="seat selected"></div> Selected</span>
                <span>₹ {SEAT_PRICE}</span>
              </div>
            </div>

            {/* SEE / HIDE BUS DETAILS BUTTON */}
            <div className="text-center mt-5 mb-4">
              <button
                className={`btn ${showBusDetails ? "btn-outline-danger" : "btn-danger"
                  } px-4`}
                onClick={() => setShowBusDetails(!showBusDetails)}
              >
                {showBusDetails ? "Hide Bus Details" : "See Bus Details"}
              </button>
            </div>

            {/* ===== BUS DETAILS SECTION ===== */}
            {showBusDetails && (
              <div className="card p-4 mb-5">

                {/* AMENITIES + POLICIES */}
                <div className="row mb-4">

                  {/* AMENITIES */}
                  <div className="col-md-6">
                    <h5 className="mb-3">Bus Amenities</h5>

                    <div className="amenities-grid">
                      <div className="amenity available">Super AC</div>
                      <div className="amenity available">2×2 VIP Sofa</div>

                      <div className="amenity available">Charging Port</div>
                      <div className="amenity unavailable">Cooler Fan</div>

                      <div className="amenity available">Internet / WiFi</div>
                      <div className="amenity available">LED TV</div>

                      <div className="amenity available">AC & Air Suspension</div>
                      <div className="amenity available">Water Bottles</div>

                      <div className="amenity unavailable">Sleeper Seat</div>
                      <div className="amenity unavailable">Luxury Seat</div>

                      <div className="amenity unavailable">Snacks</div>
                      <div className="amenity available">Comfortable Seat</div>
                    </div>
                  </div>

                  {/* POLICIES */}
                  <div className="col-md-6">
                    <h5 className="mb-3">Reservation Policies</h5>
                    <ul>
                      <li><strong>Non-refundable</strong> ticket.</li>
                      <li>Carry ticket till journey ends.</li>
                      <li>Cancel 24h before departure with 50% fee.</li>
                      <li>Bus may be delayed/cancelled.</li>
                      <li>Arrive 15 minutes early.</li>
                    </ul>
                  </div>
                </div>

                {/* BUS IMAGES */}
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="bus-image-card">
                      <img src="/seat.jpg" alt="Bus Seat" />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="bus-image-card">
                      <img src="/detail.jpg" alt="Bus Interior" />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="bus-image-card">
                      <img src="/detail2.jpg" alt="Bus Side View" />
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* RIGHT – SUMMARY */}
          <div className="col-md-4">
            <SeatSummary
              from={bus?.from}
              to={bus?.to}
              departTime={bus?.depart}
              arriveTime={bus?.arrive}
              selectedSeats={selectedSeats}
              seatPrice={SEAT_PRICE}
              onCheckout={() =>
                navigate("/checkout", {
                  state: {
                    bus: bus || {},
                    selectedSeats: selectedSeats,
                    totalPrice: selectedSeats.length * SEAT_PRICE,
                    date: journeyDate,
                  },
                })
              }
            />
          </div>

        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
};

export default SeatSelection;
