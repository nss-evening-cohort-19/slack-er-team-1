import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createUser, getUsersByUid, updateUser } from '../api/userData';

const initialState = {
  name: '',
  tagline: '',
  email: '',
  phone: '',
  imageUrl: '',
};

function CreateUserForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setProfile] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getUsersByUid(user.uid).then(setProfile);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      const payload = {
        ...formInput,
        name: user.displayName,
        email: user.email,
      };
      updateUser(payload).then(() => router.push('/profile'));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        lastLogin: new Date().toLocaleString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      createUser(payload).then(() => {
        router.push('/profile');
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input required type="text" name="tagline" value={formInput.tagline} className="form-control" placeholder="What's your tagline?" onChange={handleChange} />
        <input required type="tel" name="phone" value={formInput.phone} className="form-control" placeholder="Phone Number" onChange={handleChange} />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

CreateUserForm.propTypes = {
  obj: PropTypes.shape({
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

CreateUserForm.defaultProps = {
  obj: initialState,
};

export default CreateUserForm;
