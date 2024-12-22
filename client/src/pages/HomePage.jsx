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
          backgroundColor: 'rgba(255, 226, 226, 0.28)', // Semi-transparent overlay with opacity
          zIndex: -1, // This ensures the overlay is behind the content
        }}
      />

      {/* Navbar Component */}
      <Box sx={{ flexShrink: 0 }}>
        <Navbar />
      </Box>

      {/* Service List Component */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
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
