/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

function User({
  image, name, email, lastLogin, uid,
}) {
  return (
    <div>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      <h2>{email}</h2>
      <h3>{lastLogin}</h3>
      <h1>{uid}</h1>,
    </div>
  );
}

User.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  lastLogin: PropTypes.string,
  uid: PropTypes.string,
};
User.defaultProps = {
  image: '',
  name: '',
  email: '',
  lastLogin: '',
  uid: '',
};

export default User;
