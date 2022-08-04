import Sidebar from '../components/Sidebar';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import TextInput from '../components/TextInput';

function Home() {
  const { user } = useAuth();
  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.displayName}! </h1>
        <p>Click the button below to logout!</p>
        <button className="btn btn-outline-success" type="submit" onClick={signOut}>
          Sign Out
        </button>
      </div>
      <br />
      <Sidebar />
      <TextInput />
    </>
  );
}
export default Home;
