// Checkout.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { razorpayOptions, loadRazorpayScript } from '../../razorpayConfig';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { vehicle } = location.state || {};

  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '18:00',
    pickupLocation: '',
    dropoffLocation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!vehicle) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4>No vehicle selected</h4>
          <p>Please go back and select a vehicle to book.</p>
        </div>
      </div>
    );
  }

  const calculateDays = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 1;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const days = calculateDays();
  const basePrice = vehicle.pricePerDay * days;
  const tax = basePrice * 0.18;
  const totalPrice = basePrice + tax;

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const saveBookingToFirestore = async (paymentId) => {
    try {
      const bookingRef = await addDoc(collection(db, 'bookings'), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        vehicleImage: vehicle.image,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        pickupLocation: bookingData.pickupLocation,
        dropoffLocation: bookingData.dropoffLocation,
        days,
        basePrice,
        tax,
        totalPrice,
        paymentId,
        status: 'confirmed',
        createdAt: serverTimestamp()
      });
      return bookingRef.id;
    } catch (error) {
      console.error('Error saving booking:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!bookingData.startDate || !bookingData.endDate || !bookingData.pickupLocation) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError('');

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert('Failed to load Razorpay SDK. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const options = razorpayOptions(
        totalPrice,
        currentUser,
        async (response) => {
          try {
            await saveBookingToFirestore(response.razorpay_payment_id);
            alert('Booking confirmed! Payment ID: ' + response.razorpay_payment_id);
            navigate('/profile');
          } catch (error) {
            alert('Payment successful but booking not saved. Contact support.');
          }
        },
        () => {
          setError('Payment cancelled or failed.');
        }
      );

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error during payment. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container container py-5">
      <div className="row">
        <div className="col-md-8">
          <div className="checkout-card">
            <h3>Booking Details</h3>
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Date and Time inputs */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Start Date *</label>
                <input type="date" name="startDate" className="form-control" value={bookingData.startDate} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="col-md-6 mb-3">
                <label>End Date *</label>
                <input type="date" name="endDate" className="form-control" value={bookingData.endDate} onChange={handleInputChange} min={bookingData.startDate || new Date().toISOString().split('T')[0]} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Pickup Time</label>
                <input type="time" name="startTime" className="form-control" value={bookingData.startTime} onChange={handleInputChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label>Dropoff Time</label>
                <input type="time" name="endTime" className="form-control" value={bookingData.endTime} onChange={handleInputChange} />
              </div>
            </div>

            <div className="mb-3">
              <label>Pickup Location *</label>
              <input type="text" name="pickupLocation" className="form-control" value={bookingData.pickupLocation} onChange={handleInputChange} placeholder="Enter pickup address" />
            </div>
            <div className="mb-3">
              <label>Dropoff Location</label>
              <input type="text" name="dropoffLocation" className="form-control" value={bookingData.dropoffLocation} onChange={handleInputChange} placeholder="Optional" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="checkout-card">
            <h4>Vehicle Summary</h4>
            <img src={vehicle.image} alt={vehicle.name} className="img-fluid rounded mb-3" style={{ maxHeight: '150px', objectFit: 'cover' }} />
            <h5 className="text-center mb-3">{vehicle.name}</h5>

            <div className="price-breakdown">
              <div className="price-row"><span>Price/day:</span><span>₹{vehicle.pricePerDay}</span></div>
              <div className="price-row"><span>Days:</span><span>{days}</span></div>
              <div className="price-row"><span>Base:</span><span>₹{basePrice}</span></div>
              <div className="price-row"><span>Tax (18%):</span><span>₹{tax.toFixed(2)}</span></div>
              <div className="price-row total-price"><strong>Total:</strong><strong>₹{totalPrice.toFixed(2)}</strong></div>
            </div>

            <button className="btn btn-primary w-100 mt-3" onClick={handlePayment} disabled={loading}>
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
