import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTaskList } from '../api/tasklistData';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/usersData';

export default function TasklistCard({ tasklistObj, onUpdate }) {
  const { user } = useAuth();
  const [tasklistView, setTasklistView] = useState({});
  const getTasklistView = () => {
    getUser(user.uid).then(setTasklistView);
  };
  useEffect(() => {
    getTasklistView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const deleteThisTasklist = () => {
    if (window.confirm('Delete?')) {
      deleteTaskList(tasklistObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title>Name:{tasklistObj.name}</Card.Title>
          <Card.Text>Breakfast:{tasklistObj.breakfast}</Card.Text>
          <Card.Text>Playtime:{tasklistObj.playtime}</Card.Text>
          <Card.Text>Reading:{tasklistObj.reading}</Card.Text>
          <Card.Text>Naptime:{tasklistObj.naptime}</Card.Text>
          <Card.Text>Snacks:{tasklistObj.snacks}</Card.Text>
          <Card.Text>Bathroombreak:{tasklistObj.bathroombreak}</Card.Text>
          <Card.Text>Lunch:{tasklistObj.lunch}</Card.Text>
          <Card.Text>Details:{tasklistObj.details}</Card.Text>
          {tasklistView.isParent ? (
            <div>
              <Link href={`/tasklists/${tasklistObj.firebaseKey}`} passHref>
                <Button variant="outline-primary" className="m-2">
                  VIEW
                </Button>
              </Link>
              <Link href={`/tasklists/edit/${tasklistObj.firebaseKey}`} passHref>
                <Button variant="outline-info">EDIT</Button>
              </Link>
              <Button variant="outline-danger" onClick={deleteThisTasklist} className="m-2">
                {' '}
                Delete
              </Button>
            </div>
          ) : (
            <div>
              <Link href={`/tasklists/${tasklistObj.firebaseKey}`} passHref>
                <Button variant="outline-primary" className="m-2">
                  VIEW
                </Button>
              </Link>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
TasklistCard.propTypes = {
  tasklistObj: PropTypes.shape({
    name: PropTypes.string,
    breakfast: PropTypes.string,
    playtime: PropTypes.string,
    reading: PropTypes.string,
    naptime: PropTypes.string,
    snacks: PropTypes.string,
    bathroombreak: PropTypes.string,
    lunch: PropTypes.string,
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    booking_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
