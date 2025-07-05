import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebaseConfig';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, [currentUser]);

  const fetchBookings = async () => {
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const bookingsData = [];
      
      querySnapshot.forEach((doc) => {
        bookingsData.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load booking history: ' + (error.message || error.code || error.toString()));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="loading-spinner"></div>
        <p>Loading booking history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4">Booking History</h3>
      
      {bookings.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
          <h4>No bookings yet</h4>
          <p className="text-muted">Your booking history will appear here once you make a reservation.</p>
        </div>
      ) : (
        <div>
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="row">
                <div className="col-md-3">
                  <img 
                    src={booking.vehicleImage} 
                    alt={booking.vehicleName}
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-6">
                  <h5>{booking.vehicleName}</h5>
                  <p className="text-muted">
                    <i className="fas fa-calendar me-2"></i>
                    {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
                  </p>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2"></i>
                    {booking.startTime} - {booking.endTime}
                  </p>
                  <p className="text-muted">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {booking.pickupLocation}
                  </p>
                </div>
                <div className="col-md-3 text-end">
                  <div className={`booking-status status-${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </div>
                  <div className="mt-2">
                    <strong>₹{booking.totalPrice}</strong>
                  </div>
                  <small className="text-muted">
                    Payment ID: {booking.paymentId}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;