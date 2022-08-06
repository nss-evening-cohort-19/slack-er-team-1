import CreateUserForm from '../components/CreateUserForm';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
// import Channel from '../components/Channel';

function Home() {
  return (
    <div>
      <br />
      {/* <Channel channelObj={}/> */}
      <Sidebar />
      <PostCard />
      <CreateUserForm />

    </div>
  );
}
export default Home;
