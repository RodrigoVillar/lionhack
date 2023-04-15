import React, { useState } from 'react';
import './App.css';
import InputForm from './components/chatbot/InputForm';
import MessageList from './components/chatbot/MessageList';
import Chatbot from './components/chatbot/Chatbot'

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);
    // Add your logic for the chatbot response here
  };

  return (
    <div className="App">
      <div className="chat-container">
        <MessageList messages={messages} />
        <InputForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;