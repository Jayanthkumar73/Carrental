import React from 'react';
import VehicleList from '../components/Booking/VehicleList';

const Book = () => {
  return (
    <div>
      <div className="bg-light py-5">
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fw-bold gradient-text">Book Your Vehicle</h1>
            <p className="lead">Choose from our wide selection of cars and bikes</p>
          </div>
        </div>
      </div>
      
      <VehicleList />
    </div>
  );
};

export default Book;