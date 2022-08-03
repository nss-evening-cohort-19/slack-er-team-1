import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUsers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createUser = (userObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/users.json?`, userObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/users/${response.data.name}.json`, payload).then(() => {
        getUsers(userObj.uid).then((userArray) => resolve(userArray));
      });
    }).catch((error) => reject(error));
});

const getSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/users/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateUser = (userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users/${userObj.firebaseKey}.json`, userObj)
    .then(() => getUsers(userObj.uid)).then(resolve)
    .catch(reject);
});

const viewUserDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleUser(firebaseKey)
    .then((userObj) => {
      getSingleUser(userObj.firebaseKey)
        .then((singleUserObj) => {
          resolve({ userObj, ...singleUserObj });
        });
    }).catch((error) => reject(error));
});

export {
  getUsers,
  createUser,
  getSingleUser,
  deleteSingleUser,
  updateUser,
  viewUserDetails,
};
