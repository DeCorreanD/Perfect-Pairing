import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSitter } from '../../../api/usersData';
import { UserForm } from '../../../components/Forms/UserForm';

export default function EditUser() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // Grab the firebaseKey
  const { firebaseKey } = router.query;

  // Make a call to the API to get the User Data
  useEffect(() => {
    getSitter(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // Pass object to Form
  return (<UserForm obj={editItem} key={firebaseKey} />);
}
