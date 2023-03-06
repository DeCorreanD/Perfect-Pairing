/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSitter } from '../../api/usersData';

export default function ViewUser() {
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();
  const { userfirebaseKey } = router.query;

  useEffect(() => {
    getSitter(userfirebaseKey).then(() => {
      setUserInfo(userInfo);
    });
  });

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={userInfo.image} alt={userInfo.image} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>{userInfo.name}</h5>
      </div>
    </div>
  );
}
