// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import InputForm from "./InputForm";
// import MessageList from "./MessageList";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [provider, setProvider] = useState(null);

//   useEffect(() => {
//     const initializeProvider = async () => {
//       if (window.ethereum) {
//         const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
//         setProvider(ethersProvider);
//       } else {
//         console.log("Please install MetaMask!");
//       }
//     };

//     initializeProvider();
//   }, []);

//   const onSendMessage = async (message) => {
//     setMessages([...messages, { text: message, sender: "user" }]);

//     if (message.toLowerCase() === "connect metamask") {
//       if (provider) {
//         try {
//           const accounts = await provider.send("eth_requestAccounts", []);
//           const response = `MetaMask connected: ${accounts[0]}`;
//           setMessages((prevMessages) => [
//             ...prevMessages,
//             { text: response, sender: "bot" },
//           ]);
//         } catch (error) {
//           console.error("Failed to connect MetaMask:", error);
//         }
//       } else {
//         const response = "MetaMask is not installed. Please install MetaMask and try again.";
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: response, sender: "bot" },
//         ]);
//       }
//     } else {
//       // Add your chatbot logic here
//     }
//   };

//   return (
//     <div>
//       <MessageList messages={messages} />
//       <InputForm onSendMessage={onSendMessage} />
//     </div>
//   );
// };

// export default Chatbot;
