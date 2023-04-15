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
    return input.trim().toLowerCase() === triggerWord;
  };

  const checkForSolana = (input) => {
    const triggerWord = 'solana';
    return input.trim().toLowerCase() === triggerWord;
  };

  const checkForAvalanche = (input) => {
    const triggerWord = 'avalanche';
    return input.trim().toLowerCase() === triggerWord;
  };

  const checkForArbitrum = (input) => {
    const triggerWord = 'arbitrum';
    return input.trim().toLowerCase() === triggerWord;
  };

  const connectMetaMask = async () => {
    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log("Connected account:", account);
        sendToBackend(account);
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

  async function connectAvalancheCChain() {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const chainParams = {
          chainId: '0xA869', // Avalanche C-Chain Mainnet Chain ID
          chainName: 'Avalanche C-Chain TestNet (Fuji)',
          nativeCurrency: {
            name: 'AVAX',
            symbol: 'AVAX',
            decimals: 18,
          },
          rpcUrls: ['https://ava-testnet.public.blastapi.io/ext/bc/C/rpc'],
          blockExplorerUrls: ['https://testnet.snowtrace.io/'],
        };
        await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [chainParams] });
        console.log('Avalanche C-Chain connected.');

        // Request the connected account
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const publicKey = accounts[0];
        console.log('Connected account:', publicKey);

        // Send the public key to the backend
        sendToBackend(publicKey);
      } catch (error) {
        console.error('Error connecting to Avalanche C-Chain:', error);
      }
    } else {
      console.log('MetaMask is not installed.');
    }
  }



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
      props.onSendMessage(input);
      connectMetaMask();
      sendToBackend(input);
      setInput('');
    } else if (checkForSolana(input)) {
      props.onSendMessage(input);
      connectPhantom();
      sendToBackend(input);
      setInput('');
    } else if (checkForAvalanche(input)) {
      props.onSendMessage(input);
      connectAvalancheCChain();
      sendToBackend(input);
      setInput('');
    }
    else if (checkForArbitrum(input)) {
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

