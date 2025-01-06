import React from 'react'
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Container, 
    Box, 
    Grid, 
    Card, 
    CardContent,
    useTheme,
    ThemeProvider,
    Link,
      IconButton,
      Divider,
    createTheme
  } from '@mui/material';
  import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
  import Stack from '@mui/material/Stack';
function footer() {
  return (
    <Box component="footer" sx={{ 
        bgcolor: '#0a0a14',
        padding: 6, 
        background: 'linear-gradient(0deg, #0a0a14 0%, #151525 100%)'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
      
              <Typography variant="h6" color="primary.main" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="text.primary">
                Empowering students through scholarships and connecting generous donors to make education accessible for all.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="text.primary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  Find Scholarships
                </Link>
                <Link href="#" color="text.primary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  Donate Now
                </Link>
                <Link href="#" color="text.primary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  How It Works
                </Link>
                <Link href="#" color="text.primary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  Contact Us
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Connect With Us
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton color="primary" aria-label="facebook">
                  <FaFacebook />
                </IconButton>
                <IconButton color="primary" aria-label="twitter">
                  <FaTwitter />
                </IconButton>
                <IconButton color="primary" aria-label="linkedin">
                  <FaLinkedin />
                </IconButton>
                <IconButton color="primary" aria-label="instagram">
                  <FaInstagram />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <Typography variant="body2" color="text.primary" align="center">
            © 2025 Scholarship Foundation. All rights reserved.
          </Typography>
        </Container>
      </Box>      
  )
}

export default footer