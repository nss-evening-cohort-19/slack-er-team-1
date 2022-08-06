import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Channel from '../../components/Channel';
import { getSingleChannel } from '../../api/channelData';

export default function SingleChannel() {
  const [singleChannelObj, setSingleChannelObj] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleChannel(firebaseKey).then(setSingleChannelObj);
  }, [firebaseKey]);

  return (
    <div>
      <Channel channelObj={singleChannelObj} />
    </div>
  );
}
