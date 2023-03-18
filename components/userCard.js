import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteUser, getUser } from '../api/usersData';

function UserCard({ userObj, onUpdate }) {
  const { user } = useAuth();
  const [cardInfo, setCardInfo] = useState({});

  const getCardData = () => {
    getUser(user.uid).then(setCardInfo);
  };

  useEffect(() => {
    getCardData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const deleteThisSitter = () => {
    if (window.confirm(`Delete ${userObj.name}?`)) {
      deleteUser(userObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card id="user-card" style={{ width: '15rem', margin: '6px', justifyContent: 'center' }}>
      <Card.Img variant="top" src={userObj.image} alt={userObj.name} style={{ height: '175px' }} />
      <Card.Body id="user-body">
        <Card.Title style={{ fontWeight: 'bold', fontSize: '20px' }}>{userObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE USER DETAILS  */}
        <Card.Text style={{ fontSize: '10px' }}>{userObj.description}</Card.Text>
        <Card.Text style={{ fontSize: '10px' }}>{userObj.email}</Card.Text>
        <Card.Text style={{ fontSize: '10px' }}>{userObj.phone}</Card.Text>
        <Card.Text style={{ fontSize: '10px' }}>{userObj.location}</Card.Text>

        {cardInfo.isParent ? (
          <div>
            <Link href={`/users/${userObj.firebaseKey}`} passHref>
              <Button variant="outline-primary" className="m-2">
                VIEW
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <Link href={`/users/${userObj.firebaseKey}`} passHref>
              <Button variant="outline-primary" className="m-2">
                VIEW
              </Button>
            </Link>

            <Link href={`/users/edit/${userObj.firebaseKey}`} passHref>
              <Button variant="outline-info" className="m-2">
                EDIT
              </Button>
            </Link>

            {/* DYNAMIC LINK TO EDIT THE USER DETAILS  */}

            <Button variant="outline-danger" onClick={deleteThisSitter} className="m-2">
              {' '}
              Delete
            </Button>

          </div>
        )}
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
    isParent: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UserCard;
