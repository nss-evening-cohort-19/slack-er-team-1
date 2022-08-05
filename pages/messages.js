/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import PostCard from '../components/PostCard';
import Search from '../components/Search';
import { getThreads } from '../api/threadsData';

export default function Threads() {
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const { user } = useAuth();

  const getAllThreads = () => {
    getThreads(user.uid).then((thread) => {
      setThreads(thread);
      setFilteredThreads(thread);
    });
  };

  useEffect(() => {
    getAllThreads();
  }, [user]);

  return (
    <>
      <div className="text-center my-4 teamCardsDiv">
        <div className="threadHeaderDiv">
          <Search threads={threads} setFilteredThreads={setFilteredThreads} />
        </div>
        <div className="d-flex flex-wrap messagesCardContainer">
          {filteredThreads.map((thread) => (
            <PostCard key={thread.firebaseKey} threadObj={threads} onUpdate={getAllThreads} />
          ))}
        </div>
      </div>
    </>
  );
}
