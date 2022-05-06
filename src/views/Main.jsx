import React from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  CssBaseline,
  TextField,
  Divider,
  IconButton,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Main() {
  const history = useHistory();
  const location = useLocation();

  return (
    <Container component="main">
      <CssBaseline />
      <Typography component="h1" variant="h5">
        Welcome to the party, we're glad you are here!
        <Link to="/guestbook">
          <IconButton>
            <MenuBookIcon />
          </IconButton>
        </Link>
      </Typography>
    </Container>
  );
}

export default Main;
