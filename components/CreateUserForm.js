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

  useEffect(() => {
    getUsers(user.uid).then(setProfile);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormInput((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

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
    <form onSubmit={handleSubmit} />
  );
}

CreateUserForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    tagline: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.number,
    imageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CreateUserForm.defaultProps = {
  obj: initialState,
};

export default CreateUserForm;
