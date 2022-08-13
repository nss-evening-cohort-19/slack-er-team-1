import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import { getAllPosts } from '../api/postsData';
import TextInput from '../components/TextInput';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [messageToEdit, setMessageToEdit] = useState();

  const getThePosts = () => {
    getAllPosts().then((postArray) => {
      setPosts(postArray);
      setFilteredPosts(postArray);
    });
  };

  useEffect(() => {
    getThePosts();
  }, []);
  return (
    <div className="mainBody">
      <Sidebar className="sidebarDiv" />
      <div className="pageContent">
        <div className="postCardsDiv">
          <div className="teamCardsDiv">
            <div className="d-flex flex-wrap postsCardContainer">
              {filteredPosts?.map((post) => (
                <PostCard key={post?.firebaseKey} setMessageToEdit={setMessageToEdit} postObj={post} posts={posts} onUpdate={getThePosts} />
              ))}
            </div>
          </div>
        </div>
        <TextInput key={user.firebaseKey} postsArray={posts} onUpdate={getThePosts} messageToEdit={messageToEdit} />
      </div>
    </div>
  );
}
export default Home;
