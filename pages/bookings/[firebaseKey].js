/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewBookingInfo } from '../../api/bookingData';
import BookingCard from '../../components/bookingCard';

export default function ViewBooking() {
  const [viewbookings, setViewBookings] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const updateOfBooking = () => {
    viewBookingInfo(firebaseKey).then(setViewBookings);
  };
  useEffect(() => {
    viewBookingInfo(firebaseKey).then(setViewBookings);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <div className="text-black ms-5 details">
        <h5>{viewbookings.start_time}</h5>
        <p>{viewbookings.end_time}</p>
        <p> {viewbookings.notes}</p>
        <div className="d-flex flex-column">
          {viewbookings.bookings?.map((allbookings) => (
            <BookingCard key={allbookings.firebaseKey} bookingObj={allbookings} onUpdate={updateOfBooking} />
          ))}
        </div>
      </div>
    </div>
  );
}
