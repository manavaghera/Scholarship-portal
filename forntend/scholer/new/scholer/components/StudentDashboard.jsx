import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Tab,
  Tabs,
  Card,
  CardContent,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Chip,
  LinearProgress,
  createTheme,
  ThemeProvider
} from '@mui/material';
import Nav from './navbar';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';

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
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        }
      }
    }
  }
});

const MotionBox = motion(Box);
const MotionCard = motion(Card);

function StudentDashboard() {
  const [tabValue, setTabValue] = useState(0);

  const scholarships = [
    {
      title: "Merit Scholarship",
      amount: "$10,000",
      deadline: "March 1, 2024",
      status: "Open"
    },
    {
      title: "STEM Excellence",
      amount: "$15,000",
      deadline: "April 15, 2024",
      status: "Open"
    },
    {
      title: "Arts & Humanities",
      amount: "$8,000",
      deadline: "May 1, 2024",
      status: "Open"
    }
  ];

  const applications = [
    {
      title: "Engineering Excellence",
      amount: "$12,000",
      status: "Under Review",
      progress: 60,
      date: "January 15, 2024"
    },
    {
      title: "Future Leaders",
      amount: "$5,000",
      status: "Documents Pending",
      progress: 30,
      date: "January 20, 2024"
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* add navbar as you need it */}
      {/* <Nav /> */}
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a14 100%)'
      }}>
        {/* Header Section */}
        <Box sx={{ 
          p: 4, 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Container maxWidth="lg">
            <Typography variant="h4" color="primary.main" gutterBottom>
              Welcome back, Alex
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Track your scholarship applications and discover new opportunities
            </Typography>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
              <Tab label="Available Scholarships" />
              <Tab label="My Applications" />
              <Tab label="Application Status" />
            </Tabs>
          </Box>

          {/* Available Scholarships Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" color="primary.main">
                Available Scholarships
              </Typography>
              <TextField
                size="small"
                placeholder="Search scholarships..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300 }}
              />
            </Box>
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              component={Grid}
              container
              spacing={3}
            >
              {scholarships.map((scholarship, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <MotionCard
                    variants={itemVariants}
                    sx={{
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0 0 20px rgba(144, 202, 249, 0.2)'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" color="primary.main" gutterBottom>
                        {scholarship.title}
                      </Typography>
                      <Typography variant="h5" color="text.primary" gutterBottom>
                        {scholarship.amount}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Deadline: {scholarship.deadline}
                        </Typography>
                        <Chip
                          label={scholarship.status}
                          color="success"
                          size="small"
                        />
                      </Box>
                      <Button variant="contained" fullWidth>
                        Apply Now
                      </Button>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </MotionBox>
          </TabPanel>

          {/* My Applications Tab */}
          <TabPanel value={tabValue} index={1}>
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {applications.map((application, index) => (
                <MotionCard
                  variants={itemVariants}
                  key={index}
                  sx={{ mb: 3 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" color="primary.main">
                          {application.title}
                        </Typography>
                        <Typography variant="h5" color="text.primary">
                          {application.amount}
                        </Typography>
                      </Box>
                      <Chip
                        label={application.status}
                        color="warning"
                        size="small"
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Application Progress
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={application.progress}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {application.progress}% Complete
                      </Typography>
                    </Box>
                  </CardContent>
                </MotionCard>
              ))}
            </MotionBox>
          </TabPanel>

          {/* Application Status Tab */}
          <TabPanel value={tabValue} index={2}>
            <MotionCard
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <CardContent>
                {applications.map((application, index) => (
                  <MotionBox
                    key={index}
                    variants={itemVariants}
                    sx={{
                      py: 2,
                      borderBottom: index < applications.length - 1 ? 1 : 0,
                      borderColor: 'divider'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6" color="text.primary">
                          {application.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Applied on: {application.date}
                        </Typography>
                      </Box>
                      <Chip
                        label={application.status}
                        color="warning"
                        size="small"
                      />
                    </Box>
                  </MotionBox>
                ))}
              </CardContent>
            </MotionCard>
          </TabPanel>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>{children}</Box>
      )}
    </div>
  );
}

export default StudentDashboard;