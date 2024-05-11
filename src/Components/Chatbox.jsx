import React, { useEffect, useState } from "react";
import { useMessage } from "../Hooks/useMessage";

// This is the Chatbox component. It is responsible for displaying messages.
// At the start, it is hidden to avoid unnecessary display.
// When a response from the API is received, the text is displayed in the box.
// This allows the user to read the text in case they don't understand the audio output.
const Chatbox = () => {
  const { message } = useMessage();
  const [msg, setMsg] = useState(null); // Initialize state to null

  useEffect(() => {
    if (message) {
      setMsg(message.text);
    }
  }, [message]);

  if (msg) {
    console.log("Message from chat box: ", msg);
  }

  return (
    <div
      className={`fixed left-6 bottom-36 ${
        !msg ? "hidden" : "block"
      } md:mt-32 justify-start p-5 z-10 flex flex-col bg-white h-80 rounded-lg w-72`}
    >
      <div className="w-full text-blue-400 font-bold text-lg">Chatbox</div>
      <div>{msg}</div>
    </div>
  );
};

export default Chatbox;
