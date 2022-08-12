import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { createMessages } from '../api/messagesData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  messageContent: '',
};

export default function MessageInput({ postObj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  useEffect(() => {
    onUpdate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      uid: user.uid,
      postId: postObj.firebaseKey,
      timeStamp: new Date().toLocaleString(),
      posterPhoto: user.photoURL,
      posterName: user.displayName,
    };
    onUpdate();
    createMessages(payload).then(() => {
      setFormInput(initialState);
      onUpdate();
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control type="text" name="messageContent" class="messageContent" onChange={handleChange} value={formInput.messageContent} placeholder="Reply..." as="textarea" aria-label="With textarea" />
      </InputGroup>
      <Button className="threadReplyBtn" type="submit" onClick={handleSubmit}>Reply</Button>
    </Form>
  );
}
MessageInput.propTypes = {
  // messageObj: PropTypes.shape(
  //   {
  //     firebaseKey: PropTypes.string,
  //     messageContent: PropTypes.string,
  //     postId: PropTypes.string,
  //     timeStamp: PropTypes.string,
  //     uid: PropTypes.string,
  //   },
  // ),
  onUpdate: PropTypes.func.isRequired,
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
MessageInput.defaultProps = {
  // messageObj: PropTypes.shape(
  //   {
  //     firebaseKey: '',
  //     messageContent: '',
  //     postId: '',
  //     timeStamp: '',
  //     uid: '',
  //   },
  // ),
  postObj: PropTypes.shape(
    {
      posterPhoto: '',
      posterName: '',
      timeStamp: '',
      content: '',
      reactions: '',
    },
  ),
  // messages: PropTypes.arrayOf(PropTypes.shape({
  //   firebase: '',
  //   messageContent: '',
  //   postId: '',
  //   uid: '',
  // })),
};
