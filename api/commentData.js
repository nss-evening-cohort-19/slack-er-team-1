import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getComments = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/comments.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createComments = (commentObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/comments.json?`, commentObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/comments/${response.data.name}.json`, payload).then(() => {
        getComments(commentObj.uid).then((commentArray) => resolve(commentArray));
      });
    }).catch((error) => reject(error));
});

const getSingleComment = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/comments/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSingleComment = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/comments/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateComment = (commentObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/comments/${commentObj.firebaseKey}.json`, commentObj)
    .then(() => getComments(commentObj.uid)).then(resolve)
    .catch(reject);
});

/* placeholder for merged data

const viewCommentDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleComment(firebaseKey)
    .then((commentObj) => {
      getSingleComment(commentObj.firebaseKey)
        .then((singleCommentObj) => {
          resolve({ commentObj, ...singleCommentObj });
        });
    }).catch((error) => reject(error));
}); */

export {
  getComments,
  createComments,
  getSingleComment,
  deleteSingleComment,
  updateComment,
  // viewCommentDetails,
};
