import React from 'react';
import ChannelForm from '../../components/channels/ChannelForm';
import Sidebar from '../../components/Sidebar';

export default function NewChannel() {
  return (
    <div>
      <Sidebar />
      <ChannelForm />
    </div>
  );
}
