import * as React from 'react';
import {useState} from 'react';
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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();
const baseURL = "http://localhost:8000";
export default function ResetPaswd() {
  const [role, setRole]=useState("");
  const[user,setUser]=useState({});
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    console.log("user",user);
    const email = user.email;
    const password=user.password;
    const cpassword=user.cpassword;
    const otp=user.otp;
    
    try {
      const response = await axios.post(`${baseURL}/password/set`, { email, password,cpassword,otp, userType: role });
      console.log("response",response);
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      console.error(error.message);
      alert('An error occurred while processing your request');
    }
  
  };
  const onChangeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
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
            Reset Password
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={1}>
            <Grid item xs={12}>
                <UserType role={role} setRole={setRole}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Conform Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                />
                 <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="otp"
                  label="OTP code"
                  type="text"
                  id="otp"
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                />
              </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              submit
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}