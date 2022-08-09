import React from 'react';
import ChannelNameCard from '../../components/channels/ChannelNameCard';
import Sidebar from '../../components/Sidebar';

export default function browseChannels() {
  return (
    <div className="all-channels-page">
      <header>
        <h1>Browse Channels</h1>
      </header>
      <section>
        <Sidebar />
      </section>
      <section>
        <ChannelNameCard />
      </section>
    </div>
  );
}
