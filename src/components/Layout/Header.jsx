import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../UI/ThemeToggle';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsNavOpen(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNav}>
          <i className="fas fa-car me-2"></i>
          VehicleRent
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNav}
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNav}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book" onClick={closeNav}>Book Vehicle</Link>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            <li className="nav-item">
              <ThemeToggle />
            </li>
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile" onClick={closeNav}>
                    <i className="fas fa-user me-1"></i>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-1"></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={closeNav}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary-custom" to="/register" onClick={closeNav}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;