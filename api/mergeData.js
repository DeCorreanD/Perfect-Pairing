import { getSingleUser, getUsersBookings } from './usersData';
import getSingleBooking from './bookingData';

const viewUserInfo = (firebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleUser(firebaseKey)]).then(([userObj]) => {
    resolve({ ...userObj });
  }).catch((error) => reject(error));
});

const viewBookingInfo = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBooking(firebaseKey)
    .then((booking) => {
      getUsersBookings(booking.firebaseKey).then((thebookings) => {
        resolve({ ...booking, thebookings });
      });
    })
    .catch(reject);
});
export { viewUserInfo, viewBookingInfo };
