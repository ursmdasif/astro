import { createContext, useContext, useEffect, useState } from "react";

// The backend URL where the chat API is hosted
const backendUrl = "http://localhost:3000";

// Creating a context for sharing message data across components
const MessageContext = createContext();

// This is the MessageProvider component. It provides message-related data and functions to its children components.
export const MessageProvider = ({ children }) => {
  // Function to send a chat message to the backend and update the messages state with the response
  const chat = async (message) => {
    setLoading(true);
    const data = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const resp = (await data.json()).messages;
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
  };

  // State variables for storing messages, the current message, loading status, and camera zoom status
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);

  // Function to remove the first message from the messages array after it has been played
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  // Effect hook to set the current message whenever the messages array changes
  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  // Providing the chat function, message data, and related functions to children components
  return (
    <MessageContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to use the MessageContext. Throws an error if used outside a MessageProvider.
export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
