import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Thread({ postObj }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <Button variant="primary" onClick={toggleShow} className="me-2">
        Hello
      </Button>
      <Offcanvas show={show} placement="end" onHide={handleClose} scroll="true">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Thread insert channel name</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="message-container">
            <div className="post-start">
              <span className="profile-hover-card">
                <button type="button" className="avatar-icon-card">
                  <span className="avatar-img-container">
                    <span>User Photo</span>
                  </span>
                </button>
              </span>
            </div>
            <div className="post-end">
              <span className="post-user">{postObj.posterName}</span>
              <span className="time-stamp">{postObj.timeStamp}</span>
              <div className="post-content-block">
                <p className="post-content">{postObj.postContent}</p>
              </div>
            </div>
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
  // messages: PropTypes.arrayOf(PropTypes.shape(
  //   {
  //     firebaseKey: '',
  //     messageContent: '',
  //     postId: '',
  //     timeStamp: '',
  //   },
  // )),
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
  // messages: PropTypes.arrayOf(PropTypes.shape(
  //   {
  //     firebaseKey: '',
  //     messageContent: '',
  //     postId: '',
  //     timeStamp: '',
  //   },
  // )),
};
