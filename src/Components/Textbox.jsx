import React, { useRef } from 'react'
import { useMessage } from '../Hooks/useMessage';
import { FaArrowRight } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";

// This is the Textbox component. It handles the text input and audio from the user and sends the request to the useMessage hook.
const Textbox = () => {
  const input = useRef();
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useMessage();

  // This function is used to send the user's message when they press enter or click the send button.
  const sendMessage = () => {
    const text = input.current.value;
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };

  return (
    <div className='fixed bottom-0 right-0 left-0 z-10 mx-auto'>
      <div className='flex gap-5 px-10 py-12 justify-center mx-auto'>
        {/* This is the text input field. When the user presses enter, the sendMessage function is called. */}
        <input className='p-5 px-10 w-full outline-fuchsia-400 hover:outline-green-500 opacity-50 rounded-3xl' placeholder='Enter the text'
          ref={input}
          onKeyDown={(e) => { if (e.key == "Enter") { sendMessage(); } }}
        /> 
        {/* This is the microphone button. */}
        <button className='p-2 px-10 rounded-3xl bg-white hover:bg-pink-500 hover:text-white'><FaMicrophone /></button>
        {/* This is the send button. It is disabled while the message is loading. When clicked, it calls the sendMessage function. */}
        <button 
          disabled={loading || message} 
          onClick={sendMessage}
          className='p-2 hidden md:block px-10 rounded-3xl bg-white hover:bg-pink-500 hover:text-white'
        > 
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Textbox;
