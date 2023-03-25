import React, { useEffect, useState } from 'react';
import { getSingleTaskList } from '../api/tasklistData';
import TasklistCard from '../components/tasklistCard';
import { useAuth } from '../utils/context/authContext';

export default function Tasklist() {
  const [sitterTasklists, setSitterTasklists] = useState([]);

  const { firebaseKey } = useAuth();

  const getSitterTasklistData = () => {
    getSingleTaskList().then(setSitterTasklists);
  };
  useEffect(() => {
    getSitterTasklistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);
  return (
    <div className="d-flex flex-wrap">
      {sitterTasklists.map((sitterTasklist) => (
        <TasklistCard key={sitterTasklist.firebaseKey} tasklistObj={sitterTasklist} onUpdate={getSitterTasklistData} />
      ))}
    </div>
  );
}
