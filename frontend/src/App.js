import React, { useState } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import InputForm from './components/InputForm';

function App() {

  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  return (
    <div className="App">
      <h1>Chatbot</h1>
      <div className="chat-container">
        <ChatWindow messages={messages} />
        <InputForm onSubmit={addMessage} />
      </div>
    </div>
  );

}

export default App;
