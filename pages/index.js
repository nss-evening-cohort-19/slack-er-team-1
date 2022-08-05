import Channel from '../components/Channel';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import TextInput from '../components/TextInput';

function Home() {
  return (
    <div>
      <br />
      <Channel />
      <Sidebar />
      <PostCard />
      <TextInput />
    </div>
  );
}
export default Home;
