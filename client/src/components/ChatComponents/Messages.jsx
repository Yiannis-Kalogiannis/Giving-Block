import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";

function Messages() {
  const { loading, Messages } = useGetMessages();
  const lastMessageRef = useRef(null); // Create a ref for scrolling

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the last message
    }, 100);
  }, [Messages]); // Scroll when messages change

  return (
    <div style={{ overflowY: "scroll", height: "100%", padding: "1rem",  backgroundColor: "lightgray" }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : Array.isArray(Messages) ? (
        Messages.map((message) => (
          <div
            key={message._id}
            ref={lastMessageRef}
            style={{ marginBottom: "1rem", maxWidth: "100%" }}
          >
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