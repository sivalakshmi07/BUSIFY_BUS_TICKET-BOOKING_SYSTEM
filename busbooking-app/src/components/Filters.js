import React from "react";

const Filters = () => {
  return (
    <div className="card p-3 shadow-sm">

      <h6>Apply Filters</h6>

      <label className="mt-3">Price Range</label>
      <input type="range" className="form-range" min="0" max="4000" />

      <hr />

      <h6>Bus Types</h6>
      <div>
        <input type="checkbox" /> AC Deluxe<br />
        <input type="checkbox" /> Tourist AC<br />
        <input type="checkbox" /> Luxury AC
      </div>

      <hr />

      <h6>Bus Companies</h6>
      <div>
        <input type="checkbox" /> Sworgadwari<br />
        <input type="checkbox" /> Kerala Express<br />
        <input type="checkbox" /> Trivandrum Travels
      </div>

      <hr />

      <h6>Amenities</h6>
      <div>
        <input type="checkbox" /> WiFi<br />
        <input type="checkbox" /> Charging Port<br />
        <input type="checkbox" /> TV<br />
        <input type="checkbox" /> Water Bottle
      </div>

    </div>
  );
};

export default Filters;
