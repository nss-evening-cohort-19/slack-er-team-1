/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getMessagesOnPost from '../api/mergedData';
import Thread from './Thread';
import { deleteSinglePost } from '../api/postsData';

export default function PostCard({ postObj, onUpdate }) {
  const handleDelete = () => {
    if (window.confirm('Delete post?')) {
      deleteSinglePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };
  const [messageNum, setMessageNum] = useState(0);
  const [messages, setMessages] = useState([]);
  const showMessageDetails = () => {
    getMessagesOnPost(postObj.firebaseKey).then((postsMessages) => {
      setMessageNum(postsMessages.messages.length);
      setMessages(postsMessages.messages);
    });
  };
  useEffect(() => {
    showMessageDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="panel panel-default postCard">
        <div className="gutter">
          <div className="userProfileHover">
            <img width="30px" height="30px" src={postObj.posterPhoto} alt="user" className="user-icon" />
          </div>
        </div>
        <div className="panel-heading">{postObj.posterName} {postObj.timeStamp}</div>
        <div className="panel-body">{postObj.postContent}</div>
        <div className="panel-body">{postObj.reactions}</div>
        <div className="panel-body">
          <Thread postObj={postObj} messageNum={messageNum} messages={messages} onUpdate={showMessageDetails} />
          Replies
        </div>
        <button type="button" className="editMessage">Edit Message</button>
        <button type="button" onClick={handleDelete} className="deleteMessage">Delete Message</button>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape(
    {
      firebaseKey: PropTypes.string,
      posterPhoto: PropTypes.string,
      posterName: PropTypes.string,
      timeStamp: PropTypes.string,
      postContent: PropTypes.string,
      reactions: PropTypes.string,
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
