import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createUser, getUsers, updateUser } from '../api/userData';

const initialState = {
  postContent: '',
};

function TextInputForm({ postObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setProfile] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  console.warn(user);

  useEffect(() => {
    getUsers(user.uid).then(setProfile);
    if (postObj.firebaseKey) setFormInput(postObj);
  }, [postObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.firebaseKey) {
      updateUser(formInput).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        lastLogin: new Date().toLocaleString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      createUser(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <>
      <form className="commentInputContainer" onSubmit={handleSubmit}>
        <input required type="text" name="name" value={formInput.name} className="form-control" placeholder="First and Last Name" onChange={handleChange} />
        <input required type="text" name="tagline" value={formInput.tagline} className="form-control" placeholder="What's your tagline?" onChange={handleChange} />
        <input required type="email" name="email" value={formInput.email} className="form-control" placeholder="E-mail Address" onChange={handleChange} />
        <input required type="tel" name="phone" value={formInput.phone} className="form-control" placeholder="Phone Number" onChange={handleChange} />
        <input required type="URL" name="imageUrl" value={formInput.imageUrl} className="form-control" placeholder="Profile Image URL" onChange={handleChange} />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

TextInputForm.propTypes = {
  postObj: PropTypes.shape({
    name: PropTypes.string,
    tagline: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    imageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,
    lastLogin: PropTypes.string,
    timeZone: PropTypes.string,
  }),
};

TextInputForm.defaultProps = {
  postObj: initialState,
};

export default TextInputForm;
