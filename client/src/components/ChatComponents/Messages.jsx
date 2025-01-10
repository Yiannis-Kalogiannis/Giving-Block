import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";


function Messages() {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef(null); // Create a ref for scrolling
  console.log(messages);
  
  useListenMessages();
  
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the last message
    }, 0);
  }, [messages]); // Scroll when messages change

  return (
    <div style={{ overflowY: "scroll", height: "100%", padding: "1rem", bgcolor: "transparent", backdropFilter: "blur(10px)" }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null} style={{ marginBottom: "1rem", maxWidth: "100%" }}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <p>Type a message to start a conversation</p>
      )}
    </div>
  );
}

export default Messages;