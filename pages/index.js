/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getSitter, getUser } from '../api/usersData';
import UserCard from '../components/userCard';

function Home() {
  const { user } = useAuth();
  const [sitters, setSitters] = useState([]);
  const [profileView, setProfileView] = useState({});

  const getUserDataIndex = () => {
    getUser(user.uid).then(setProfileView);
  };

  useEffect(() => {
    getUserDataIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getAllSitter = () => {
    getSitter(user.uid).then(setSitters);
  };
  useEffect(() => {
    getAllSitter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {profileView.isParent ? (
        <div className="text-center my-4" id="index">
          <h1 style={{ fontSize: '17px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>{user.displayName}! </h1>
          <p style={{ fontSize: '10px', fontFamily: 'sans-serif' }}>Perfect Pairing provides an easy way to find local babysitting jobs with parents in your community. You don’t have to weed through job boards, instead, parents will request you.</p>
          <div className="d-flex flex-wrap">
            {sitters.map((sitter) => (
              <UserCard key={sitter.firebaseKey} userObj={sitter} onUpdate={getAllSitter} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Link href="/bookings" passHref>
            <Button variant="outline-info btn-sm">Bookings</Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Home;
