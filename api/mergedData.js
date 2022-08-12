import axios from 'axios';
import { createChannel, getChannelsByUid, getSingleChannel } from './channelData';
import { getMessagesByPost } from './messagesData';
import { getSinglePost } from './postsData';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET COMMENTS BY THREAD
const getMessagesOnPost = (postFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSinglePost(postFirebaseKey),
    getMessagesByPost(postFirebaseKey)])
    .then(([postObj, messagesArray]) => {
      resolve({ ...postObj, messages: messagesArray });
    }).catch((error) => reject(error));
});

// JOIN A CHANNEL
const joiningChannel = (channelFbKey, userId) => new Promise((resolve, reject) => {
  getSingleChannel(channelFbKey).then((response) => {
    axios.patch(`${dbUrl}/channels/${response.firebaseKey}.json`, userId).then((singChannelObj) => {
      createChannel(singChannelObj).then(() => {
        getChannelsByUid(response.uid).then((channelArray) => resolve(channelArray));
      });
    });
  })
    .catch(reject);
});

export {
  getMessagesOnPost,
  joiningChannel,
};
