import React, { useEffect, useState } from 'react';
import { getAllTaskList } from '../api/tasklistData';
import TasklistCard from '../components/tasklistCard';
import { useAuth } from '../utils/context/authContext';

export default function Tasklist() {
  const [tasklists, setTasklists] = useState([]);

  const { firebaseKey } = useAuth();

  const getTasklistData = () => {
    getAllTaskList().then(setTasklists);
  };
  useEffect(() => {
    getTasklistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);
  return (
    <div className="d-flex flex-wrap">
      {tasklists.map((tasklist) => (
        <TasklistCard key={tasklist.firebaseKey} tasklistObj={tasklist} onUpdate={getTasklistData} />
      ))}
    </div>
  );
}
