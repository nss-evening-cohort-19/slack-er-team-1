import { React } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

export default function PostCard({ postObj }) {
  const { user } = useAuth();
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
        <button type="button" className="deleteMessage">Delete Message</button>
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
    },
  ),
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
