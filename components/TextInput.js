import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createPost, getPosts, updatePost } from '../api/postsData';
import { getSingleChannel } from '../api/channelData';

const initialState = {
  postContent: '',
};

function TextInput({ postObj, channelObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [posts, setPosts] = useState(initialState);
  const [, setProfile] = useState([]);
  const { user } = useAuth();

  const getAllThePosts = () => {
    getPosts().then((post) => {
      setPosts(post);
    });
  };

  useEffect(() => {
    getAllThePosts();
    getPosts(user.uid).then(setProfile);
    if (postObj.firebaseKey) setFormInput(postObj);

    getSingleChannel().then(channelObj);
  }, [postObj, user, channelObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.firebaseKey) {
      updatePost(formInput).then(() => getAllThePosts());
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
        getAllThePosts();
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
            Send
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
};

TextInput.defaultProps = {
  postObj: initialState,
  channelObj: initialState,
};

export default TextInput;
