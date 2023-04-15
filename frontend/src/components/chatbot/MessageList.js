import React, { useEffect, useRef } from 'react';
import './MessageList.css';

const MessageList = (props) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [props.messages]);

  return (
    <div className="message-list">
      {props.messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
        >
          {message.text}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
