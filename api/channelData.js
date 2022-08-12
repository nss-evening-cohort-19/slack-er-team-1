import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL CHANNELS
const getChannels = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/channels.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET ALL CHANNELS BY UID
const getChannelsByUid = (uid) => new Promise((resolve, reject) => {
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
    .then((response) => {
      if (response.data) {
        resolve(response.data);
      } else {
        resolve({});
      }
    })
    .catch(reject);
});

// CREATE CHANNEL
const createChannel = (newChannelObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/channels.json`, newChannelObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/channels/${response.data.name}.json`, body)
        .then(() => {
          getChannelsByUid(newChannelObj).then(resolve);
        });
    })
    .catch(reject);
});

// UPDATE CHANNEL
const updateUidOfChannel = (userUid, channelObj) => new Promise((resolve, reject) => {
  const payload = { uid: userUid };
  axios.patch(`${dbUrl}/channels/${channelObj?.firebaseKey}.json`, payload).then(() => {
    getChannelsByUid(channelObj?.uid).then((channelArray) => resolve(channelArray));
  })
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
  getChannelsByUid,
  getSingleChannel,
  createChannel,
  updateUidOfChannel,
  deleteChannel,
};
