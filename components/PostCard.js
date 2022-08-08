import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getMessagesOnPost from '../api/mergedData';
import Thread from './Thread';

export default function PostCard({ postObj }) {
  const [messages, setMessages] = useState([]);
  const [messageNum, setMessageNum] = useState(0);
  const showMessageDetails = () => {
    getMessagesOnPost(postObj.firebaseKey).then((arrayObjects) => {
      setMessageNum(arrayObjects.messages.length);
      setMessages(messages);
    });
  };
  useEffect(() => {
    showMessageDetails();
  }, []);
  return (
    <div>
      <div className="panel panel-default postCard">
        <div className="gutter">
          <div className="userProfileHover">
            <button type="button" className="photoBtn">{postObj.posterPhoto}</button>
          </div>
        </div>
        <div className="panel-heading">{postObj.posterName} {postObj.timeStamp}</div>
        <div className="panel-body">{postObj.postContent}</div>
        <div className="panel-body">{postObj.reactions}{messageNum}</div>
        <div className="panel-body">
          <Thread postObj={postObj} messages={messages} messageNum={messageNum} />
        </div>
        <button type="button" className="editMessage">Edit Message</button>
        <button type="button" className="deleteMessage">Delete Message</button>
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
