import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getJoinChannels = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/joins.json?orderBy="userId"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createJoinChannel = (newJoinObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/joins.json`, newJoinObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/joins/${response.data.name}.json`, body)
        .then(() => {
          getJoinChannels(newJoinObj).then(resolve);
        });
    })
    .catch(reject);
});

const updateJoinChannel = (joinObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/joins/${joinObj.firebaseKey}.json`, joinObj)
    .then(() => getJoinChannels(joinObj.uid).then(resolve))
    .catch(reject);
});

const deleteJoinChannel = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/joins/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  getJoinChannels,
  createJoinChannel,
  updateJoinChannel,
  deleteJoinChannel,
};
