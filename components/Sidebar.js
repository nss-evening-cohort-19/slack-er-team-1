import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getChannels } from '../api/channelData';

export default function Sidebar() {
  const [channelList, setChannelList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getChannels(user.uid).then(setChannelList);
  }, [user.uid]);

  return (
    <div className="offcanvas offcanvas-start show sidebarStyle" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="staticBackdropLabel">Channel Name</h5>
      </div>
      <hr />
      <div className="offcanvas-body">
        <div>Threads</div>
        <div>Direct messages</div>
        <div>Mentions and reactions</div>
        <div>More</div>
        <hr />
        <div className="dropdown">
          <button className="btn btn-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Channels
          </button>
          <ul className="dropdown-menu">
            {channelList.map((channel) => <li key={channel.firebaseKey}><Link className="dropdown-item" href={`/channel/${channel.firebaseKey}`}>{channel.channelName}</Link></li>)}
            <li><Link className="dropdown-item" href="/">+ Add channel</Link></li>
          </ul>
        </div>
        <br />
        <div>Direct messages</div>
        <div>Slack-er Bot</div>
        <div>Message 1</div>
        <div>Message 2</div>
        <div>Message 3</div>
        <div>Add teammates</div>
      </div>
    </div>
  );
}
