/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CreateUserForm from '../components/CreateUserForm';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import { getAllPosts } from '../api/postsData';
import TextInput from '../components/TextInput';
import Channel from '../components/channels/Channel';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

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
    <div>
      <br />
      <Sidebar />
      <Channel />
      <CreateUserForm />
      <div className="postCardsDiv">
        <div className="text-center my-4 teamCardsDiv">
          <div className="d-flex flex-wrap postsCardContainer">
            {filteredPosts?.map((post) => (
              <PostCard key={post?.firebaseKey} postObj={post} posts={posts} onUpdate={getThePosts} />
            ))}
          </div>
        </div>
      </div>
      <TextInput />
    </div>
  );
}
