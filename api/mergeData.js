import { getSingleUser } from './usersData';
import { deleteBooking, getSingleBooking } from './bookingData';
import { deleteTaskList, getSingleTaskList, getTaskListByBooking } from './tasklistData';

const viewUserInfo = (firebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleUser(firebaseKey)]).then(([userObj]) => {
    resolve({ ...userObj });
  }).catch((error) => reject(error));
});

const viewBookingInfo = (firebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleBooking(firebaseKey)])
    .then(([bookingObj]) => {
      resolve({ ...bookingObj });
    })
    .catch((error) => reject(error));
});

const viewTasklistInfo = (firebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTaskList(firebaseKey)])
    .then(([tasklistObj]) => {
      resolve({ ...tasklistObj });
    })
    .catch((error) => reject(error));
});

// eslint-disable-next-line camelcase
const deleteBookingTasklist = (booking_id) => new Promise((resolve, reject) => {
  getTaskListByBooking(booking_id).then((bookingArray) => {
    console.warn(bookingArray, 'Bookings');
    const deleteBookingsPromise = bookingArray.map((booking) => deleteTaskList(booking.firebaseKey));

    Promise.all(deleteBookingsPromise).then(() => {
      deleteBooking(booking_id).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewUserInfo, viewBookingInfo, viewTasklistInfo, deleteBookingTasklist,
};
