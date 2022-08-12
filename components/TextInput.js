/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createPost, getPosts, updatePost } from '../api/postsData';
import { getSingleChannel } from '../api/channelData';

const initialState = {
  postContent: '',
};

function TextInput({
  postObj, channelObj, messageToEdit, onUpdate,
}) {
  const [formInput, setFormInput] = useState({ postContent: messageToEdit.postContent || '' });
  const [posts, setPosts] = useState(initialState);
  const [, setProfile] = useState([]);
  const { user } = useAuth();

  const getAllThePosts = () => {
    getPosts().then((post) => {
      setPosts(post);
    });
  };

  useEffect(() => {
    setFormInput({ postContent: messageToEdit.postContent });
  }, [messageToEdit]);

  useEffect(() => {
    getAllThePosts();
    getPosts(user.uid).then(setProfile);

    onUpdate();
    if (postObj.firebaseKey) setFormInput(postObj);
    getSingleChannel().then(channelObj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageToEdit) {
      const payload = {
        ...messageToEdit,
        ...formInput,
      };
      updatePost(payload.firebaseKey, payload).then(() => getAllThePosts());
      setFormInput(initialState);
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        timeStamp: new Date().toLocaleString(),
        posterPhoto: user.photoURL,
        posterName: user.displayName,
        channelId: channelObj.firebaseKey,
      };
      createPost(payload).then(() => {
        onUpdate();
        setFormInput(initialState);
      });
    }
  };

  return (
    <div className="mainPostContainer">
      <form className="commentInputContainer" onSubmit={handleSubmit}>
        <input required type="text" name="postContent" value={formInput?.postContent} obj={posts} className="form-control postContentDiv" placeholder="Message Channel" onChange={handleChange} />
        <div className="postSubmitToolbar">
          <div className="leftToolbar" />
          <button type="submit" className="submitPostBtn">
            <img src="https://cdn-icons-png.flaticon.com/512/3884/3884623.png" alt="paper-plane" className="icon" />
          </button>
        </div>
      </form>
    </div>
  );
}

TextInput.propTypes = {
  postObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    timeStamp: PropTypes.string,
    postContent: PropTypes.string,
    channelId: PropTypes.string,
    tagId: PropTypes.string,
    uid: PropTypes.string,
    posterPhoto: PropTypes.string,
    posterName: PropTypes.string,
    reactions: PropTypes.string,
  }),
  channelObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
  messageToEdit: PropTypes.shape({
    firebaseKey: PropTypes.string,
    postContent: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

TextInput.defaultProps = {
  postObj: initialState,
  channelObj: initialState,
  messageToEdit: initialState,
  onUpdate: () => {},
};

export default TextInput;
