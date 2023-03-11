import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data)[0]);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUserLogin = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json?orderBy="uid"&equalTo="${uid}"`, {
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

const getSitter = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json?orderBy="isParent"&equalTo=false`, {
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

const getSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json`, {
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

const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${payload.firebaseKey}.json`, {
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

const deleteUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${firebaseKey}.json`, {
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
  deleteUser,
  getSingleUser,
  getUser,
  createUser,
  updateUser,
  getSitter,
  getUserLogin,
};
