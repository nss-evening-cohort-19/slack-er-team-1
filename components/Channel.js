import React from 'react';
import PropTypes from 'prop-types';

function Channel({ channelObj }) {
  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <span className="navbar-text">
            {channelObj?.channelName}
          </span>
        </div>
      </nav>
      <div className="container-fluid">
        ...
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
