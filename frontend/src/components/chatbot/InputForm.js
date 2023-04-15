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
        // You can now use the account for further actions
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkForTriggerWord(input)) {
      props.onSendMessage(input);
      connectMetaMask();
      setInput('');
    } else {
      props.onSendMessage(input);
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
