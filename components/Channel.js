import React from 'react';
import PropTypes from 'prop-types';

function Channel({ channelObj }) {
  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <span className="navbar-text">
            channel name
          </span>
        </div>
      </nav>
      <div className="container-fluid post-container">
        {channelObj}
      </div>
    </div>
  );
}

Channel.propTypes = {
  channelObj: PropTypes.shape({
    channelName: PropTypes.string,
    firebaseKey: PropTypes.string,
    public: PropTypes.bool,
  }).isRequired,
};

export default Channel;
