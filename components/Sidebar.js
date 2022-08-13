/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Accordion from 'react-bootstrap/Accordion';
import { BsChatText } from 'react-icons/bs';
import { FaComments, FaAt, FaEllipsisV } from 'react-icons/fa';
import { useAuth } from '../utils/context/authContext';
import { joiningChannel } from '../api/mergedData';

export default function Sidebar() {
  const [channelList, setChannelList] = useState([]);
  // const [joinTable, setJoinTable] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    joiningChannel(user.uid).then((response) => {
      console.warn(response, 'Right Here');
      setChannelList(response);
    });
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
          <BsChatText className="icon" />
          Threads
        </div>
        <div>
          <FaComments className="icon" />
          Direct messages
        </div>
        <div>
          <FaAt className="icon" />
          Mentions and reactions
        </div>
        <div>
          <FaEllipsisV className="icon" />
          More
        </div>
        <hr />
        <div className="bottomSidebar">
          <Accordion className="accordionChannels bg-dark text-light" defaultActiveKey="0">
            <Accordion.Item className="accordionChannels text-light" eventKey="1">
              <Accordion.Header style={{ color: '#9b9a9d' }} className="accordionChannels text-light">
                Channels
              </Accordion.Header>
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
