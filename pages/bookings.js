import React, { useEffect, useState } from 'react';
import { getParentBooking, getSitterBooking } from '../api/bookingData';
import { getUser } from '../api/usersData';
import { useAuth } from '../utils/context/authContext';
import BookingCard from '../components/bookingCard';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  const getBookingData = () => {
    // Get the current User from the UsersTable to find out if they are a Parent or Sitter.
    getUser(user.uid).then((currentUser) => {
      if (currentUser.isParent) {
        getParentBooking(currentUser.firebaseKey).then(setBookings);
      } else {
        getSitterBooking(currentUser.firebaseKey).then(setBookings);
      }
    });
  };
  useEffect(() => {
    getBookingData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="d-flex flex-wrap">
      {bookings.map((booking) => (
        <BookingCard key={booking.firebaseKey} bookingObj={booking} onUpdate={getBookingData} />
      ))}
    </div>
  );
}
