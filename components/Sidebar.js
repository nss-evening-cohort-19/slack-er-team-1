/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getChannelsByUid } from '../api/channelData';

export default function Sidebar() {
  const [channelList, setChannelList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getChannelsByUid(user.uid).then(setChannelList);
  }, [user.uid]);

  return (
    <div className="offcanvas offcanvas-start show sidebarStyle" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
      <div className="offcanvas-header">
        <img src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/28/original/nss-logo-compact.png" alt="NSS logo" className="logo" />
        <h5 className="offcanvas-title" id="staticBackdropLabel">
          Channel Name
        </h5>
      </div>
      <hr />
      <div className="offcanvas-body">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/3884/3884366.png" alt="speech-bubble" className="icon" />
          Threads
        </div>
        <div>
          <img src="https://cdn-icons.flaticon.com/png/512/3114/premium/3114649.png?token=exp=1660317523~hmac=ad62b9a1a3a08f0f10afd974bd6075a8" alt="double-speech-bubble" className="icon" />
          Direct messages
        </div>
        <div>
          <img src="https://cdn-icons.flaticon.com/png/512/3060/premium/3060001.png?token=exp=1660317768~hmac=7c6f42527516e2710ec15a1c482bce44" alt="mentions-and-reactions" className="icon" />
          Mentions and reactions
        </div>
        <div>
          <img src="https://cdn-icons.flaticon.com/png/512/4023/premium/4023094.png?token=exp=1660317886~hmac=2a79b90474e5cd18f1bfe0b6edc87f61" alt="more" className="icon" />
          More
        </div>
        <hr />
        <div className="dropdown">
          <button className="btn btn-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Channels
          </button>
          <ul className="dropdown-menu">
            {channelList.map((channel) => (
              <li key={channel.firebaseKey}>
                <Link className="dropdown-item" href={`/channel/${channel.firebaseKey}`}>
                  {channel.channelName}
                </Link>
              </li>
            ))}
            <li>
              <Link className="dropdown-item" href="/channel/new">
                + Add channel
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="/channel/browseChannels">
                Browse Channels
              </Link>
            </li>
          </ul>
        </div>
        <br />
        <button className="btn btn-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Direct Messages
        </button>
        <div># Slack-er Bot</div>
        <div># Message 1</div>
        <div># Message 2</div>
        <div># Message 3</div>
        <div>+ Add teammates</div>
      </div>
    </div>
  );
}
