import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getChannels } from '../../api/channelData';

function ChannelNameCard() {
  const [allChannels, setAllChannels] = useState([]);

  useEffect(() => {
    getChannels().then(setAllChannels);
  }, []);

  return (
    <div>
      <ul>
        {allChannels?.map((channel) => <li key={channel.firebaseKey}>{channel.channelName} <button type="button" className="btn btn-outline-success">Join</button></li>)}
      </ul>
    </div>
  );
}

ChannelNameCard.propTypes = {
  channelObj: PropTypes.shape({
    channelName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ChannelNameCard.defaultProps = {
  channelObj: PropTypes.shape({
    channelName: '',
    firebaseKey: '',
  }),
};

export default ChannelNameCard;
