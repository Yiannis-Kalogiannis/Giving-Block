import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

function MessageInput() {
const [message, setMessage] = useState(''); // State to store message input
const {loading, sendMessage}= useSendMessage(); // Custom hook to send message

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!message.trim()) return; // Return if message is empty
        await sendMessage(message); // Send message
        setMessage(''); // Clear message input

    };

    return ( 
        <form onSubmit={handleSubmit}>
            <Box display="flex" alignItems="center" p={2}>
                {/* Input Field */}
                <TextField
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="outlined"
                    fullWidth
                    placeholder="Type a message..."
                    size="small"
                    sx={{
                        borderRadius: '20px',
                        marginRight: 2,
                    }}
                />

                {/* Send Button */}
                <IconButton 
                    color="primary" 
                    aria-label="send" 
                    type="submit" 
                    sx={{ borderRadius: '50%', padding: 1 }}
                >
                    {loading ? 'Sending...' : <SendIcon/> } {/* Send Icon with submit type already inside  */}
                    
                </IconButton>
            </Box>
        </form>
    );
}

export default MessageInput;
