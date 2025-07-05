import React, { useState, useEffect } from 'react';
import VehicleCard from './VehicleCard';
import { vehiclesData } from '../../data/vehiclesData';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    transmission: 'all'
  });

  useEffect(() => {
    setVehicles(vehiclesData);
    setFilteredVehicles(vehiclesData);
  }, []);

  useEffect(() => {
    let filtered = vehicles;

    if (filters.type !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.type === filters.type);
    }

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(vehicle => {
        const price = vehicle.pricePerDay;
        return price >= min && (max ? price <= max : true);
      });
    }

    if (filters.transmission !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.transmission === filters.transmission);
    }

    setFilteredVehicles(filtered);
  }, [filters, vehicles]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-3">
          <div className="filter-section">
            <h5 className="filter-title">Filter Vehicles</h5>
            
            <div className="mb-3">
              <label className="form-label">Vehicle Type</label>
              <select 
                className="form-select"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="car">Cars</option>
                <option value="bike">Bikes</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Price Range (per day)</label>
              <select 
                className="form-select"
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="0-1000">₹0 - ₹1000</option>
                <option value="1000-2000">₹1000 - ₹2000</option>
                <option value="2000-5000">₹2000 - ₹5000</option>
                <option value="5000">₹5000+</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Transmission</label>
              <select 
                className="form-select"
                value={filters.transmission}
                onChange={(e) => handleFilterChange('transmission', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Available Vehicles</h3>
            <span className="badge bg-primary fs-6">
              {filteredVehicles.length} vehicles found
            </span>
          </div>
          
          <div className="row">
            {filteredVehicles.map(vehicle => (
              <div key={vehicle.id} className="col-md-6 col-lg-4 mb-4">
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
          
          {filteredVehicles.length === 0 && (
            <div className="text-center py-5">
              <h4>No vehicles found</h4>
              <p className="text-muted">Try adjusting your filters to see more options.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleList;