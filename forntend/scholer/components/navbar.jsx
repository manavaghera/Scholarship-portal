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
    createTheme
  } from '@mui/material';
 
  import { useNavigate } from 'react-router-dom';  import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
function navbar() {
  return (
    <AppBar 
  position="fixed" 
  color="default" 
  elevation={2}
  sx={{
    background: 'rgba(18, 18, 18, 0.95)', 
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
  }}
>
  <Toolbar sx={{ py: 1 }}>
    <Typography 
      variant="h6" 
      component="div" 
      sx={{ 
        flexGrow: 1, 
        color: '#fff',
        fontWeight: 600,
        letterSpacing: '0.5px'
      }}
    >
      Scholarship Portal
    </Typography>
    <Button 
    onClick={() => {
       window.location.href = '/login'
      }}
      sx={{
        mx: 1,
        color: '#fff',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.08)'
        }
      }}
    >
      Login
    </Button>
    <Button 
      variant="contained" 
      onClick={() => {
        window.location.href = '/register'
      }}
      sx={{ 
        ml: 2,
        px: 3,
        background: 'linear-gradient(45deg, #303f9f 30%, #7986cb 90%)',
        '&:hover': {
          background: 'linear-gradient(45deg, #7986cb 30%, #303f9f 90%)'
        }
      }}
    >
      Register
    </Button>
  </Toolbar>
</AppBar>

// add conditinal rendering for navbar for student , doner and admin do chatgpt
  )
}

export default navbar
