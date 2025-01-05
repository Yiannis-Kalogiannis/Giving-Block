import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

function MessageInput() {
  const [message, setMessage] = useState(""); // State to store message input
  const { loading, sendMessage } = useSendMessage(); // Custom hook to send message

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!message.trim()) return; // Return if message is empty
    await sendMessage(message); // Send message
    setMessage(""); // Clear message input
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box 
        display="flex" 
        alignItems="center" 
        p={2} 
        justifyContent="start" // Center the input
      >
        <Box 
          display="flex" 
          alignItems="center" 
          width="100%" 
          
        >
          {/* Input Field */}
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            fullWidth
            placeholder="Type a message..."
            size="small"
            multiline
            rows={2} // Limit to 2 rows initially
            sx={{
              borderRadius: "20px",
              marginRight: 2,
              "& .MuiInputBase-root": {
                maxHeight: "60px", // Adjust height to accommodate 2 rows
              },
              "& .MuiOutlinedInput-root": {
                overflow: "hidden", // Hide scroll bar for the container
              },
              "& textarea": {
                overflowY: "auto", // Enable vertical scrolling if needed
                resize: "none", // Disable resizing of the textarea
              },
              "& .MuiInputBase-input": {
                textAlign: "left", // Ensure text is aligned to the left
              },
              
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { // Check if Enter is pressed without Shift
                  e.preventDefault(); // Prevent the newline
                  handleSubmit(e); // Submit the message
                }
              }}
            />

          {/* Send Button */}
          <IconButton
            color="primary"
            aria-label="send"
            type="submit"
            sx={{ borderRadius: "50%", padding: 1 }}
          >
            {loading ? "Sending..." : <SendIcon />}
          </IconButton>
        </Box>
      </Box>
    </form>
  );
}

export default MessageInput;
