import React from 'react';

function TextInput() {
  return (
    <div className="commentInputContainer">
      <input className="commentInput" type="text" />
      <button type="submit">+</button>
    </div>
  );
}

export default TextInput;
