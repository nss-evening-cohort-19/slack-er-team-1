import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getChannels } from '../../api/channelData';
import { createJoinChannel } from '../../api/joinData';

function ChannelNameCard() {
  const [allChannels, setAllChannels] = useState([]);
  const { user } = useAuth();

  const deleteTheJoinObj = () => {
    console.warn('Future logic to delete join table');
  };

  useEffect(() => {
    getChannels().then(setAllChannels);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      // channelId: ,
      userId: user.uid,
    };
    createJoinChannel(payload);
  };

  return (
    <div>
      <ul>
        {allChannels?.map((channel) => <li key={channel.firebaseKey}>{channel.channelName} <button type="button" className={user.uid === channel.uid ? 'btn btn-outline-dark' : 'btn btn-outline-success'} onClick={user.uid === channel.uid ? deleteTheJoinObj : handleSubmit}>{user.uid === channel.uid ? 'Leave' : 'Join'}</button></li>)}
      </ul>
    </div>
  );
}

export default ChannelNameCard;
