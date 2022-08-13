/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getUsersByUid } from '../api/userData';
import CreateUserForm from '../components/CreateUserForm';
import Sidebar from '../components/Sidebar';
import User from '../components/User';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const [member, setMember] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getUsersByUid(user.uid).then(setMember);
  }, []);

  return (
    <div className="profilePageDiv">
      <Sidebar className="profileSidebar" />
      <div className="mainProfilePage">
        <div className="profile">
          {member?.map((memberProfile) => (
            <>
              <User userObj={memberProfile} />
              <Link passHref href={`/users/edit/${memberProfile.firebaseKey}`}>
                <Button type="button" className={memberProfile.uid !== user.uid ? 'noShow' : ''} variant="outline-success">
                  Edit Profile
                </Button>
              </Link>
              <CreateUserForm className={memberProfile.uid === user.uid ? 'noShow' : ''} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
