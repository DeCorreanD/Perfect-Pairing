/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { getUser } from '../api/usersData';

export default function UserProfile() {
  const { user } = useAuth();
  const [profileInfo, setProfileInfo] = useState({});

  const getUserData = () => {
    getUser(user.uid).then(setProfileInfo);
  };

  useEffect(() => {
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <div className="text-black mb-3" style={{ marginTop: '35px' }}>
        <img src={profileInfo.image} alt="img" width="100px" height="100px" />
        <h1>Name: {profileInfo.name}</h1>
        <h2>Email: {profileInfo.email}</h2>
        <h2>Phone: {profileInfo.phone}</h2>

        {profileInfo.isParent ? (
          <div>
            {/* show Parent-specific Information */}
            <h2>Parent</h2>
          </div>
        ) : (
          <div>
            {/* show Sitter-specific Information */}
            <h2>Sitter</h2>
          </div>
        )}
        <Button variant="outline-danger" onClick={signOut}>
          {' '}
          Sign Out
        </Button>
      </div>
    </div>
  );
}
