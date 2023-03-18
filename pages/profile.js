/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { getUser } from '../api/usersData';

const initialState = {

};

export default function UserProfile({ userObj }) {
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
        <img src={profileInfo.image} alt="img" width="100px" height="100px" style={{ borderRadius: '60em' }} />
        <h5 style={{ fontWeight: 'bold', fontSize: '25px' }}>Name: {profileInfo.name}</h5>
        <p style={{ fontSize: '14px' }}>Email: {profileInfo.email}</p>
        <p style={{ fontSize: '14px' }}>Phone: {profileInfo.phone}</p>

        {profileInfo.isParent ? (
          <div>
            {/* show Parent-specific Information */}
            <p>Parent</p>
            <Link href={`/bookings/${user.firebaseKey}`} passHref>
              <Button variant="outline-info btn-sm">Bookings</Button>
            </Link>
          </div>
        ) : (
          <div>
            {/* show Sitter-specific Information */}
            <p>Sitter</p>
            <Link href={`/bookings/${userObj.firebaseKey}`} passHref>
              <Button variant="outline-info btn-sm">Bookings</Button>
            </Link>
          </div>
        )}
        <Button variant="outline-danger btn-sm" onClick={signOut}>
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
  }),
};
UserProfile.defaultProps = {

  userObj: initialState,
};
