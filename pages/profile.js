/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deleteSingleUser, getUsersByUid } from '../api/userData';
import Sidebar from '../components/Sidebar';
import User from '../components/User';
import { useAuth } from '../utils/context/authContext';

export default function Profile({ onUpdate }) {
  const [member, setMember] = useState([]);
  const { user } = useAuth();
  const deleteThisUser = () => {
    if (window.confirm(`Delete ${user.displayName}?`)) {
      deleteSingleUser(member.uid).then(() => onUpdate());
    }
  };
  useEffect(() => {
    getUsersByUid(user.uid).then(setMember);
    console.warn(member);
  }, []);
  return (
    <>
      <Sidebar />
      <div className="profile">
        {member?.map((memberProfile) => (
          <>
            <User userObj={memberProfile} />
            <Link passHref href={`/users/edit/${memberProfile.firebaseKey}`}>
              <button type="button" className="btn btn-primary">
                Edit Profile
              </button>
            </Link>
            <button type="button" className="btn btn-danger" onClick={deleteThisUser}>
              Delete Profile
            </button>
          </>
        ))}
      </div>
    </>
  );
}

Profile.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
