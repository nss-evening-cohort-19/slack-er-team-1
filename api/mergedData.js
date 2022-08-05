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

export default getMessagesOnPost;
