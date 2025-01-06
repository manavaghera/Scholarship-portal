import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { AccountBalanceWallet } from '@mui/icons-material';

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
      secondary: '#b3b3b3',
    },
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

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: '',
  });
  const [registrationType, setRegistrationType] = useState('student');
  const cardRef = useRef(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegistrationTypeChange = (event) => {
    setRegistrationType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${registrationType.charAt(0).toUpperCase() + registrationType.slice(1)} registration attempt:`, formData);
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.background = 'radial-gradient(circle at center, #0a192f 0%, #020c1b 100%)';

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random() * 0.5 + 0.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0x4040ff, 0.5);
    scene.add(ambientLight);

    const light = new THREE.PointLight(0x4040ff, 2, 50);
    scene.add(light);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const onMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      light.position.x = mouseX * 3;
      light.position.y = mouseY * 3;
      light.position.z = 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ 
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <MotionContainer
          component="main"
          maxWidth="xs"
          sx={{
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 8,
            pb: 8,
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
              {registrationType === 'student' ? 'Student Registration' : 'Donor Registration'}
            </Typography>

            {/* Dropdown to select Registration Type */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Registration Type</InputLabel>
              <Select
                value={registrationType}
                onChange={handleRegistrationTypeChange}
                label="Registration Type"
              >
                <MenuItem value="student">Student Registration</MenuItem>
                <MenuItem value="donor">Donor Registration</MenuItem>
              </Select>
            </FormControl>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.walletAddress}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceWallet color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
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
                Register
              </Button>
            </Box>
          </MotionPaper>
        </MotionContainer>
      </div>
    </ThemeProvider>
  );
}

export default RegistrationPage;
