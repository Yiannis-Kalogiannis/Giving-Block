import { useEffect, useRef } from "react";
import { Box } from "@mui/material";  // Import Box from Material-UI
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
    <Box
      className="messages"
      sx={{
        overflowY: "scroll",
        height: "100%", // Ensure it has a defined height to scroll within
        padding: "1rem", // Optional, for padding around messages
      }}
    >
      {loading ? (
        <h1>Loading...</h1>
      ) : Array.isArray(Messages) ? (
        Messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <h6>Type a message to start a conversation</h6>
      )}
    </Box>
  );
}

export default Messages;

