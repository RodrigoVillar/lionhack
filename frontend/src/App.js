import React, { useState, useEffect, useRef } from 'react';
import InputForm from './components/chatbot/InputForm.js';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([{ text: 'Hello! What network would you like to use today?', sender: 'bot' }]);
  const messageListRef = useRef(null);

  const handleSendMessage = (messageText, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text: messageText, sender }]);
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="header">
        <h1>ChainChat</h1>
      </div>
      <div className="message-list" ref={messageListRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <InputForm onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
