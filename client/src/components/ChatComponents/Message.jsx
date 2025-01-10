import { Box, Typography, Avatar } from '@mui/material';
import useConversationStore from '../../store/chat.store/useConversationStore';
import useUserStore from '../../store/useUserStore';

function Message({ message }) {
  const { userId, profilePicture } = useUserStore();
  const { selectedConversation } = useConversationStore();
  const fromMe = message.senderId === userId; // Check if the message is from the current user
  const profileImage = fromMe
    ? profilePicture
    : selectedConversation.profilePicture;
  // console.log(selectedConversation)

  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hou12: true, // Show AM/PM
  });

  return (
    <Box
      display="flex"
      flexDirection={fromMe ? 'row-reverse' : 'row'} // Align messages based on sender
      alignItems="center"
      sx={{
        marginBottom: 1,
        maxWidth: '70%', // Adjust the maximum width
        marginLeft: fromMe ? 'auto' : '0', // Align the bubble to the right if it's from the user
        marginRight: fromMe ? '0' : 'auto', // Align the bubble to the left if it's not from the user
      }}
    >
      {/* Profile Image */}
      {!fromMe && (
        <Avatar
          alt="User Profile"
          src={profileImage}
          sx={{
            width: 30,
            height: 30,
            marginRight: fromMe ? 0 : 1,
            marginLeft: fromMe ? 1 : 0,
          }} // Smaller avatar
        />
      )}

      {/* Chat Text */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%', // Adjust the width of the bubble
          wordWrap: 'break-word', // Ensure long words break
          overflowWrap: 'break-word', // Handle word wrapping for modern browsers
          backgroundColor: fromMe ? 'lightgray' : 'darkgray', // Adjust background colors
          borderRadius: 4,
          padding: 1,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            whiteSpace: 'pre-wrap', // Preserve line breaks in text
            fontSize: '0.85rem',
            marginBottom: 0.5,
            maxWidth: '80%', // Ensure it doesn’t overflow
            textAlign: 'left', // Force left alignment for text
            color: fromMe ? 'black' : 'white', // Adjust text color based on sender
          }}
        >
          {message.message}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            fontSize: '0.75rem',
            textAlign: fromMe ? 'right' : 'left', // Align time to the right or left
          }}
        >
          Send at: {messageTime}
        </Typography>
      </Box>

      {/* Profile Image for "fromMe" messages */}
      {fromMe && (
        <Avatar
          alt="User Profile"
          src={profileImage}
          sx={{
            width: 30,
            height: 30,
            marginRight: fromMe ? 0 : 1,
            marginLeft: fromMe ? 1 : 0,
          }} // Smaller avatar
        />
      )}
    </Box>
  );
}

export default Message;
