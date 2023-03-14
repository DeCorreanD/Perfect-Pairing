import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// eslint-disable-next-line camelcase
const getBooking = (parent_id) => new Promise((resolve, reject) => {
  // eslint-disable-next-line camelcase
  fetch(`${endpoint}/booking.json?orderBy="parent_id"&equalTo="${parent_id}"`, {
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

const getSingleBooking = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/booking/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createBooking = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/booking.json`, {
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

const updateBooking = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/booking/${payload.firebaseKey}.json`, {
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

const deleteBooking = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/booking/${firebaseKey}.json`, {
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
  getBooking,
  getSingleBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
