import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent, 
  createTheme,
  ThemeProvider,
  Button
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import { motion } from 'framer-motion';
// Create a custom dark theme
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
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to bottom right, #1a1a2e, #0a0a14)',
          backdropFilter: 'blur(20px)',
        }
      }
    }
  }
});

const MotionBox = motion(Box);
const MotionCard = motion(Card);

function MISPortal() {
  const student = {
    name: "John Doe",
    idNo: "S12345",
    totalFees: "$20,000", 
    paidFees: "$15,000",
    remainingFees: "$5,000",
    wallet: "$1,000"
  };
  const feesPaidPercentage = (parseFloat(student.paidFees.replace(/[^0-9.]/g, '')) / parseFloat(student.totalFees.replace(/[^0-9.]/g, ''))) * 100;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a14 100%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 4
        }}>
          <Button 
            variant="contained"
            size="large"
            sx={{
              fontSize: '1rem',
              py: 2,
              px: 6
            }}
          >
            Wallet
          </Button>
        </Box>

        <Container maxWidth="md">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{textAlign: 'center', mb: 6}}>
              <Typography variant="h2" color="primary.main" gutterBottom>
                {student.name}
              </Typography>
              
              <Typography variant="h5" color="text.primary" gutterBottom>
                Student ID: {student.idNo}
              </Typography>
            </Box>

            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 4
            }}>
              <MotionCard
                sx={{
                  p: 4,
                  textAlign: 'center',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 0 40px rgba(144, 202, 249, 0.3)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" color="text.primary">
                    Total Fees
                  </Typography>
                  <Typography variant="h4" color="primary.main" sx={{mt: 2}}>
                    {student.totalFees}
                  </Typography>
                </CardContent>
              </MotionCard>

              <MotionCard
                sx={{
                  p: 4,
                  textAlign: 'center',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 0 40px rgba(144, 202, 249, 0.3)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" color="text.primary">
                    Paid Fees
                  </Typography>
                  <Typography variant="h4" color="primary.main" sx={{mt: 2}}>
                    {student.paidFees}
                  </Typography>
                </CardContent>
              </MotionCard>

              <MotionCard
                sx={{
                  p: 4,
                  textAlign: 'center',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 0 40px rgba(144, 202, 249, 0.3)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" color="text.primary">
                    Due Fees
                  </Typography>
                  <Typography variant="h4" color="primary.main" sx={{mt: 2}}>
                    {student.remainingFees}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Box>
          </MotionBox>
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ 
              mt: 4, 
              textAlign: 'center',
              p: 4,
              background: 'rgba(26, 26, 46, 0.6)',
              borderRadius: 3,
              backdropFilter: 'blur(10px)'
            }}
          >
            <Typography variant="h6" color="text.primary" gutterBottom>
              Fees Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={feesPaidPercentage}
              sx={{
                height: 20,
                borderRadius: 10,
                backgroundColor: 'rgba(144, 202, 249, 0.2)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 10,
                  background: 'linear-gradient(90deg, #90caf9 0%, #f48fb1 100%)',
                  transition: 'transform 1s ease-in-out',
                  animation: 'shimmer 2s infinite linear',
                  '@keyframes shimmer': {
                    '0%': {
                      backgroundPosition: '-200% 0',
                    },
                    '100%': {
                      backgroundPosition: '200% 0',
                    },
                  },
                }
              }}
            />
            <Typography 
              variant="h5" 
              color="primary.main" 
              sx={{ 
                mt: 2,
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(144, 202, 249, 0.5)'
              }}
            >
              {`${feesPaidPercentage.toFixed(1)}% Completed`}
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default MISPortal;
