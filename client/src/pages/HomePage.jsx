import Navbar from '../components/Navbar';
import ServiceList from '../components/ServiceList';
import Footer from '../components/Footer';
import { Box } from '@mui/material'; // Importing Material UI components

function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: 'url("/assets/Home page.jpg")', // Path to your image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        backgroundAttachment: 'fixed',  // Fixes the background image
        
        zIndex: 0,
      }}
    >
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
    position: 'fixed',  // Keep navbar fixed at the top
    top: 0,             // Align navbar to the top of the screen
    left: 0,            // Ensure navbar is aligned with the left edge
    right: 0,           // Ensure navbar is aligned with the right edge
    zIndex: 1100,       // Ensure navbar is above other content
    width: '100%',      // Full width
    
  }}
>
  <Navbar />
</Box>

      {/* Service List Component */}
      <Box sx={{ flexGrow: 1, overflow: 'Auto', marginTop: '67px' }}>
        <ServiceList />
      </Box>

      {/* Footer Component */}
      <Box sx={{ flexShrink: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default HomePage;
