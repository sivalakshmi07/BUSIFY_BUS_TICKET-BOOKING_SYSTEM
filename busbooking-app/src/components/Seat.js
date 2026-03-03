import React from 'react';

const Seat = ({ number, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(number)}
      style={{
        width: '40px',
        height: '40px',
        margin: '6px',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#0d6efd' : '#e9ecef',
        color: isSelected ? '#fff' : '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      }}
    >
      {number}
    </div>
  );
};

export default Seat;
