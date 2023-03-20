import { getSingleUser } from './usersData';
import { getSingleBooking } from './bookingData';

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
export { viewUserInfo, viewBookingInfo };
