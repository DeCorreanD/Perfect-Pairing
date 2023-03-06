// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Proptypes from 'prop-types';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { getUsers, createUser, updateUser } from '../../api/usersData';

// const initialState = {
//   name: '',
//   image: '',
//   description: '',
//   email: '',
//   phone: '',
//   location: '',
//   isParent: false,
// };

// export default function UserForm({ obj }) {
//   const [formInfo, setFormInfo] = useState({
//     ...initialState,
//     uid: obj.uid,
//   });
//   const router = useRouter();
//   const { setUser, uid } = useAuth();

//   useEffect(() => {
//     if (obj.firebaseKey) setFormInfo(obj);
//   }, [obj]);

//   return (
//     <div>UserForm</div>
//   );
// }
