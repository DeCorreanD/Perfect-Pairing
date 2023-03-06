import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getSitter } from '../api/usersData';
import UserCard from '../components/userCard';

function Home() {
  const [sitters, setSitters] = useState([]);

  const { user } = useAuth();
  const getAllSitter = () => {
    getSitter().then(setSitters);
  };
  useEffect(() => {
    getAllSitter();
  });

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>{user.displayName}! </h1>
        <p>Perfect Pairing provides an easy way to find local babysitting jobs with parents in your community. You don’t have to weed through job boards, instead, parents will request you.</p>
        <Link href="/users/new" passHref>
          <Button> Join The Family</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {sitters.map((sitter) => (
            <UserCard
              key={sitter.firebaseKey}
              userObj={sitter}
              onUpdate={getAllSitter}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
