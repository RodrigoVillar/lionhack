import React, { useState } from 'react';
import InputForm from './InputForm';
import MessageList from './MessageList';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text, sender) => {
    setMessages([...messages, { text, sender }]);
  };

  props.onSendMessage('Hello! What network would you like to use today?', 'bot');


  return (
    <div className="chatbot-container">
      <MessageList messages={messages} />
      <InputForm onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
