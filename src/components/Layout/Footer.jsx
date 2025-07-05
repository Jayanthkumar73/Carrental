import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="footer-title">VehicleRent</h5>
            <p className="text-muted">
              Your trusted partner for car and bike rentals. 
              Affordable prices, reliable service, and a wide selection of vehicles.
            </p>
          </div>
          <div className="col-md-2">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/book">Book Vehicle</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="footer-title">Services</h6>
            <ul className="footer-links">
              <li><a href="#cars">Car Rental</a></li>
              <li><a href="#bikes">Bike Rental</a></li>
              <li><a href="#support">24/7 Support</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="footer-title">Contact Info</h6>
            <div className="text-muted">
              <p><i className="fas fa-phone me-2"></i> +91 9876543210</p>
              <p><i className="fas fa-envelope me-2"></i> info@vehiclerent.com</p>
              <p><i className="fas fa-map-marker-alt me-2"></i> Mumbai, India</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 VehicleRent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;