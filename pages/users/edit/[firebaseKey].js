import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleUser } from '../../../api/userData';
import CreateUserForm from '../../../components/CreateUserForm';

export default function EditUser() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  console.warn(editUser);

  useEffect(() => {
    getSingleUser(firebaseKey).then(setEditUser);
  }, [firebaseKey]);
  return (
    <CreateUserForm obj={editUser} />
  );
}
