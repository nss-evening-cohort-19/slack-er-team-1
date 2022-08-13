import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { createMessages, updateMessage } from '../api/messagesData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  messageContent: '',
};

export default function MessageInput({ postObj, onUpdate, replyToEdit }) {
  const [formInput, setFormInput] = useState({ messageContent: replyToEdit.messageContent || '' });
  const { user } = useAuth();
  useEffect(() => {
    setFormInput({ messageContent: replyToEdit.messageContent });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replyToEdit]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (replyToEdit.messageContent !== '') {
      const payload = {
        ...replyToEdit,
        ...formInput,
      };
      updateMessage(payload.firebaseKey, payload).then(onUpdate);
      setFormInput(initialState);
    } else {
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
        onUpdate();
        setFormInput(initialState);
      });
    }
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
  onUpdate: PropTypes.func.isRequired,
  replyToEdit: PropTypes.shape({
    firebaseKey: PropTypes.string,
    messageContent: PropTypes.string,
  }),
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
  postObj: PropTypes.shape(
    {
      posterPhoto: '',
      posterName: '',
      timeStamp: '',
      content: '',
      reactions: '',
    },
  ),
  replyToEdit: initialState,
};
