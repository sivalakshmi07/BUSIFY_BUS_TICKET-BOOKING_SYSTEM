import React, { useState } from 'react';
import BusList from './BusList';

const SearchBus = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: ''
  });

  const [showResults, setShowResults] = useState(false);

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

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchData.from || !searchData.to || !searchData.date) {
      alert('Please fill all fields');
      return;
    }

    setShowResults(true);
  };

  return (
    <div className="container mt-5">

      <div className="card p-5 shadow search-card">
        <h4 className="mb-3">Search Buses</h4>

        <form onSubmit={handleSearch} className="row g-3">

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="From"
              name="from"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="To"
              name="to"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="date"
              min={minDate}
              max={maxDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-1 d-grid">
            <button className="btn btn-danger btn-search">Search</button>

          </div>

        </form>
      </div>

      {showResults && <BusList />}

    </div>
  );
};

export default SearchBus;
