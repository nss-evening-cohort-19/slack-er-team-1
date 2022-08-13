// import { getSingleChannel } from './channelData';
import { getMessagesByPost } from './messagesData';
import { getSinglePost } from './postsData';
// import { getJoinChannels } from './joinData';

// GET COMMENTS BY THREAD
const getMessagesOnPost = (postFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSinglePost(postFirebaseKey),
    getMessagesByPost(postFirebaseKey)])
    .then(([postObj, messagesArray]) => {
      resolve({ ...postObj, messages: messagesArray });
    }).catch((error) => reject(error));
});

// JOIN A CHANNEL
// const joiningChannel = (uid) => new Promise((resolve, reject) => {
//   getJoinChannels(uid).then((joinArray) => {
//     const userChannel = joinArray.map((joinObj) => getSingleChannel(joinObj.channelId)).then(() => {
//       resolve(userChannel);
//     });
//   }).catch(reject);
// });

export default {
  getMessagesOnPost,
};
