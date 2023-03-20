/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewBookingInfo } from '../../api/mergeData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewBooking() {
  const [booking, setBooking] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewBookingInfo(firebaseKey).then(setBooking);
  }, [user, firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <div className="text-black ms-5 details">
        <h1>{booking.name}</h1>
        <h3>Date:{booking.date}</h3>
        <h3>Information:{booking.notes}</h3>
        <h3>Start Time:{booking.start_time}</h3>
        <h3>End Time{booking.end_time}</h3>
      </div>
    </div>
  );
}
