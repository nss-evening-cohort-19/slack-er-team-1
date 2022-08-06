/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Search from '../components/Search';
import { getAllPosts } from '../api/postsData';

export default function Posts() {
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

  console.warn(posts);

  return (
    <>
      <div className="text-center my-4 teamCardsDiv">
        <div className="postsHeaderDiv">
          <Search posts={posts} setFilteredPosts={setFilteredPosts} />
        </div>
        <div className="d-flex flex-wrap postsCardContainer">
          {filteredPosts?.map((post) => (
            <PostCard key={post?.firebaseKey} postObj={post} onUpdate={getThePosts} />
          ))}
        </div>
      </div>
    </>
  );
}
