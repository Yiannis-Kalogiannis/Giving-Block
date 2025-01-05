import { Box, Divider } from "@mui/material";
import Sidebar from "../../components/ChatComponents/Sidebar";
import MessageContainer from "../../components/ChatComponents/MessageContainer";

function MainChatPage() {
  return (
    <Box
      display="flex"
      height="80vh"
      borderRadius={2}
      boxShadow={3}
      overflow="hidden"
      sx={{
        bgcolor: "transparent", // Transparent background
        backdropFilter: "blur(10px)", // Optional: Blur effect for a frosted glass look
        border: "1px solid rgba(255, 255, 255, 0.2)", // Optional: Subtle border for definition
        maxWidth: "60%", // Limit the width of the chat container
       
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          bgcolor: "rgba(28, 24, 24, 0.1)", // Semi-transparent white for a modern feel
          borderRight: "1px solid rgba(255, 255, 255, 0.2)", // Optional: Border for separation
        }}
        color="Black"
        p={2}
        maxWidth="25%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderRight="1px solid rgba(255, 255, 255, 0.2)"
      >
        <Sidebar />
      </Box>

      {/* Divider */}
      <Divider orientation="vertical" flexItem sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }} />

      {/* Message Container */}
      <Box
        flex={1}
        p={3}
        sx={{
          bgcolor: "rgba(157, 168, 182, 0.8)", // Semi-transparent white for a modern feel
          display: "flex",
          flexDirection: "column",
          borderRadius: "0 8px 8px 0",
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)", // Subtle inner shadow for depth
        }}
      >
        <MessageContainer />
      </Box>
    </Box>
  );
}

export default MainChatPage;
