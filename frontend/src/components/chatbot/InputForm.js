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

  const checkForEthereum = (input) => {
    const triggerWord = 'ethereum';
    return input.trim().toLowerCase() === triggerWord.toLowerCase();
  };
  
  const checkForSolana = (input) => {
    const triggerWord = 'solana';
    return input.trim().toLowerCase() === triggerWord.toLowerCase();
  };

  const checkForAvalanche = (input) => {
    const triggerWord = 'avalanche';
    return input.trim().toLowerCase() === triggerWord.toLowerCase();
  }

  const checkForArbitrum = (input) => {
    const triggerWord = 'arbitrum';
    return input.trim().toLowerCase() === triggerWord.toLowerCase();
  }

  const connectMetaMask = async () => {
    if (provider) {
      try {
        const chainId = '0x' + parseInt(5).toString(16); // Avalanche Testnet Chain ID
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
  
        // You can also connect to the account if needed, similar to connectMetaMask
        const accounts = await provider.request({ method: 'eth_requestAccounts' });   
        const account = accounts[0];
        console.log("Connected account:", account);
        sendToBackend(account);
        props.onSendMessage(`Your Ethereum wallet has been connected! Your address in use is ${account}`, 'bot');
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

  async function connectPhantom() {
    // Check if the window.solana object is available
    if (!window.solana) {
      alert('Please install the Phantom wallet to use this feature.');
      return;
    }
  
    // Connect to the Phantom wallet
    const provider = window.solana;
    await provider.connect();
  
    // Get the user's public key
    const publicKey = provider.publicKey.toBase58();
  
    // Log the user's public key to the console
    console.log(`Connected to Phantom wallet with public key: ${publicKey}`);
    sendToBackend(publicKey);
  }

  const connectAvalanche = async () => {
    if (provider) {
      try {
        const chainId = '0x' + parseInt(43113).toString(16); // Avalanche Testnet Chain ID
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
  
        // You can also connect to the account if needed, similar to connectMetaMask
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log("Connected account:", account);
        sendToBackend(account);
        props.onSendMessage(`Your Avalanche wallet has been connected! Your address in use is ${account}`, 'bot');
      } catch (error) {
        console.error(error);
        if (error.code === 4902) {
          console.log('The requested chainId cannot be added.');
        } else {
          console.log('There was an issue switching to the Avalanche network.');
        }
      }
    } else {
      console.log('MetaMask is not installed.');
    }
  };
  
  const connectArbitrum = async () => {
    if (provider) {
      try {
        const chainId = '0x' + parseInt(421613).toString(16); // Avalanche Testnet Chain ID
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
  
        // You can also connect to the account if needed, similar to connectMetaMask
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log("Connected account:", account);
        sendToBackend(account);
        props.onSendMessage(`Your Avalanche wallet has been connected! Your address in use is ${account}`, 'bot');
      } catch (error) {
        console.error(error);
        if (error.code === 4902) {
          console.log('The requested chainId cannot be added.');
        } else {
          console.log('There was an issue switching to the Avalanche network.');
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
    if (checkForEthereum(input)) {
      props.onSendMessage(input, 'user');
      connectMetaMask();
      sendToBackend(input);
      setInput('');
    } else if (checkForSolana(input)) {
      props.onSendMessage(input, 'user');
      connectPhantom();
      sendToBackend(input);
      setInput('');
    } else if (checkForAvalanche(input)) {
        props.onSendMessage(input, 'user');
        connectAvalanche();
        sendToBackend(input);
        setInput('');
    }else if (checkForArbitrum(input)) {
        props.onSendMessage(input, 'user');
        connectArbitrum();
        sendToBackend(input);
        setInput('');
    }else {
      props.onSendMessage(input, 'user');
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
