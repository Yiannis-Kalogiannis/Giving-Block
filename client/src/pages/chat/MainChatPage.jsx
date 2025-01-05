import { Box, Divider } from '@mui/material';
import Sidebar from '../../components/ChatComponents/Sidebar';
import MessageContainer from '../../components/ChatComponents/MessageContainer';

function MainChatPage() {
  return (
    <Box display="flex" height="50vh">
      {/* Sidebar */}
      <Box bgcolor="lightBlue" p={2} width="30%">
        <Sidebar />
      </Box>

      {/* Divider */}
      <Divider orientation="vertical" flexItem />

      {/* Message Container */}
      <Box p={2} bgcolor="lightGray" width="40%">
        <MessageContainer />
      </Box>
    </Box>
  );
}

export default MainChatPage;
