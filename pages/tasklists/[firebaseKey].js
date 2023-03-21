import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewTasklistInfo } from '../../api/mergeData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewTasklist() {
  const [tasklist, setTasklist] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTasklistInfo(firebaseKey).then(setTasklist);
  }, [user, firebaseKey]);
  console.warn(tasklist);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <div className="text-black ms-5 details">
        <h1>{tasklist.name}</h1>
        <h3>Breakfast:{tasklist.breakfast}</h3>
        <h3>Playtime:{tasklist.playtime}</h3>
        <h3>Reading:{tasklist.reading}</h3>
        <h3>Naptime:{tasklist.naptime}</h3>
        <h3>Snacks:{tasklist.snacks}</h3>
        <h3>Bathroombreak:{tasklist.bathroombreak}</h3>
        <h3>Lunch:{tasklist.lunch}</h3>
        <h3>Details:{tasklist.details}</h3>
      </div>
    </div>
  );
}
