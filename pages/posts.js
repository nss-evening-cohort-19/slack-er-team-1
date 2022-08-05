/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Search from '../components/Search';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getAllPosts = () => {
    getAllPosts().then((post) => {
      setPosts(post);
      setFilteredPosts(post);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div className="text-center my-4 teamCardsDiv">
        <div className="threadHeaderDiv">
          <Search posts={posts} setFilteredPosts={setFilteredPosts} />
        </div>
        <div className="d-flex flex-wrap messagesCardContainer">
          {filteredPosts.map((post) => (
            <PostCard key={post.firebaseKey} postObj={posts} onUpdate={getAllPosts} />
          ))}
        </div>
      </div>
    </>
  );
}
