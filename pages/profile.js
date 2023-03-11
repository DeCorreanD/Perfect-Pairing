/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
// import Link from 'next/link';
import PropTypes from 'prop-types';
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
        <h3>Email: {profileInfo.email}</h3>
        <h4>Phone: {profileInfo.phone}</h4>

        {profileInfo.isParent ? (
          <div>
            {/* show Parent-specific Information */}
            <p>TacoParent:</p>
          </div>
        ) : (
          <div>
            {/* show Sitter-specific Information */}
            <p>TacoSitter</p>
          </div>
        )}
        {/* <Link href={`/users/edit/${userObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link> */}
        <Button variant="danger" onClick={signOut}>
          {' '}
          Sign Out
        </Button>
      </div>
    </div>
  );
}
UserProfile.propTypes = {
  userObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
