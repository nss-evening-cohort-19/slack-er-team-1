import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createUser, getUsers, updateUser } from '../api/userData';

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
  console.warn(user.uid);
  useEffect(() => {
    getUsers(user.uid).then(setProfile);
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
      updateUser(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createUser(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formInput.name} className="form-control" placeholder="First and Last Name" onChange={handleChange} />
        <input type="text" name="tagline" value={formInput.tagline} className="form-control" placeholder="What's your tagline?" onChange={handleChange} />
        <input type="email" name="email" value={formInput.email} className="form-control" placeholder="E-mail Address" onChange={handleChange} />
        <input type="tel" name="phone" value={formInput.phone} className="form-control" placeholder="Phone Number" onChange={handleChange} />
        <input type="URL" name="imageUrl" value={formInput.imageUrl} className="form-control" placeholder="Profile Image URL" onChange={handleChange} />
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
  }),
};

CreateUserForm.defaultProps = {
  obj: initialState,
};

export default CreateUserForm;
