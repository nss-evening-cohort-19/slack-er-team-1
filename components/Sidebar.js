/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Accordion from 'react-bootstrap/Accordion';
import { useAuth } from '../utils/context/authContext';
import { getChannelsByUid } from '../api/channelData';

export default function Sidebar() {
  const [channelList, setChannelList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getChannelsByUid(user.uid).then(setChannelList);
  }, [user.uid]);

  return (
    <div className="sidebarStyle" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
      <div className="sidebarLogoName">
        <img src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/28/original/nss-logo-compact.png" alt="NSS logo" className="logo" />
        <h4 className="offcanvas-title" id="staticBackdropLabel">
          <b>Nashville Software Shool</b>
        </h4>
      </div>
      <hr />
      <div className="offcanvas-body">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/3884/3884366.png" alt="threads" className="icon" />
          Threads
        </div>
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/892/892177.png" alt="direct-messages" className="icon" />
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
        <div className="bottomSidebar">
          <Accordion className="accordionChannels bg-dark text-light" defaultActiveKey="0">
            <Accordion.Item className="accordionChannels text-light" eventKey="1">
              <Accordion.Header style={{ color: '#9b9a9d' }} className="accordionChannels text-light">Channels</Accordion.Header>
              <Accordion.Body className="accordionChannels text-light">
                <ul className="accordionStyle">
                  {channelList.map((channel) => (
                    <li className="listItemsChannels" key={channel.firebaseKey}>
                      <Link style={{ color: '#9b9a9d' }} className="accordion-item" href={`/channel/${channel.firebaseKey}`}>
                        {channel.channelName}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link style={{ color: '#9b9a9d' }} className="accordion-item" href="/channel/new">
                      + Add channel
                    </Link>
                  </li>
                  <li>
                    <Link style={{ color: '#9b9a9d' }} className="accordion-item" href="/channel/browseChannels">
                      Browse Channels
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br />
          <div>Direct messages</div>
          <div>Slack-er Bot</div>
          <div>Message 1</div>
          <div>Message 2</div>
          <div>Message 3</div>
          <div>Add teammates</div>
        </div>
      </div>
    </div>
  );
}
