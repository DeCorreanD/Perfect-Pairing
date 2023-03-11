import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import FloatingLabel, { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createTaskList, updateTaskList } from '../../api/tasklistData';

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

export default function TasklistForm({ obj }) {
  const [formData, setFormData] = useState({
    ...initialState,
  });
  const router = useRouter();
  useEffect(() => {
    if (obj.firebaseKey) setFormData(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValues = name === 'isParent' ? e.target.checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValues,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTaskList(formData)
        .then(() => router.push('/'));
    } else {
      createTaskList(formData).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTaskList(patchPayload).then(() => router.push('/'));
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} User</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="User Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a name" name="name" value={formData.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="User Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formData.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* LOCATION INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="User Location" className="mb-3">
        <Form.Control type="text" placeholder="Enter Location" name="location" value={formData.location} onChange={handleChange} required />
      </FloatingLabel>

      {/* Email INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="User Email" className="mb-3">
        <Form.Control type="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange} required />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formData.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* Phone #  */}
      <FloatingLabel controlId="floatingInput4" label="Phone" className="mb-3">
        <Form.Control type="tel" placeholder="###-###-####" style={{ height: '100px' }} name="phone" value={formData.phone} onChange={handleChange} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-black mb-3"
        type="switch"
        id="isParent"
        name="isParent"
        label="Parent"
        checked={formData.isParent}
        onChange={(e) => {
          setFormData((prevState) => ({
            ...prevState,
            isParent: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} User</Button>
    </Form>
  );
}

TasklistForm.propTypes = {
  obj: PropTypes.shape({
    breakfast: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
TasklistForm.defaultProps = {
  obj: initialState,
};
