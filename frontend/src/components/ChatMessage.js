import React from 'react';

function ChatMessage({ message }) {
  return (
    <div className={`chat-message ${message.sender}`}>
      <div className="message-content">{message.text}</div>
    </div>
  );
}

export default ChatMessage;
