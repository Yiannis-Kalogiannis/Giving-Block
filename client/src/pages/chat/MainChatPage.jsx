import { Box, Divider } from "@mui/material";
import Sidebar from "../../components/ChatComponents/Sidebar";
import MessageContainer from "../../components/ChatComponents/MessageContainer";

function MainChatPage() {
  return (
    <Box
      display="flex"
      height="54.6vh" // Full viewport height
      flexDirection="column" // Change to column to avoid overflow issues
      borderRadius={2}
      boxShadow={3}
      sx={{
        bgcolor: "transparent",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(94, 34, 34, 0)",
      }}
    >
      <Box
        display="flex"
        flex={1} // Ensure the content takes the remaining space
        overflow="hidden" // Prevent overflow
      >
        {/* Sidebar */}
        <Box
          sx={{
            bgcolor: "rgba(125, 147, 154, 0.17)",
            borderRight: "1px solid rgb(178, 173, 173)",
          }}
          color="Black"
          p={2}
          minWidth="25%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          
        >
          <Sidebar />
        </Box>

        {/* Divider */}
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "rgba(165, 165, 165, 0)" }} />

        {/* Message Container */}
        <Box
          flex={1} // Take the remaining space
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // Prevent overflow of content
            maxHeight: "calc(100vh - 60px)", // Fixed height for the message container (adjust to suit)
            backgroundColor: "rgba(0, 0, 255, 0.1)",
          }}
        >
          <MessageContainer />
        </Box>
      </Box>
    </Box>
  );
}

export default MainChatPage;
