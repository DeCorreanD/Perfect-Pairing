import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// eslint-disable-next-line camelcase
const getTaskList = (booking_id) => new Promise((resolve, reject) => {
  // eslint-disable-next-line camelcase
  fetch(`${endpoint}/tasklist.json?orderBy="booking_id"&equalTo="${booking_id}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleTaskList = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasklist/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTaskList = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasklist.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTaskList = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasklist/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteTaskList = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tasklist/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
export {
  getTaskList,
  getSingleTaskList,
  createTaskList,
  updateTaskList,
  deleteTaskList,
};
