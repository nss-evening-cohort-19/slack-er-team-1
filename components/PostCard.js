import { React } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { deleteSinglePost } from '../api/postsData';

export default function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();

  const handleDelete = () => {
    if (window.confirm('Delete post?')) {
      console.warn(postObj);
      deleteSinglePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <div className="panel panel-default postCard">
        <div className="gutter">
          <div className="userProfileHover">
            <Image width="30px" height="30px" src={user.photoURL} alt="user" className="user-icon" />
          </div>
        </div>
        <div className="panel-heading">{postObj.posterName} {postObj.timeStamp}</div>
        <div className="panel-body">{postObj.postContent}</div>
        <div className="panel-body">{postObj.reactions}</div>
        <div className="panel-body">Replies</div>
        <button type="button" className="editMessage">Edit Message</button>
        <button type="button" onClick={handleDelete} className="deleteMessage">Delete Message</button>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape(
    {
      posterName: PropTypes.string,
      timeStamp: PropTypes.string,
      postContent: PropTypes.string,
      reactions: PropTypes.string,
      firebaseKey: PropTypes.string,
    },
  ),
  onUpdate: PropTypes.func.isRequired,
};

PostCard.defaultProps = {
  postObj: PropTypes.shape(
    {
      posterName: '',
      timeStamp: '',
      content: '',
      reactions: '',
    },
  ),
};
