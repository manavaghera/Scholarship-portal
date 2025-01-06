import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Tab,
  Tabs,
  InputAdornment,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { Email, AccountBalanceWallet } from '@mui/icons-material';
import { ethers } from 'ethers'; // Import ethers.js

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#534bae',
      light: '#1a237e',
    },
    secondary: {
      main: '#ff5c8d',
      light: '#d81b60', 
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3'
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

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);

function LoginPage() {
  const [userType, setUserType] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    walletAddress: '',
  });
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const cardRef = useRef(null);

  const handleUserTypeChange = (event, newValue) => {
    setUserType(newValue);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login attempt for:', userType === 0 ? 'Student' : 'Donor', formData);
  };

  // Function to connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        // Set the connected wallet address
        setWalletAddress(accounts[0]);
        setIsConnected(true);

        // Optionally, set up the ethers.js provider and signer here
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log('Signer:', signer);
      } catch (err) {
        console.error('Failed to connect wallet:', err);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ 
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden',
      }}>
        <MotionContainer
          component="main"
          maxWidth="xs"
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            pt: 8,
            zIndex: '1',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MotionPaper
            ref={cardRef}
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(30, 30, 46, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              width: '100%',
              position: 'relative',
              zIndex: '2',
              boxShadow: '0 0 20px rgba(64, 64, 255, 0.3)',
            }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Typography
              component="h1"
              variant="h5"
              color="primary.main"
              sx={{ mb: 3, fontWeight: 600 }}
            >
              Welcome Back
            </Typography>

            <Tabs
              value={userType}
              onChange={handleUserTypeChange}
              sx={{
                mb: 4,
                '& .MuiTab-root': {
                  minWidth: 120,
                },
              }}
            >
              <Tab 
                label="Student Login" 
                sx={{
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 'bold',
                  }
                }}
              />
              <Tab 
                label="Donor Login"
                sx={{
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 'bold',
                  }
                }}
              />
            </Tabs>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="walletAddress"
                label="Wallet Address"
                type="text"
                id="walletAddress"
                autoComplete="wallet-address"
                value={walletAddress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceWallet color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
                disabled
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  mb: 2,
                  background: 'linear-gradient(45deg, #4040ff 30%, #1a237e 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1a237e 30%, #4040ff 90%)',
                  }
                }}
              >
                Sign In as {userType === 0 ? 'Student' : 'Donor'}
              </Button>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  mb: 2,
                  background: 'linear-gradient(45deg, #ff5c8d 30%, #d81b60 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #d81b60 30%, #ff5c8d 90%)',
                  }
                }}
                onClick={connectWallet}
              >
                isConnected ? Connected: ${walletAddress} : 'Connect MetaMask'              </Button>

              {isConnected && (
                <Typography variant="body1" color="text.secondary">
                  Wallet Address: {walletAddress}
                </Typography>
              )}
            </Box>
          </MotionPaper>
        </MotionContainer>
      </div>
    </ThemeProvider>
  );
}

export default LoginPage;