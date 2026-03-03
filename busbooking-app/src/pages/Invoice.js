import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import Footer from "../components/Footer";
import headImg from "../assets/Head.png";
import "./Invoice.css";

import buses from "../data/buses";

const Invoice = () => {
  const { state } = useLocation();
  const {
    bus: stateBus,
    selectedSeats = [],
    totalPrice = 0,
    passengers = []
  } = state || {};

  // 🔥 ROCK SOLID FALLBACK: If we lost the bus name in transit, find the exact bus from the master array
  const bus = stateBus?.name
    ? stateBus
    : buses.find(b => b.from === stateBus?.from && b.to === stateBus?.to) || stateBus;

  const invoiceRef = useRef(null);

  const billNo = Math.floor(100 + Math.random() * 900);
  const date = new Date().toISOString().split("T")[0];

  const downloadInvoice = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const link = document.createElement("a");
    link.download = `Bus_Ticket_${billNo}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <div
        className="bus-header"
        style={{ backgroundImage: `url(${headImg})` }}
      >
        <div className="bus-header-overlay">
          <h1>Collect Your Invoice</h1>
        </div>
      </div>

      <div className="container my-5">
        {/* ===== TICKET ===== */}
        <div className="ticket-card" ref={invoiceRef}>
          <div className="ticket-header">
            <div>
              <h5 className="m-0 text-uppercase fw-bold">{bus?.name || "Busify Travels"}</h5>
              <small className="opacity-75">{bus?.company} | {bus?.type || "Standard Bus"} | {bus?.amenities?.join(' • ')}</small>
            </div>
            <div className="text-end">
              <span className="fw-bold">Bus No: {bus?.name?.substring(0, 2).toUpperCase() || "BS"} {Math.floor(1000 + Math.random() * 9000)}</span>
              <br />
              <small>Bill No: {billNo}</small>
            </div>
          </div>

          <div className="ticket-body">
            <div className="left">
              <div className="route-info mb-4">
                <div className="route-point">
                  <span className="time">{bus?.depart}</span>
                  <span className="city">{bus?.from}</span>
                </div>
                <div className="route-line px-3 text-muted text-center flex-grow-1">
                  <i className="bi bi-arrow-right fs-4"></i>
                  <div className="duration"><small>{bus?.duration}</small></div>
                </div>
                <div className="route-point text-end">
                  <span className="time">{bus?.arrive}</span>
                  <span className="city">{bus?.to}</span>
                </div>
              </div>

              <div className="row g-3 mb-4 details-grid">
                <div className="col-6">
                  <small className="text-muted d-block">Passenger Name</small>
                  <strong>{passengers?.[0]?.name || "Guest"}</strong>
                </div>
                <div className="col-6">
                  <small className="text-muted d-block">Journey Date</small>
                  <strong>{date}</strong>
                </div>
                <div className="col-6">
                  <small className="text-muted d-block">Seat Numbers</small>
                  <strong>{selectedSeats.join(", ")}</strong>
                </div>
                <div className="col-6">
                  <small className="text-muted d-block">Total Passengers</small>
                  <strong>{selectedSeats.length}</strong>
                </div>
              </div>

              <div className="price-box p-3 rounded bg-light d-flex justify-content-between align-items-center">
                <span className="fw-bold text-muted">Total Amount Paid</span>
                <h4 className="price m-0">NPR {totalPrice}</h4>
              </div>
            </div>

            <div className="receipt-divider"></div>

            <div className="right d-flex flex-column justify-content-center align-items-center">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Busify_Ticket_ID_${billNo}`} alt="QR Code" className="qr mb-3" />
            </div>
          </div>

          <div className="ticket-footer">
            <span><strong>Note:</strong> 40% charge for cancellation within 24 hours.</span>
            <span><i className="bi bi-telephone"></i> +977-9876543210</span>
          </div>
        </div>

        {/* ===== DOWNLOAD BUTTON ===== */}
        <div className="text-center mt-4">
          <button className="btn btn-danger px-5" onClick={downloadInvoice}>
            Download Invoice
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Invoice;
