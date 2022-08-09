/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

import { useAuth } from '../utils/context/authContext';
import { deleteSingleMessage, getSingleMessage } from '../api/messagesData';

export default function MessageCard({ messageObj, onUpdate }) {
  const { user } = useAuth();
  const handleDelete = () => {
    deleteSingleMessage(messageObj.firebaseKey).then(() => onUpdate());
  };
  const editMessage = () => {
    getSingleMessage(messageObj.firebaseKey).then(() => onUpdate());
    console.warn(messageObj.firebaseKey);
  };
  return (
    <div>
      <div className="panel panel-default postCard">
        <div className="gutter">
          <div className="userProfileHover">
            <img width="30px" height="30px" src={user.photoURL} alt="user" className="user-icon" />
          </div>
        </div>
        <div className="panel-heading">{user.displayName} {messageObj.timeStamp}</div>
        <div className="panel-body">{messageObj.messageContent}</div>
        {
        user.uid === messageObj.uid
          ? (
            <>
              <button type="button" className="editMessage" onClick={editMessage}>Edit Reply</button>
              <button type="button" className="deleteMessage" onClick={handleDelete}>Delete Reply</button>
            </>
          )
          : (
            ''
          )
        }
      </div>
    </div>
  );
}

MessageCard.propTypes = {
  messageObj: PropTypes.shape(
    {
      firebaseKey: PropTypes.string,
      messageContent: PropTypes.string,
      postId: PropTypes.string,
      timeStamp: PropTypes.string,
      uid: PropTypes.string,
    },
  ),
  onUpdate: PropTypes.func.isRequired,
};
MessageCard.defaultProps = {
  messageObj: PropTypes.shape(
    {
      firebaseKey: '',
      messageContent: '',
      postId: '',
      timeStamp: '',
      uid: '',
    },
  ),
};
