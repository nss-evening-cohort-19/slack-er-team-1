/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MessageCard from './MessageCard';
import MessageInput from './MessageInput';

export default function Thread({
  postObj, messageNum, onUpdate, messages,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const render = () => {
    onUpdate();
  };
  useEffect(() => {
    render();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Button className="repliesNumBtn" onClick={toggleShow}>
        {messageNum} replies
      </Button>
      <Offcanvas className="threadStyle" show={show} placement="end" onHide={handleClose} scroll="true">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Thread insert channel name</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="message-container">
            <div className="post-start">
              <span className="profile-hover-card">
                <span className="avatar-img-container">
                  <img width="30px" height="30px" src={postObj.posterPhoto} alt="user" className="user-icon" />
                </span>
              </span>
            </div>
            <div className="post-end">
              <span className="post-user">{postObj.posterName}</span>
              <span className="time-stamp">{postObj.timeStamp}</span>
              <div className="post-content-block">
                <p className="post-content">{postObj.postContent}</p>
              </div>
            </div>
            <div className="replies-count">
              <span>{messageNum} replies</span>
              <hr className="divider-line" />
            </div>
          </div>
          <div className="comment-card-container">
            {messages.map((message) => (
              <MessageCard key={message.firebaseKey} messageObj={message} messages={messages} onUpdate={render} />
            ))}
            <MessageInput postObj={postObj} onUpdate={render} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
Thread.propTypes = {
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
  messageNum: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    firebase: PropTypes.string,
    messageContent: PropTypes.string,
    postId: PropTypes.string,
    uid: PropTypes.string,
  })),
};

Thread.defaultProps = {
  postObj: PropTypes.shape(
    {
      posterPhoto: '',
      posterName: '',
      timeStamp: '',
      content: '',
      reactions: '',
    },
  ),
  messageNum: PropTypes.number,
  messages: PropTypes.arrayOf(PropTypes.shape({
    firebase: '',
    messageContent: '',
    postId: '',
    uid: '',
  })),
};
