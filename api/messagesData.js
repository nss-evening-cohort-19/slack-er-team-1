import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMessages = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/messages.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getMessagesByPost = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/messages.json?orderBy="postId"&equalTo="${firebaseKey}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createMessages = (messageObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/messages.json?`, messageObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/messages/${response.data.name}.json`, payload).then(() => {
        getMessages(messageObj.uid).then((messageArray) => resolve(messageArray));
      });
    }).catch((error) => reject(error));
});

const getSingleMessage = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/messages/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSingleMessage = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/messages/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateMessage = (messageObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/messages/${messageObj.firebaseKey}.json`, messageObj)
    .then(() => getMessages(messageObj.uid)).then(resolve)
    .catch(reject);
});

export {
  getMessages,
  getMessagesByPost,
  createMessages,
  getSingleMessage,
  updateMessage,
  deleteSingleMessage,
};
