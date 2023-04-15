import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import './InputForm.css';

const InputForm = (props) => {
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      const detectedProvider = await detectEthereumProvider();
      if (detectedProvider) {
        setProvider(detectedProvider);
      } else {
        console.log('Please install MetaMask!');
      }
    };
    initProvider();
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const checkForTriggerWord = (input) => {
    const triggerWord = 'connect';
    return input.trim().toLowerCase() === triggerWord;
  };

  const connectMetaMask = async () => {
    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log("Connected account:", account);
      } catch (err) {
        if (err.code === 4001) {
          console.log('User rejected the request.');
        } else {
          console.error(err);
        }
      }
    } else {
      console.log('MetaMask is not installed.');
    }
  };

  //   const sendToBackend = async (message) => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/messages', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ message }),
  //       });

  //       const data = await response.json();
  //       console.log('Response from backend:', data);
  //     } catch (error) {
  //       console.error('Error sending message to backend:', error);
  //     }
  //   };

  const sendToBackend = async (message) => {
    try {
      const response = await fetch('http://localhost:5001/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      console.log('Response from backend:', data);
    } catch (error) {
      console.error('Error sending message to backend:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkForTriggerWord(input)) {
      props.onSendMessage(input);
      connectMetaMask();
      sendToBackend(input);
      setInput('');
    } else {
      props.onSendMessage(input);
      sendToBackend(input);
      setInput('');
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <button className="send-button" type="submit">Send</button>
    </form>
  );
};

export default InputForm;
