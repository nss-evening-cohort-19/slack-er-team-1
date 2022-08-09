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

export default function MessageInput({ messageObj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (messageObj.firebaseKey) setFormInput(messageObj);
  }, [messageObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    onUpdate();
    e.preventDefault();
    if (messageObj.firebaseKey) {
      updateMessage(formInput);
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMessages(payload);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control type="text" name="messageContent" onChange={handleChange} value={formInput.messageContent} placeholder="Reply..." as="textarea" aria-label="With textarea" />
      </InputGroup>
      <Button type="submit">{messageObj.firebaseKey ? 'Edit' : 'Send'} Reply</Button>
    </Form>
  );
}

MessageInput.propTypes = {
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
MessageInput.defaultProps = {
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
