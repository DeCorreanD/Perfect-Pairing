import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteBooking } from '../api/bookingData';

function BookingCard({ bookingObj, onUpdate }) {
  const deleteThisBooking = () => {
    if (window.confirm('Delete?')) {
      deleteBooking(bookingObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <h1>{bookingObj.name}</h1>
        <h3>Date:{bookingObj.date}</h3>
        <Card.Title>Start Time:{bookingObj.start_time}</Card.Title>
        <Card.Text>End Time:{bookingObj.end_time}</Card.Text>
        <Card.Text>Child Information:{bookingObj.notes}</Card.Text>
        <Link href={`/bookings/${bookingObj.firebaseKey}`} passHref>
          <Button variant="outline-primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link href={`/bookings/edit/${bookingObj.firebaseKey}`} passHref>
          <Button variant="outline-info">EDIT</Button>
        </Link>
        <Button variant="outline-danger" onClick={deleteThisBooking} className="m-2">
          {' '}
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
BookingCard.propTypes = {
  bookingObj: PropTypes.shape({
    sitter_id: PropTypes.string,
    parent_id: PropTypes.string,
    start_time: PropTypes.string,
    date: PropTypes.string,
    end_time: PropTypes.string,
    notes: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default BookingCard;
