import React from 'react';
import ChannelNameCard from '../../components/channels/ChannelNameCard';

export default function browseChannels() {
  return (
    <div className="all-channels-page">
      <header>
        <h1>Browse Channels</h1>
      </header>
      <section>
        <ChannelNameCard />
      </section>
    </div>
  );
}
