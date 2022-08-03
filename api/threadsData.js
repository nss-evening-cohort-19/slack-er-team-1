import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getThreads = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/threads.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createThread = (threadObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/threads.json?`, threadObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/threads/${response.data.name}.json`, payload).then(() => {
        getThreads(threadObj.uid).then((userArray) => resolve(userArray));
      });
    }).catch((error) => reject(error));
});

const getSingleThread = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/threads/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSingleThread = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/threads/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateThread = (threadObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/threads/${threadObj.firebaseKey}.json`, threadObj)
    .then(() => getThreads(threadObj.uid)).then(resolve)
    .catch(reject);
});

/* placeholder for merge data

const viewThreadDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleThread(firebaseKey)
    .then((threadObj) => {
      getSingleThread(threadObj.firebaseKey)
        .then((singleThreadObj) => {
          resolve({ threadObj, ...singleThreadObj });
        });
    }).catch((error) => reject(error));
}); */

export {
  getThreads,
  createThread,
  getSingleThread,
  deleteSingleThread,
  updateThread,
  // viewThreadDetails,
};
