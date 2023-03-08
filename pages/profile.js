import React from 'react';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="text-black mb-3" style={{ marginTop: '35px' }}>
      <Image src={user.photoURL} alt="photoURL" width="100px" height="100px" />
      <h1>Name: {user.name}</h1>
      <h3>Email: {user.email}</h3>
      <h4>Phone: {user.phone}</h4>
      <h6>Parent/Sitter: {user.isParent}</h6>
      <Button variant="danger" onClick={signOut}>
        {' '}
        Sign Out
      </Button>
    </div>
  );
}
