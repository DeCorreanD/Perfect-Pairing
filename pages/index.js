/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getSitter } from '../api/usersData';
import UserCard from '../components/userCard';

function Home() {
  const [sitters, setSitters] = useState([]);

  const { user } = useAuth();
  const getAllSitter = () => {
    getSitter(user.uid).then(setSitters);
  };
  useEffect(() => {
    getAllSitter();
  });

  return (
    <>
      <div
        className="text-center my-4"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>{user.displayName}! </h1>
        <p>Perfect Pairing provides an easy way to find local babysitting jobs with parents in your community. You don’t have to weed through job boards, instead, parents will request you.</p>
        <div className="">
          {sitters.map((sitter) => (
            <UserCard key={sitter.firebaseKey} userObj={sitter} onUpdate={getAllSitter} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
