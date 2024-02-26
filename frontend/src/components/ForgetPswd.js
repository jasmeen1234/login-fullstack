import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserType from "./UserType"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
const baseURL = "http://localhost:8000";

export default function ForgetPswd() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!role) {
        alert('Please select a user type');
        return;
      }
    
      const data = new FormData(event.currentTarget);
      const email = data.get('email');
    
      try {
        const response = await axios.post(`${baseURL}/password/reset`, { email, userType: role });
        console.log(response.data);
        alert(response.data.message);
        navigate('/resetpwd');
      } catch (error) {
        console.error(error.message);
        alert('An error occurred while processing your request');
      }
    };
  

  const forgetHandler = () => {
    // This function can be used for additional actions before form submission
    // For now, it can be left empty
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <UserType role={role} setRole={setRole} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={forgetHandler}
            >
              Send Code
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
