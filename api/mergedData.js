import { createChannel, getSingleChannel } from './channelData';
import { getMessagesByPost } from './messagesData';
import { getSinglePost } from './postsData';

// GET COMMENTS BY THREAD
const getMessagesOnPost = (postFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSinglePost(postFirebaseKey),
    getMessagesByPost(postFirebaseKey)])
    .then(([postObj, messagesArray]) => {
      resolve({ ...postObj, messages: messagesArray });
    }).catch((error) => reject(error));
});

// JOIN A CHANNEL
const joiningChannel = (channelFbKey) => new Promise((resolve, reject) => {
  getSingleChannel(channelFbKey).then((singChannelObj) => {
    createChannel(singChannelObj).then(resolve);
  })
    .catch(reject);
});

export {
  getMessagesOnPost,
  joiningChannel,
};
