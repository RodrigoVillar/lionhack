import React, { useState, useEffect } from 'react';
import InputForm from './components/chatbot/InputForm.js';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([{ text: 'Hello! What network would you like to use today?', sender: 'bot' }]);

  const handleSendMessage = (messageText, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text: messageText, sender }]);
  };

  return (
    <div className="chatbot-container">
      <div className="message-list">
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
