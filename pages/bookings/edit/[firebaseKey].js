import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BookingForm from '../../../components/forms/BookingForm';
import { getSingleBooking } from '../../../api/bookingData';

export default function EditUser() {
  const [editBooking, setEditBooking] = useState({});
  const router = useRouter();
  // Grab the firebaseKey
  const { firebaseKey } = router.query;

  // Make a call to the API to get the User Data
  useEffect(() => {
    getSingleBooking(firebaseKey).then(setEditBooking);
  }, [firebaseKey]);

  // Pass object to Form
  return (<BookingForm obj={editBooking} />);
}
