import CreateUserForm from '../components/CreateUserForm';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import TextInput from '../components/TextInput';

function Home() {
  return (
    <div>
      <br />
      <Sidebar />
      <PostCard />
      <CreateUserForm />
      <TextInput />
    </div>
  );
}
export default Home;
