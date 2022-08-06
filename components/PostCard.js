import { React } from 'react';
import PropTypes from 'prop-types';

export default function PostCard({ postObj }) {
  return (
    <div>
      <div className="panel panel-default postCard">
        <div className="gutter">
          <div className="userProfileHover">
            <button type="button" className="photoBtn">{postObj.posterPhoto}</button>
          </div>
        </div>
        <div className="panel-heading">{postObj.posterName} {postObj.timeStamp}</div>
        <div className="panel-body">{postObj.content}</div>
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
      posterPhoto: PropTypes.string,
      posterName: PropTypes.string,
      timeStamp: PropTypes.string,
      content: PropTypes.string,
      reactions: PropTypes.string,
    },
  ),
};

PostCard.defaultProps = {
  postObj: PropTypes.shape(
    {
      posterPhoto: '',
      posterName: '',
      timeStamp: '',
      content: '',
      reactions: '',
    },
  ),
};
