import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ServiceList from '../components/ServiceList';
import Footer from '../components/Footer';
import MainChatPage from './chat/MainChatPage';
import { Box, Fab, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <Box>
      {/* Overlay to add opacity */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(239, 180, 255, 0.15)', // Semi-transparent overlay with opacity
          zIndex: -1, // This ensures the overlay is behind the content
        }}
      />

      {/* Navbar Component */}
      <Box
        sx={{
          position: 'fixed', // Keep navbar fixed at the top
          top: 0, // Align navbar to the top of the screen
          left: 0, // Ensure navbar is aligned with the left edge
          right: 0, // Ensure navbar is aligned with the right edge
          zIndex: 1100, // Ensure navbar is above other content
          width: '100%', // Full width
        }}
      >
        <Navbar />
      </Box>

      {/* Service List Component */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: '67px' }}>
        <ServiceList />
      </Box>

      {/* Collapsible Chat Component */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          width: isChatOpen ? 600 : 'auto',
          height: isChatOpen ? 600 : 'auto',
          boxShadow: 4,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s, height 0.3s',
          zIndex: 1200,
        }}
      >
        {!isChatOpen && (
          <Fab color="primary" onClick={toggleChat}>
            <ChatIcon />
          </Fab>
        )}

        {isChatOpen && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1,
                backgroundColor: 'gray',
                color: 'white',
              }}
            >
              <Button onClick={toggleChat} sx={{ color: 'white' }}>
                <CloseIcon />
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
              }}
            >
              <MainChatPage />
            </Box>
          </>
        )}
      </Box>

      {/* Footer Component */}
      <Box sx={{ flexShrink: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default HomePage;
