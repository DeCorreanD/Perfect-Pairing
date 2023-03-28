import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTaskList } from '../../../api/tasklistData';
// eslint-disable-next-line import/extensions
import TasklistForm from '../../../components/Forms/TasklistForm.js';

export default function EditTasklist() {
  const [editTasklist, setEditTasklist] = useState({});
  const router = useRouter();
  // Grab the firebaseKey
  const { firebaseKey } = router.query;

  // Make a call to the API to get the Booking Data
  useEffect(() => {
    getSingleTaskList(firebaseKey).then(setEditTasklist);
  }, [firebaseKey]);

  // Pass object to Form
  return <TasklistForm tasklistObj={editTasklist} />;
}
