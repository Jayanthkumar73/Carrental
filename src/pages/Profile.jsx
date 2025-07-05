import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import BookingHistory from '../components/Dashboard/BookingHistory';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="profile-container">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-card">
              <div className="profile-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <h4>{currentUser?.displayName || 'User'}</h4>
              <p className="text-muted">{currentUser?.email}</p>
              <hr />
              <div className="text-start">
                <p><strong>Member Since:</strong> {currentUser?.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Last Login:</strong> {currentUser?.metadata?.lastSignInTime ? new Date(currentUser.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            <BookingHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;