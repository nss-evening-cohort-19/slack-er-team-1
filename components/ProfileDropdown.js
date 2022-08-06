import React from 'react';
import User from './User';
import { useAuth } from '../utils/context/authContext';

export default function ProfileDropdown() {
  const { user } = useAuth();
  return (
    <div>
      <User image={user.photoURL} email={user.email} name={user.displayName} lastLogin={user.metadata.lastSignInTime} />
    </div>
  );
}