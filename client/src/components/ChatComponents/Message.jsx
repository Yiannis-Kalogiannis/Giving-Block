import { Box, Typography, Avatar } from '@mui/material';
import useConversationStore from '../../store/chat.store/useConvarsationStore';
import useUserStore from '../../store/useUserStore';

function Message( {message} ) {
  const {userId, profilePicture } = useUserStore();
const {selectedConversation} = useConversationStore();
const fromMe = message.senderId === userId
console.log('fromMe:', fromMe);
const profileImage = fromMe ? profilePicture : selectedConversation.profileImage;

  return (
    <Box display="flex" alignItems="center" p={2}
    sx={{
      backgroundColor: fromMe?"lightgray": "white", // Example background color
      borderRadius: 2,             // Rounded corners
      marginBottom: 1,             // Spacing between messages
      boxShadow: 1                 // Add subtle shadow
    }}>
      {/* Profile Image */}
      <Avatar
        alt="User Profile"
        src= {profileImage}
        sx={{ width: 40, height: 40, marginRight: 2 }}
      />

      {/* Chat Text */}
      <Box>
        <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
          {message.message}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Send: 10:21
        </Typography>
      </Box>
    </Box>
  );
}

export default Message;
