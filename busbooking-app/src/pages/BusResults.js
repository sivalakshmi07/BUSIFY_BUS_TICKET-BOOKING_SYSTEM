import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BusResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ READ SEARCH DATA FROM HOME
  const searchFrom = location.state?.from || "";
  const searchTo = location.state?.to || "";
  const searchDate = location.state?.date || "";

  // ✅ LIVE DATABASE BUSES
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FILTER STATES
  const [priceRange, setPriceRange] = useState(5000);
  const [busTypes, setBusTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);

  // 🔥 FETCH DATA FROM BACKEND WHEN PAGE LOADS
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/buses/search?from=${searchFrom}&to=${searchTo}`);
        const data = await response.json();
        setBuses(data || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load buses from backend:", error);
        setBuses([]);
        setLoading(false);
      }
    };
    fetchBuses();
  }, [searchFrom, searchTo]);

  // ✅ FILTERED BUS LIST (CLEAN & SAFE)
  const filteredBuses = buses
    // PRICE FILTER
    .filter((bus) => bus.price <= priceRange)

    // BUS TYPE FILTER
    .filter((bus) =>
      busTypes.length === 0 ? true : busTypes.includes(bus.type)
    )

    // AMENITIES FILTER
    .filter((bus) =>
      amenities.length === 0
        ? true
        : amenities.every((a) => bus.amenities.includes(a))
    );

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* LEFT FILTER PANEL */}
        <div className="col-md-3">
          <div className="card p-3 mb-3">
            <h5>Apply Filters</h5>

            {/* PRICE */}
            <label className="mt-3">
              Price up to ₹{priceRange}
            </label>
            <input
              type="range"
              min="300"
              max="5000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="form-range"
            />
          </div>

          {/* BUS TYPE */}
          <div className="card p-3 mb-3">
            <h6>Bus Type</h6>
            {["AC Deluxe", "Luxury AC", "Tourist AC"].map((type) => (
              <div key={type}>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    e.target.checked
                      ? setBusTypes([...busTypes, type])
                      : setBusTypes(busTypes.filter((t) => t !== type))
                  }
                />{" "}
                {type}
              </div>
            ))}
          </div>

          {/* AMENITIES */}
          <div className="card p-3">
            <h6>Amenities</h6>
            {["AC", "WiFi", "Charging", "TV"].map((item) => (
              <div key={item}>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    e.target.checked
                      ? setAmenities([...amenities, item])
                      : setAmenities(amenities.filter((a) => a !== item))
                  }
                />{" "}
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT BUS LIST */}
        <div className="col-md-9">
          <h4>Available Buses {searchFrom && searchTo && `(${searchFrom} to ${searchTo})`}</h4>

          {loading ? (
            <p className="text-secondary mt-3">Searching live database for buses...</p>
          ) : filteredBuses.length === 0 ? (
            <p className="text-danger mt-3">
              No buses found for this route. Try changing your search or filters.
            </p>
          ) : (
            filteredBuses.map((bus) => (
              <div key={bus._id || bus.id} className="card p-3 mb-3 shadow-sm">
                <h5>{bus.name}</h5>

                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{bus.depart}</strong>
                    <br />
                    {bus.from}
                  </div>

                  <div className="text-center">
                    {bus.duration}
                  </div>

                  <div>
                    <strong>{bus.arrive}</strong>
                    <br />
                    {bus.to}
                  </div>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    ₹ {bus.price} / seat <br />
                    <span className="text-success">
                      {bus.seats} seats available
                    </span>
                  </div>

                  {/* ✅ NAVIGATE TO SEAT SELECTION */}
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      navigate("/seats", { state: { bus, date: searchDate } })
                    }
                  >
                    Reserve Seat
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default BusResults;
