import React from 'react';
import ChannelForm from '../../components/channels/ChannelForm';
import Sidebar from '../../components/Sidebar';

export default function NewChannel() {
  return (
    <div className="channel-form">
      <Sidebar />
      <ChannelForm />
    </div>
  );
}
