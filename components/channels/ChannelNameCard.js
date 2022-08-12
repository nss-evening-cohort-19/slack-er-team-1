import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getChannels } from '../../api/channelData';

function ChannelNameCard() {
  const [allChannels, setAllChannels] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getChannels().then(setAllChannels);
  }, []);

  return (
    <div>
      <ul>
        {allChannels?.map((channel) => <li key={channel.firebaseKey}>{channel.channelName} <button type="button" className={user.uid === channel.uid ? 'btn btn-outline-dark' : 'btn btn-outline-success'}>{user.uid === channel.uid ? 'Leave' : 'Join'}</button></li>)}
      </ul>
    </div>
  );
}

export default ChannelNameCard;
