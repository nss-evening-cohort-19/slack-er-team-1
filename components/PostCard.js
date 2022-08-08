import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
import PropTypes from 'prop-types';
import getMessagesOnPost from '../api/mergedData';
// import { useAuth } from '../utils/context/authContext';
import Thread from './Thread';

export default function PostCard({ postObj }) {
  // const { user } = useAuth();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="panel panel-default postCard">
        <div className="gutter">
          {/* <div className="userProfileHover">
            <Image width="30px" height="30px" src={user.photoURL} alt="user" className="user-icon" />
          </div> */}
        </div>
        <div className="panel-heading">{postObj.posterName} {postObj.timeStamp}</div>
        <div className="panel-body">{postObj.postContent}</div>
        <div className="panel-body">{postObj.reactions}</div>
        <div className="panel-body">Replies</div>
        <button type="button" className="editMessage">Edit Message</button>
        <button type="button" className="deleteMessage">Delete Message</button>
        <div>{messageNum}</div>
        <Thread postObj={postObj} />
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
      posterName: '',
      timeStamp: '',
      content: '',
      reactions: '',
    },
  ),
};
