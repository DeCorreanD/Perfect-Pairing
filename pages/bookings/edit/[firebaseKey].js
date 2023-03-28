import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/extensions
import BookingForm from '../../../components/forms/BookingForm.js';
import { getSingleBooking } from '../../../api/bookingData';

export default function EditBooking() {
  const [editBooking, setEditBooking] = useState({});
  const router = useRouter();
  // Grab the firebaseKey
  const { firebaseKey } = router.query;

  // Make a call to the API to get the Booking Data
  useEffect(() => {
    getSingleBooking(firebaseKey).then(setEditBooking);
  }, [firebaseKey]);

  // Pass object to Form
  return (<BookingForm bookingobj={editBooking} />);
}
