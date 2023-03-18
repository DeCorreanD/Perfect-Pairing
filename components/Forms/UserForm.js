import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createUser, getUserLogin, updateUser } from '../../api/usersData';

const initialState = {
  name: '',
  image: '',
  description: '',
  email: '',
  phone: '',
  location: '',
  isParent: false,
};

export default function UserForm({ obj }) {
  const [formInfo, setFormInfo] = useState({ ...initialState, uid: obj.uid });
  const router = useRouter();
  const { user } = useRouter();
  useEffect(() => {
    if (obj.firebaseKey) setFormInfo(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'isParent' ? e.target.checked : value;
    setFormInfo((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateUser(formInfo)
        .then(() => router.push('/'));
    } else {
      createUser(formInfo).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateUser(patchPayload).then(() => {
          getUserLogin(user);
        });
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        marginTop: '50px',
        padding: '60px',
        width: '450px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '1em',
      }}
    >
      <h2 className="mt-5" style={{ paddingBottom: '50px' }}>
        {obj.firebaseKey ? 'Update' : 'Create'} User
      </h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a name" name="name" value={formInfo.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="image" value={formInfo.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* LOCATION INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Location" className="mb-3">
        <Form.Control type="text" placeholder="Enter Location" name="location" value={formInfo.location} onChange={handleChange} required />
      </FloatingLabel>

      {/* Email INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Email" className="mb-3">
        <Form.Control type="email" placeholder="Enter Email" name="email" value={formInfo.email} onChange={handleChange} required />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Experience" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '75px' }} name="description" value={formInfo.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* Phone #  */}
      <FloatingLabel controlId="floatingInput4" label="Phone #" className="mb-3">
        <Form.Control type="tel" placeholder="###-###-####" name="phone" value={formInfo.phone} onChange={handleChange} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-black mb-3"
        type="switch"
        id="isParent"
        name="isParent"
        label="Parent"
        checked={formInfo.isParent}
        onChange={(e) => {
          setFormInfo((prevState) => ({
            ...prevState,
            isParent: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button variant="outline-dark" type="submit">
        {obj.firebaseKey ? 'Update' : 'Create'} User
      </Button>
    </Form>
  );
}

UserForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    isParent: PropTypes.bool,
    email: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

UserForm.defaultProps = {
  obj: initialState,
};
