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
const joiningChannel = (channelFbKey, userUid) => new Promise((resolve, reject) => {
  getSingleChannel(channelFbKey).then((singChannelObj) => {
    createChannel(singChannelObj).then((channelObj) => {
      axios.patch(`${dbUrl}/channels/${channelObj.firebaseKey}.json`, userUid).then(() => {
        getChannelsByUid(channelObj.uid).then((channelArray) => resolve(channelArray));
      });
    });
  })
    .catch(reject);
});

export {
  getMessagesOnPost,
  joiningChannel,
};
