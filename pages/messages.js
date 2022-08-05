/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import PostCard from '../components/PostCard';
import Search from '../components/Search';
import { getPosts } from '../api/postsData';

export default function Threads() {
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredPosts] = useState([]);
  const { user } = useAuth();

  const getAllPosts = () => {
    getPosts(user.uid).then((post) => {
      setThreads(post);
      setFilteredPosts(post);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, [user]);

  return (
    <>
      <div className="text-center my-4 teamCardsDiv">
        <div className="threadHeaderDiv">
          <Search threads={threads} setFilteredPosts={setFilteredPosts} />
        </div>
        <div className="d-flex flex-wrap messagesCardContainer">
          {filteredThreads.map((thread) => (
            <PostCard key={thread.firebaseKey} threadObj={threads} onUpdate={getAllPosts} />
          ))}
        </div>
      </div>
    </>
  );
}
