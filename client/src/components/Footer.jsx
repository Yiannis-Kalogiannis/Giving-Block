import { Box, Typography, Avatar, Link } from '@mui/material';

function Footer() {
    return ( 
        <Box 
            component="footer"
            sx={{
                backgroundColor: '#f8f9fa', 
                padding: '10px 0', // Reduced padding for smaller height
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {/* Logo */}
                <Avatar 
                    src="../../public/assets/default-image.png" 
                    alt="logo" 
                    sx={{ width: 40, height: 30, marginBottom: 1 }} // Reduced logo size
                />
                
                {/* Footer Text */}
                <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '0.8rem' }}>
                    © 2024 Giving Block |{' '}
                    <Link href="/privacy-policy" color="primary" sx={{ fontSize: '0.8rem' }}>
                        Read our Privacy and 🍪 Cookie Policy
                    </Link>{' '}
                    |{' '}
                    <Link href="mailto:giving-block@info.com" color="primary" sx={{ fontSize: '0.8rem' }}>
                        contact info giving-block@info.com
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;
