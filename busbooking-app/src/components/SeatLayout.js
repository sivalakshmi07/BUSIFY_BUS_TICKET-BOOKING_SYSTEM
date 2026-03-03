import React, { useState } from 'react';
import Seat from './Seat';

const SeatLayout = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Array.from({ length: 20 }, (_, i) => i + 1);
  const seatPrice = 500;

  const toggleSeat = (seatNumber) => {
    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  return (
    <div className="mt-4">

      <h5>Select Seats</h5>

      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '220px' }}>
        {seats.map(seat => (
          <Seat
            key={seat}
            number={seat}
            isSelected={selectedSeats.includes(seat)}
            onSelect={toggleSeat}
          />
        ))}
      </div>

      <div className="mt-3">
        <p><strong>Selected Seats:</strong> {selectedSeats.join(', ') || 'None'}</p>
        <p><strong>Total Price:</strong> ₹{selectedSeats.length * seatPrice}</p>

        <button
          className="btn btn-success"
          disabled={selectedSeats.length === 0}
        >
          Proceed to Booking
        </button>
      </div>

    </div>
  );
};

export default SeatLayout;
