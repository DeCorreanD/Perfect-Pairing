import { Button } from 'bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>{user.displayName}! </h1>
      <p>Perfect Pairing provides an easy way to find local babysitting jobs with parents in your community. You don’t have to weed through job boards, instead, parents will request you.</p>
      <Button> </Button>
    </div>
  );
}

export default Home;
