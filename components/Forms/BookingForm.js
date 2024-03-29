import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createBooking, updateBooking } from '../../api/bookingData';
import { getParent, getSitter } from '../../api/usersData';

const initialState = {
  start_time: '',
  end_time: '',
  notes: '',
  name: '',
  date: '',
};

export default function BookingForm({ bookingobj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [sitters, setSitters] = useState([]);
  const [parents, setParents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getSitter().then(setSitters);
    getParent().then(setParents);
    if (bookingobj.firebaseKey) setFormInput(bookingobj);
  }, [bookingobj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookingobj.firebaseKey) {
      updateBooking(formInput).then(() => router.push(`/bookings/${bookingobj.firebaseKey}`));
    } else {
      const payload = { ...formInput };
      createBooking(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateBooking(patchPayload).then(() => router.push('/'));
      });
    }
  };
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{
          marginTop: '50px',
          padding: '60px',
          width: '450px',
          justifyContent: 'center',
          alignContent: 'center',
          borderRadius: '1em',
        }}
      >
        <h2 className=" mt-5" style={{ paddingBottom: '50px' }}>
          {bookingobj.firebaseKey ? 'Update' : 'Create'} Booking
        </h2>

        {/* NAME INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Booking Name " className="mb-3">
          <Form.Control type="text" placeholder="Enter Name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>

        {/* Date INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Date" className="mb-3">
          <Form.Control type="date" inplaceholder="Enter Date" name="date" value={formInput.date} onChange={handleChange} required />
        </FloatingLabel>

        {/* START_TIME INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Start Time" className="mb-3">
          <Form.Control type="time" min="00:00" max="24:00" placeholder="Enter Start Time" name="start_time" value={formInput.start_time} onChange={handleChange} required />
        </FloatingLabel>

        {/* End_TIME INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="End Time" className="mb-3">
          <Form.Control type="time" min="00:00" max="24:00" placeholder="Enter End Time" name="end_time" value={formInput.end_time} onChange={handleChange} required />
        </FloatingLabel>

        {/* NOTES INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Child Information " className="mb-3">
          <Form.Control type="text" placeholder="Enter Notes" name="notes" value={formInput.notes} onChange={handleChange} required />
        </FloatingLabel>

        {/* Parent SELECT  */}
        <FloatingLabel controlId="floatingSelect" label="Parent">
          <Form.Select aria-label="Parent" name="parent_id" onChange={handleChange} className="mb-3" value={bookingobj.parent_id} required>
            <option value="">Select an Parent</option>
            {parents.map((parent) => (
              <option key={parent.firebaseKey} value={parent.firebaseKey}>
                {parent.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        {/* SITTER SELECT  */}
        <FloatingLabel controlId="floatingSelect" label="Sitter">
          <Form.Select aria-label="Sitter" name="sitter_id" onChange={handleChange} className="mb-3" value={bookingobj.sitter_id} required>
            <option value="">Select an Babysitter</option>
            {sitters.map((sitter) => (
              <option key={sitter.firebaseKey} value={sitter.firebaseKey}>
                {sitter.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button variant="outline-dark" type="submit">
          {bookingobj.firebaseKey ? 'Update' : 'Create'} Booking
        </Button>
      </Form>
    </>
  );
}

BookingForm.propTypes = {

  bookingobj: PropTypes.shape({
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    notes: PropTypes.string,
    firebaseKey: PropTypes.string,
    sitter_id: PropTypes.string,
    parent_id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
  }),
};

BookingForm.defaultProps = {

  bookingobj: initialState,
};
