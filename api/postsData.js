import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPosts = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/posts.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getAllPosts = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/posts.json?`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createPost = (postObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/posts.json?`, postObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/posts/${response.data.name}.json`, payload).then(() => {
        getPosts(postObj.uid).then((userArray) => resolve(userArray));
      });
    }).catch((error) => reject(error));
});

const getSinglePost = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/posts/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSinglePost = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/posts/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updatePost = (postObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/posts/${postObj.firebaseKey}.json`, postObj)
    .then(() => getPosts(postObj.uid)).then(resolve)
    .catch(reject);
});

const getPostsByChannel = (postObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/posts/${postObj.channelId}.json`, postObj)
    .then(() => getPosts(postObj.uid)).then(resolve)
    .catch(reject);
});
export {
  getPosts,
  createPost,
  getSinglePost,
  deleteSinglePost,
  updatePost,
  getPostsByChannel,
  getAllPosts,
};
