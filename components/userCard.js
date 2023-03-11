import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteUser } from '../api/usersData';

function UserCard({ userObj, onUpdate }) {
  const deleteThisSitter = () => {
    if (window.confirm(`Delete ${userObj.name}?`)) {
      deleteUser(userObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={userObj.image} alt={userObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{userObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE USER DETAILS  */}
        <Card.Text>{userObj.description}</Card.Text>
        <Card.Text>{userObj.email}</Card.Text>
        <Card.Text>{userObj.phone}</Card.Text>
        <Card.Text>{userObj.location}</Card.Text>
        <Link href={`/users/${userObj.firebaseKey}`} passHref>
          <Button variant="outline-primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link href={`/users/edit/${userObj.firebaseKey}`} passHref>
          <Button variant="outline-info">EDIT</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE USER DETAILS  */}
        <Button variant="outline-danger" onClick={deleteThisSitter} className="m-2">
          {' '}
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UserCard;
