import React, { useEffect } from 'react';
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
import { motion } from 'framer-motion';
import Nav from './navbar';
import gsap from 'gsap';
import Foot from './footer';

// Create a custom dark theme with enhanced background effects
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
    },
    secondary: {
      main: '#f48fb1',
      light: '#fce4ec', 
    },
    background: {
      default: '#0a0a14',
      paper: '#1a1a24',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    }
  },
  typography: {
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600, 
      marginBottom: '1rem',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
});

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const slideIn = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8 }
};

const MotionContainer = motion(Container);
const MotionBox = motion(Box);
const MotionCard = motion(Card);

function LandingPage() {
  useEffect(() => {
    // GSAP animations for page elements
    gsap.fromTo(
      '.fade-in', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 }
    );

    gsap.fromTo(
      '.slide-in', 
      { x: -100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.3 }
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
        <div style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a14 100%)', height: '100vh', width: '100vw'}}>
      <Nav/>
      <MotionContainer 
        maxWidth="100%"
       
        component="main"
        sx={{ 
            
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
          pt: 15,
          pb: 8,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a14 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(144, 202, 249, 0.1) 0%, rgba(10, 10, 20, 0) 50%)',
            pointerEvents: 'none'
          }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <MotionBox
          {...fadeIn}
          sx={{ mb: 6 }}
          className="fade-in"
        >
          <Typography variant="h1" color="primary.main" gutterBottom>
            Empowering Students, Inspiring Donors
          </Typography>
          <Typography variant="h5" color="text.primary" paragraph sx={{ mb: 4 }}>
            Discover scholarships tailored for you or make a meaningful contribution to a student's future.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                color: '#ffffff',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
                }
              }}
            >
              Find Scholarships
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  background: 'rgba(33, 150, 243, 0.1)'
                }
              }}
            >
              Donate Now
            </Button>
          </Box>
        </MotionBox>
      </MotionContainer>

      <Container maxWidth="100%" sx={{ 
        py: 8,
        height: '80vh',
        paddingX: { xs: 2, sm: 8 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #0a0a14 0%, #1a1a2e 100%)'
      }}>
        <Typography variant="h2" align="center" color="primary.main" gutterBottom>
          Our Vision
        </Typography>
        <Typography variant="h6" align="center" color="text.primary" paragraph sx={{ mb: 6 }}>
          To make education accessible for all by bridging the gap between deserving students and generous donors.
        </Typography>
        
        <Grid container spacing={4}>
          {[{
              title: "Empower Students",
              description: "Help students achieve their dreams by providing access to scholarships.",
              delay: 0
            }, {
              title: "Support Education",
              description: "Your donations can change lives and create brighter futures.",
              delay: 0.2
            }, {
              title: "Build Community",
              description: "Join a network of like-minded individuals passionate about education.",
              delay: 0.4
          }].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.6 }}
                viewport={{ once: true }}
                className="fade-in"
                sx={{ 
                  height: '20vh',
              
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(to bottom, #1a1a2e, #0a0a14)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '24px',
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(33, 150, 243, 0.3)',
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out'
                  },
                  '@media (max-width: 960px)': {
                    height: 'auto',
                    minHeight: '250px'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h3" component="h3" gutterBottom color="primary.main">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {item.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ 
        bgcolor: '#151525', 
        py: 8, 
        color: '#ffffff',
        background: 'linear-gradient(135deg, #151525 0%, #1a1a2e 100%)'
      }}>
        <Container maxWidth="lg">
          <MotionBox {...slideIn} className="slide-in">
            <Typography variant="h2" align="center" gutterBottom color="primary.main">
              Available Scholarships
            </Typography>
            <Grid container spacing={4}>
              {[{
                  title: "Merit Scholarship",
                  amount: "$10,000",
                  deadline: "March 1, 2024",
                  description: "For outstanding academic achievement"
                },
                {
                  title: "STEM Excellence",
                  amount: "$15,000",
                  deadline: "April 15, 2024",
                  description: "Supporting future scientists and engineers"
                },
                {
                  title: "Arts & Humanities",
                  amount: "$8,000",
                  deadline: "May 1, 2024",
                  description: "For creative and humanities majors"
                }
              ].map((scholarship, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <MotionCard
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(to bottom right, rgba(26, 26, 46, 0.9), rgba(10, 10, 20, 0.9))',
                      backdropFilter: 'blur(20px)',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0 0 40px rgba(33, 150, 243, 0.2)'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" color="primary.main" gutterBottom>
                        {scholarship.title}
                      </Typography>
                      <Typography variant="h4" color="secondary.main" gutterBottom>
                        {scholarship.amount}
                      </Typography>
                      <Typography color="text.primary">
                        Deadline: {scholarship.deadline}
                      </Typography>
                      <Typography color="text.primary" sx={{ mt: 2 }}>
                        {scholarship.description}
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary"
                        fullWidth 
                        sx={{ 
                          mt: 2,
                          color: '#ffffff',
                          background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
                          }
                        }}
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </MotionBox>
        </Container>
      </Box>

    <Foot/>
    </div>
    </ThemeProvider>
  );
}

export default LandingPage;
