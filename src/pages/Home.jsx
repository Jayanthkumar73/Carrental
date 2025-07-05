import React from 'react';
import { Link } from 'react-router-dom';
import { vehiclesData } from '../data/vehiclesData';
import VehicleCard from '../components/Booking/VehicleCard';

const Home = () => {
  const featuredVehicles = vehiclesData.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="container">
            <h1 className="hero-title">Find Your Perfect Ride</h1>
            <p className="hero-subtitle">
              Rent cars and bikes with ease. Affordable prices, reliable service, and a wide selection of vehicles.
            </p>
            <Link to="/book" className="btn btn-hero">
              <i className="fas fa-car me-2"></i>
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="feature-item">
                <i className="fas fa-clock text-primary"></i>
                <h4>24/7 Service</h4>
                <p className="text-muted">
                  Round-the-clock customer support and vehicle availability for your convenience.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-item">
                <i className="fas fa-shield-alt text-success"></i>
                <h4>Secure & Safe</h4>
                <p className="text-muted">
                  All vehicles are regularly maintained and insured for your safety and peace of mind.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-item">
                <i className="fas fa-money-bill-wave text-warning"></i>
                <h4>Best Prices</h4>
                <p className="text-muted">
                  Competitive pricing with no hidden fees. Get the best value for your money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="gradient-text">Featured Vehicles</h2>
            <p className="text-muted">Choose from our premium collection</p>
          </div>
          
          <div className="row">
            {featuredVehicles.map(vehicle => (
              <div key={vehicle.id} className="col-md-4 mb-4">
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Link to="/book" className="btn btn-primary btn-lg">
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Vehicles Available</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Cities Covered</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-item">
                <div className="stat-number">5★</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Hit the Road?</h2>
          <p className="lead mb-4">
            Join thousands of satisfied customers who trust VehicleRent for their transportation needs.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg me-3">
            Get Started
          </Link>
          <Link to="/book" className="btn btn-outline-primary btn-lg">
            Browse Vehicles
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;