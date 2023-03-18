import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../../../components/forms/UserForm';
import { getSingleUser } from '../../../api/usersData';

export default function EditUser() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // Grab the firebaseKey
  const { firebaseKey } = router.query;

  // Make a call to the API to get the User Data
  useEffect(() => {
    getSingleUser(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // Pass object to Form
  return (<UserForm obj={editItem} />);
}
