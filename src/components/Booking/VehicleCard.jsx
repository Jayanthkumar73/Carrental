import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBookNow = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    navigate('/checkout', { state: { vehicle } });
  };

  return (
    <div className="vehicle-card">
      <img 
        src={vehicle.image} 
        alt={vehicle.name} 
        className="vehicle-image"
      />
      <div className="vehicle-info">
        <h5 className="vehicle-title">{vehicle.name}</h5>
        <p className="vehicle-price">₹{vehicle.pricePerDay}/day</p>
        
        <ul className="vehicle-features">
          <li><i className="fas fa-users"></i> {vehicle.seats} Seats</li>
          <li><i className="fas fa-gas-pump"></i> {vehicle.fuelType}</li>
          <li><i className="fas fa-cog"></i> {vehicle.transmission}</li>
          <li><i className="fas fa-star"></i> {vehicle.rating} Rating</li>
        </ul>
        
        <button 
          className="btn btn-book"
          onClick={handleBookNow}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;