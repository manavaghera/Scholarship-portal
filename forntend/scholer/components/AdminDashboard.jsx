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

function AdminPanel() {
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

  const donations = [
    {
      title: "Engineering Excellence",
      amount: "$12,000",
      date: "January 15, 2024"
    },
    {
      title: "Future Leaders",
      amount: "$5,000",
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
              Welcome back, Admin
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Manage scholarships, donations, and more
            </Typography>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
              <Tab label="Manage Scholarships" />
              <Tab label="Donation Records" />
              <Tab label="Wallet Management" />
              <Tab label="Reports" />
            </Tabs>
          </Box>
{/* each tab have its own index and content to add or remove tab u can delete tabpanle component  */}
          {/* Manage Scholarships Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" color="primary.main">
                Manage Scholarships
              </Typography>
              <Button variant="contained" color="primary">
                Add New Scholarship
              </Button>
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
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" fullWidth sx={{ mt: 1 }}>
                        Delete
                      </Button>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </MotionBox>
          </TabPanel>

          {/* Donation Records Tab */}
          <TabPanel value={tabValue} index={1}>
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {donations.map((donation, index) => (
                <MotionCard
                  variants={itemVariants}
                  key={index}
                  sx={{ mb: 3 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" color="primary.main">
                          {donation.title}
                        </Typography>
                        <Typography variant="h5" color="text.primary">
                          {donation.amount}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {donation.date}
                      </Typography>
                    </Box>
                  </CardContent>
                </MotionCard>
              ))}
            </MotionBox>
          </TabPanel>

          {/* Wallet Management Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" color="primary.main">
                Wallet Management
              </Typography>
              <TextField
                fullWidth
                label="Distribute Funds"
                type="number"
                sx={{ mt: 2, mb: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth>
                Distribute Funds
              </Button>
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                Track Transactions
              </Button>
            </Box>
          </TabPanel>

          {/* Reports Tab */}
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" color="primary.main">
                Reports
              </Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Generate Analytics
              </Button>
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                View Reports
              </Button>
            </Box>
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

export default AdminPanel;