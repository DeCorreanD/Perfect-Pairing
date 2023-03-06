/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewUserInfo from '../../api/mergeData';

export default function ViewUser() {
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewUserInfo(firebaseKey).then(setUserInfo);
  }, [firebaseKey]);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={userInfo.image} alt={userInfo.name} style={{ width: '300px' }} />
      </div>
      <div className="text-black ms-5 details">
        <h5>
          {userInfo.name}
        </h5>
        <p>{userInfo.description}</p>
        <p> {userInfo.email}</p>
        <p>{userInfo.phone}</p>
        <p>{userInfo.location}</p>

      </div>
    </div>
  );
}
