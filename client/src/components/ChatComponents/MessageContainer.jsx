import { Box, Typography, Divider } from "@mui/material";
import Messages from './Messages';
import MessageInput from './MessageInput';
import useConversationStore from "../../store/chat.store/useConvarsationStore";
import { useEffect } from "react";


function MessageContainer() {
    const {selectedConversation, setSelectedConversation} = useConversationStore(); // Get selected conversation from store
    
    useEffect(() => {
        // Set selected conversation to null when component unmounts
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);
    
    return ( 
        <Box display="flex" flexDirection="column" height="100%">
            { !selectedConversation? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <Box bgcolor="lightblue" color="darkblue" p={1}>
                        <Typography variant="h6">To: <span>{selectedConversation.username}</span></Typography>
                    </Box>

                    {/* Messages */}
                    <Box 
                        flex={1} 
                        p={2} 
                        sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}
                    >
                        <Messages />
                    </Box>

                    {/* Divider */}
                    <Divider />

                    {/* Message Input */}
                    <Box p={2}>
                        <MessageInput />
                    </Box>
                </>
            )}
        </Box>
    );
}

const NoChatSelected = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h4">Select a chat to start messaging</Typography>
        </Box>
    );
};

export default MessageContainer;
