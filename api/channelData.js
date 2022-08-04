import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL CHANNELS BY UID
const getChannels = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/channels.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET SINGLE CHANNEL
const getSingleChannel = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/channels/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// CREATE CHANNEL
const createChannel = (newChannelObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/channels.json`, newChannelObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/channels/${response.data.name}.json`, body)
        .then(() => {
          getChannels(newChannelObj).then(resolve);
        });
    })
    .catch(reject);
});

// UPDATE CHANNEL
const updateChannel = (channelObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/channels/${channelObj.firebaseKey}.json`, channelObj)
    .then(() => getChannels(channelObj.uid).then(resolve))
    .catch(reject);
});

// DELETE CHANNEL
const deleteChannel = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/channels/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  getChannels,
  getSingleChannel,
  createChannel,
  updateChannel,
  deleteChannel,
};
