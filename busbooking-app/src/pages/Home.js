import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Services from "../components/Services";
import TopRoutes from "../components/TopRoutes";
import Footer from "../components/Footer";

/* CITY LIST */
const places = [
  "Aluva",
  "Ernakulam",
  "Trivandrum",
  "Bangalore",
  "Hyderabad",
  "Mangalore",
  "Goa",
  "Jaipur",
  "Agra",
  "Mumbai",
  "Pune",
  "Delhi",
  "Chennai"
];

const Home = () => {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const minDate = `${year}-${month}-${day}`;

  const maxDateObj = new Date(today);
  maxDateObj.setMonth(maxDateObj.getMonth() + 2);
  const maxYear = maxDateObj.getFullYear();
  const maxMonth = String(maxDateObj.getMonth() + 1).padStart(2, '0');
  const maxDay = String(maxDateObj.getDate()).padStart(2, '0');
  const maxDate = `${maxYear}-${maxMonth}-${maxDay}`;

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/buses", { state: { from, to, date } });
  };

  return (
    <>
      <Hero>
        <div className="container">
          <div className="card p-4 shadow">
            <h4>Search Buses</h4>

            <form onSubmit={handleSearch} className="row g-3 mt-2">

              {/* FROM */}
              <div className="col-md-3 position-relative">
                <input
                  className="form-control"
                  placeholder="Leaving From"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setShowFrom(true);
                  }}
                  onBlur={() => setTimeout(() => setShowFrom(false), 200)}
                  required
                />

                {showFrom && (
                  <div className="city-dropdown">
                    {places
                      .filter(p =>
                        from && p.toLowerCase().includes(from.toLowerCase())
                      )
                      .map((place, i) => (
                        <div
                          key={i}
                          className="city-item"
                          onClick={() => {
                            setFrom(place);
                            setShowFrom(false);
                          }}
                        >
                          {place}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* SWAP */}
              <div className="col-md-1 d-flex align-items-center justify-content-center">
                <button
                  type="button"
                  className="swap-btn"
                  onClick={handleSwap}
                  title="Swap"
                >
                  ↔
                </button>
              </div>

              {/* TO */}
              <div className="col-md-3 position-relative">
                <input
                  className="form-control"
                  placeholder="Going To"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    setShowTo(true);
                  }}
                  onBlur={() => setTimeout(() => setShowTo(false), 200)}
                  required
                />

                {showTo && (
                  <div className="city-dropdown">
                    {places
                      .filter(p =>
                        to && p.toLowerCase().includes(to.toLowerCase())
                      )
                      .map((place, i) => (
                        <div
                          key={i}
                          className="city-item"
                          onClick={() => {
                            setTo(place);
                            setShowTo(false);
                          }}
                        >
                          {place}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* DATE */}
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {/* SEARCH */}
              <div className="col-md-2 d-grid">
                <button className="btn btn-danger h-100">
                  Search
                </button>
              </div>

            </form>
          </div>
        </div>
      </Hero>

      <Services />
      <TopRoutes />
      <Footer />
    </>
  );
};

export default Home;
