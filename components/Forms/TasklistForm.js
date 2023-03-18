import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createTaskList, updateTaskList } from '../../api/tasklistData';
import { getBooking } from '../../api/bookingData';

const initialState = {
  breakfast: '',
  playtime: '',
  reading: '',
  naptime: '',
  snacks: '',
  bathroombreak: '',
  lunch: '',
  image: '',
  details: '',
};

export default function TasklistForm({ tasklistObj }) {
  const [formData, setFormData] = useState(initialState);
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getBooking().then(setBookings);
    if (tasklistObj.firebaseKey) setFormData(tasklistObj);
  }, [tasklistObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tasklistObj.firebaseKey) {
      updateTaskList(formData)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formData };
      createTaskList(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTaskList(patchPayload).then(() => router.push('/'));
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
        <h2 className="mt-5" style={{ paddingBottom: '50px' }}>
          {tasklistObj.firebaseKey ? 'Update' : 'Create'} Tasklist
        </h2>

        {/* BOOKING SELECT  */}
        <FloatingLabel controlId="floatingSelect" label="Booking">
          <Form.Select aria-label="Booking" name="booking_id" onChange={handleChange} className="mb-3" value={tasklistObj.booking_id} required>
            <option value="">Select an Booking</option>
            {bookings.map((booking) => (
              <option key={booking.firebaseKey} value={booking.firebaseKey}>
                {booking.notes}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        {/* BREAKFAST INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Breakfast" className="mb-3">
          <Form.Control type="text" placeholder="What For Breakfast?" name="breakfast" value={formData.breakfast} onChange={handleChange} required />
        </FloatingLabel>

        {/* PLAYTIME INPUT  */}
        <FloatingLabel controlId="floatingInput2" label="Playtime" className="mb-3">
          <Form.Control type="text" placeholder="What Games Are We Playing?" name="playtime" value={formData.playtime} onChange={handleChange} required />
        </FloatingLabel>

        {/* READING INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Reading" className="mb-3">
          <Form.Control type="text" placeholder="What Are We Read?" name="reading" value={formData.reading} onChange={handleChange} required />
        </FloatingLabel>

        {/* NAPTIME INPUT  */}
        <FloatingLabel controlId="floatingInput4" label="Naptime" className="mb-3">
          <Form.Control type="text" placeholder="When Is Naptime?" name="naptime" value={formData.naptime} onChange={handleChange} required />
        </FloatingLabel>

        {/* SNACKS  */}
        <FloatingLabel controlId="floatingInput5" label="Snacks" className="mb-3">
          <Form.Control type="text" placeholder="What Are We Snacking On Today?" name="snacks" value={formData.snacks} onChange={handleChange} required />
        </FloatingLabel>

        {/* BATHROOM BREAK INPUT  */}
        <FloatingLabel controlId="floatingInput6" label="Bathroom Break" className="mb-3">
          <Form.Control type="text" placeholder="How Many Breaks Should Child Take?" name="bathroombreak" value={formData.bathroombreak} onChange={handleChange} required />
        </FloatingLabel>

        {/* LUNCH INPUT  */}
        <FloatingLabel controlId="floatingInput7" label="Lunch" className="mb-3">
          <Form.Control type="text" placeholder="What Should We Eat For Lunch" name="lunch" value={formData.lunch} onChange={handleChange} required />
        </FloatingLabel>

        {/* DETAILS TEXTAREA  */}
        <FloatingLabel controlId="floatingTextarea" label="Details" className="mb-3">
          <Form.Control type="textarea" placeholder="Deatils About The Day." style={{ height: '100px' }} name="details" value={formData.details} onChange={handleChange} required />
        </FloatingLabel>

        {/* IMAGE INPUT  */}
        <FloatingLabel controlId="floatingInput8" label="Image" className="mb-3">
          <Form.Control type="url" placeholder="Enter An Image Of Child." name="image" value={formData.image} onChange={handleChange} required />
        </FloatingLabel>
        {/* SUBMIT BUTTON  */}
        <Button variant="outline-dark" type="submit">
          {tasklistObj.firebaseKey ? 'Update' : 'Create'} Tasklist
        </Button>
      </Form>
    </>
  );
}

TasklistForm.propTypes = {
  tasklistObj: PropTypes.shape({
    breakfast: PropTypes.string,
    playtime: PropTypes.string,
    reading: PropTypes.string,
    naptime: PropTypes.string,
    snacks: PropTypes.string,
    bathroombreak: PropTypes.string,
    lunch: PropTypes.string,
    image: PropTypes.string,
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    booking_id: PropTypes.string,
  }),
};
TasklistForm.defaultProps = {
  tasklistObj: initialState,
};
