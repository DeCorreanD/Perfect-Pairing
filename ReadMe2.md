# HomeWork
[View The App Here](Netlify Link)
## Get Started
- [React Template Startup Readme](./templateReadMe.md)
- Or You can clone it and start editing here
`$ git@github.com:DeCorreanD/Perfect-Pairing.git`
`$ cd Perfect-Pairing`
`$ npm run dev`
## About the user
- There are two users that Perfect Pairing are made for.
- Parents should be able to VIEW a list of available babysitter and choose to make a Booking with them. After the booking is nade you can CREATE a tasklist to attach to the Booking.
- Babysitters are able to see a list of availbale Bookings and choose to accept it. If they do the booking will go to there booking folder with the tasklit attached to it.
## Features
- Full CRUD
-
## Relevant Links
- [Check out the deployed site](Netlify)
- [Figma Wireframes](https://www.figma.com/file/mebSTt1OckMGAD7SmfmFIw/Perfect-Pairing?node-id=0-1&t=OGtvdsjkSzXO9gDc-0)
- [ERD](https://dbdiagram.io/d/63eadd11296d97641d80a93f)
- Assumption: Babysitter can accept booking & parents can make them aswell as tasklists.
## Code Snippet
```
  function BookingCard({ bookingObj, onUpdate }) {
  const { user } = useAuth();
  const [cardView, setCardView] = useState({});

  const getCardView = () => {
    getUser(user.uid).then(setCardView);
  };
  useEffect(() => {
    getCardView();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const TasklistBookingButton = () => {
    if (window.confirm('View?')) {
      viewBookingDetails(bookingObj.firebaseKey).then(() => onUpdate());
    }
  };
  const deleteThisBooking = () => {
    if (window.confirm('Delete?')) {
      deleteBookingTasklist(bookingObj.firebaseKey).then(() => onUpdate());
    }
  };
### Tech/framework used
**Built with**
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
### API Reference
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
## Creator
- [DeCorrean Davis](https://github.com/DeCorreanD)
```
FigmaFigma
HomeWork
Created with Figma (25 kB)
https://www.figma.com/file/mebSTt1OckMGAD7SmfmFIw/Perfect-Pairing?node-id=0-1&t=OGtvdsjkSzXO9gDc-0

dbdiagram.iodbdiagram.io
A Free Database Designer for Developers and Analysts
Quick and simple free tool to help you draw your database relationship diagrams and flow quickly using just keyboard (504 kB)
https://dbdiagram.io/d/63eadd11296d97641d80a93f
