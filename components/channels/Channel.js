import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';
import TextInput from '../TextInput';

function Channel({ channelObj }) {
  return (
    <div>
      <Sidebar />
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <span className="navbar-text">
            {channelObj?.channelName}
          </span>
        </div>
      </nav>
      <div className="container-fluid post-container">
        ...
        <TextInput />
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
