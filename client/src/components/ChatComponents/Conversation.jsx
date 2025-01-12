import { Box, Avatar, Typography, Divider } from '@mui/material';
import useConversationStore from '../../store/chat.store/useConversationStore';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({ conversation, lastIndex }) => {
  const { setSelectedConversation, selectedConversation } =
    useConversationStore();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
console.log("testing:", onlineUsers)
  return (
    <>
      <Box
        onClick={() => setSelectedConversation(conversation)}
        sx={{
          display: 'flex',
          alignItems: 'center', // Align avatar and text
          padding: '8px',
          cursor: 'pointer',
          backgroundColor: isSelected ? 'gray' : 'transparent', // Conditional background color
          color: isSelected ? 'white' : 'black', // Conditional text color
          '&:hover': {
            backgroundColor: 'gray',
            color: 'white',
          },
        }}
      >
        <Box sx={{ position: 'relative', marginRight: '10px' }}>
          {/* Avatar */}
          <Avatar
            src={conversation.profilePicture}
            alt={conversation.username}
            sx={{ width: 40, height: 40 }}
          />
          {/* Green Dot */}
          {isOnline && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 10,
                height: 10,
                backgroundColor: 'green',
                borderRadius: '50%',
                border: '2px solid white', // Add border for better visibility
              }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {conversation.username}
          </Typography>
        </Box>
      </Box>
      {!lastIndex && <Divider />}
    </>
  );
};

export default Conversation;
