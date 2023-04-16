import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import './InputForm.css';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { Contract } from 'ethers';
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json';

const UNISWAP_GOERLI_ROUTER_ADDR = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

window.Buffer = Buffer;

const InputForm = (props) => {
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState(null);
  const [responseData, setResponseData] = useState(null);


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

  const checkForTransfer = () => {
    console.log("we're checking")
    console.log(responseData)
    return responseData['type'] === "transfer";
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
        const chainId = '0x' + parseInt(421613).toString(16); // Arbitrum Testnet Chain ID
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });

        // You can also connect to the account if needed, similar to connectMetaMask
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log("Connected account:", account);
        sendToBackend(account);
        props.onSendMessage(`Your Arbitrum wallet has been connected! Your address in use is ${account}`, 'bot');
      } catch (error) {
        console.error(error);
        if (error.code === 4902) {
          console.log('The requested chainId cannot be added.');
        } else {
          console.log('There was an issue switching to the Arbitrum network.');
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
      return data; // return the response data
    } catch (error) {
      console.error('Error sending message to backend:', error);
    }
  };



  const sendTransaction = async (transactionDetails, chainnum) => {
    console.log("loading");
    console.log(transactionDetails);
    if (provider) {
      try {
        const chainId = '0x' + parseInt(chainnum).toString(16); // Ethereum Mainnet Chain ID
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
        console.log("loading");
        console.log(transactionDetails);
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const from = accounts[0];
        const { to, value, gasPrice, gasLimit, data } = transactionDetails;

        const tx = {
          from,
          to,
          value,
          // gasPrice,
          gasLimit,
          data,
        };
        //console.log("this is the {")
        const txHash = await provider.request({ method: 'eth_sendTransaction', params: [tx] });
        console.log('Transaction hash:', txHash);
        props.onSendMessage(`Transaction submitted! Transaction hash: ${txHash}`, 'bot');
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

  const sendSolanaTransaction = async (transactionDetails) => {
    const cluster = 'https://api.devnet.solana.com'; // Solana devnet
    const connection = new Connection(cluster, 'confirmed');
    const { senderAddress, receiverAddress, amount } = transactionDetails

    if (window.solana && window.solana.isPhantom) {
      try {
        // Connect to Phantom wallet
        const isConnected = await window.solana.connect();
        if (!isConnected) {
          console.log('Failed to connect to Phantom wallet');
          return;
        }

        // Get sender's public key from Phantom
        const senderPublicKey = new PublicKey(senderAddress);
        // Get the recipient's public key
        const recipientPublicKey = new PublicKey(receiverAddress);

        // Create the transaction instruction
        const instruction = SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: recipientPublicKey,
          lamports: Math.floor(amount), // Convert amount to lamports
        });

        // Create the transaction and add the instruction
        const transaction = new Transaction().add(instruction);

        // Set the transaction's recentBlockhash and signers
        transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        transaction.setSigners(senderPublicKey);

        // Request Phantom to sign the transaction
        const signedTransaction = await window.solana.signTransaction(transaction);

        // Send the signed transaction
        const txid = await connection.sendRawTransaction(signedTransaction.serialize());

        console.log('Transaction response:', txid);
        props.onSendMessage(`Transaction submitted! Transaction hash: ${txid}`, 'bot');
      } catch (err) {
        console.error('Error sending transaction:', err);
      }
    } else {
      console.log('Phantom wallet is not installed.');
    }
  };

  const sendSwap = async (transactionDetails, chainnum) => {
    console.log("loading");
      console.log(transactionDetails);
      if (provider) {
        try {
          const chainId = '0x' + parseInt(chainnum).toString(16); // Ethereum Mainnet Chain ID
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
          });
          console.log("loading");
          console.log(transactionDetails);
          const accounts = await provider.request({ method: 'eth_requestAccounts' });
          const from = accounts[0];
          //NEED TO INPUT TESTNET TOKEN CONTRACTS HERE
          const currency1addr = ''
          const currency2addr = ''
          const path = [currency1,currency2];
          const recipient = account[0];

          const { currency1, currency2} = transactionDetails;
  
          const tx = {
            currency1,
            currency2,
          };
  
          const txHash = await provider.request({ method: 'eth_sendTransaction', params: [tx] });
          console.log('Transaction hash:', txHash);
          props.onSendMessage(`Transaction submitted! Transaction hash: ${txHash}`, 'bot');
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

  async function sendSwap(tokenIn, tokenOut, amountIn, amountOutMin) {
    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const from = accounts[0];
        const signer = provider.getSigner();
  
        const deadline = Math.floor(Date.now() / 1000) + 60 * 1; // 1 minute from the current Unix timestamp
        const path = [tokenIn, tokenOut];
  
        const uniswapRouter = new Contract(UNISWAP_ROUTER_ADDRESS, IUniswapV2Router02ABI, signer);
  
        const tx = await uniswapRouter.swapExactTokensForTokens(
          amountIn,
          amountOutMin,
          path,
          from,
          deadline
        );
  
        await tx.wait();
        console.log('Swap transaction hash:', tx.hash);
        props.onSendMessage(`Swap transaction submitted! Transaction hash: ${tx.hash}`, 'bot');
      } catch (err) {
        console.error('Error executing swap:', err);
      }
    } else {
      console.log('MetaMask is not installed.');
    }
  }






  const handleSubmit = async (event) => {
    setInput('');
    props.onSendMessage(input, 'user');
    event.preventDefault();

    const newData = await sendToBackend(input); // store the response data directly in a variable
    console.log("already analyzed data");
    console.log(newData);

    if (checkForEthereum(input)) {
      //props.onSendMessage(input, 'user');
      await connectMetaMask();
      setInput('');
    } else if (checkForSolana(input)) {
      //props.onSendMessage(input, 'user');
      await connectPhantom();
      setInput('');
    } else if (checkForAvalanche(input)) {
      //props.onSendMessage(input, 'user');
      await connectAvalanche();
      setInput('');
    } else if (checkForArbitrum(input)) {
      //props.onSendMessage(input, 'user');
      await connectArbitrum();
      setInput('');
    } else if (newData['type'] === "transfer") { // use the newData variable directly
      await sendTransaction(newData, parseInt(newData['chain']));
    } else if (newData['currency'] === "solana") { // use the newData variable directly
      await sendSolanaTransaction(newData);
    } else if (newData['type'] === 'swap') {
      //await sendSwap();
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
