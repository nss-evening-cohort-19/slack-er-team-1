import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createChannel } from '../../api/channelData';

const initialState = {
  channelName: '',
  firebaseKey: '',
};

function ChannelForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };
    createChannel(payload).then(() => {
      router.push('/');
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="channel-title">{obj.firebaseKey ? 'Update' : 'Add'} a Channel</h1>
        <input required type="text" name="channelName" value={formInput.channelName} className="form-control" placeholder="Channel Name" onChange={handleChange} />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </>
  );
}

ChannelForm.propTypes = {
  obj: PropTypes.shape({
    channelName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ChannelForm.defaultProps = {
  obj: initialState,
};

export default ChannelForm;
