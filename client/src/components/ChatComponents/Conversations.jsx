import { Box, Typography, CircularProgress, Divider } from "@mui/material";
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import React from 'react';

function Conversations() {
  const { loading, conversations } = useGetConversations();
  // console.log('Conversations:', conversations);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        padding: 2,
        maxHeight: '100vh', // Ensure it's full screen
        overflowY: 'auto', // Make the list scrollable
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Conversations
      </Typography>
      
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        conversations.map((conversation, idx) => (
          <React.Fragment key={conversation._id}>
            <Conversation
              
              conversation={conversation}
              lastIndex={idx === conversations.length - 1}
            />
            {/* Add a divider after each conversation except the last one */}
            {idx !== conversations.length - 1 && <Divider sx={{ marginY: 1 }} />}
          </React.Fragment>
        ))
      )}
    </Box>
  );
}

export default Conversations;
