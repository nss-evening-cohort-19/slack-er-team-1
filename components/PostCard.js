/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import getMessagesOnPost from '../api/mergedData';
import Thread from './Thread';
import { deleteSinglePost } from '../api/postsData';
import { useAuth } from '../utils/context/authContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PostCard({ postObj, onUpdate, setMessageToEdit }) {
  const handleDelete = () => {
    if (window.confirm('Delete post?')) {
      deleteSinglePost(postObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const clickHandler = () => {
    setMessageToEdit(postObj);
    handleClose();
  };

  return (
    <div>
      <div className="postCard">
        <div className="userProfileHover">
          <img width="30px" height="30px" src={postObj.posterPhoto} alt="user" className="user-icon" />
        </div>
        <div className="postContentAlign">
          <div className="panel-heading">{postObj.posterName} {postObj.timeStamp}</div>
          <br />
          <div className="panel-body-content">{postObj.postContent}</div>
          {/* <div className="panel-body-reactions">{postObj.reactions}</div> */}
          <br />
          <div className="panel-body-replies">
            <Thread postObj={postObj} messageNum={messageNum} messages={messages} onUpdate={showMessageDetails} />
          </div>
        </div>
        <div className="postBtnDiv">
          <Button className={postObj.uid !== user.uid ? 'noShow' : 'morePostInfoBtn'} onClick={handleShow}>
            ...
          </Button>
          <Modal className="postEditModal" show={show} onHide={handleClose}>
            <Modal.Header className="modalHeader" closeButton>
              <Button className="editMessage" onClick={clickHandler}>
                Edit
              </Button>
              <Button className="deleteMessage" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Header>
          </Modal>
        </div>

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
      uid: PropTypes.string,
    },
  ),
  onUpdate: PropTypes.func.isRequired,
  setMessageToEdit: PropTypes.func,
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
  setMessageToEdit: () => {},
};
