/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewUserInfo from '../../api/mergeData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewUser() {
  const [userInfo, setUserInfo] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewUserInfo(firebaseKey).then(setUserInfo);
  }, [user, firebaseKey]);
  return (
    <div className="mt-5 d-flex flex-wrap" style={{ justifyContent: 'center', marginTop: '200px', padding: '100px' }}>
      <div className="d-flex flex-column">
        <img src={userInfo.image} alt={userInfo.name} style={{ width: '300px', borderRadius: '60em' }} />
      </div>
      <div className="text-black ms-5 details">
        <h5 style={{ fontWeight: 'bold', fontSize: '25px' }}>{userInfo.name}</h5>
        <p style={{ fontSize: '14px' }}>{userInfo.description}</p>
        <p style={{ fontSize: '14px' }}> {userInfo.email}</p>
        <p style={{ fontSize: '14px' }}>{userInfo.phone}</p>
        <p style={{ fontSize: '14px' }}>{userInfo.location}</p>
      </div>
    </div>
  );
}
