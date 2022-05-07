import React, { useEffect, useState } from 'react';
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import { IoIosHome } from 'react-icons/io';
import { useUser } from '../context/UserContext';
import { Link, useHistory } from 'react-router-dom';
import { createEntry, getEntries } from '../services/entries';
import { signOutUser } from '../services/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import Delete from '../components/Delete';

function GuestBook() {
  const { user, setUser } = useUser();
  const [signature, setSignature] = useState('');
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [updateEntries, setUpdateEntries] = useState({});
  const history = useHistory();
  useEffect(() => {
    getEntries()
      .then(setEntries)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    getEntries()
      .then(setEntries)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [updateEntries]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newEntry = await createEntry({ userId: user.id, signature });
    setUpdateEntries(newEntry);
    setSignature('');
  };
  const handleSignOut = () => {
    signOutUser().then(setUser({})).finally(history.push('/'));
  };
  return (
    <Container component="main">
      <Container component="header">
        <CssBaseline />
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Link to="/">
              <IconButton>
                <IoIosHome />
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Delete update={setUpdateEntries} />
          </Grid>
          <Grid item>
            <Button
              onClick={handleSignOut}
              variant="outlined"
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
        <Typography component="h1" variant="h5">
          Please sign the guest book!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="signature"
            label="Sign Here"
            name="signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit your signature!
          </Button>
        </Box>
      </Container>
      <Divider />

      {loading ? (
        <Container maxWidth="lg">
          <Typography variant="body1">Loading...</Typography>
        </Container>
      ) : (
        <Container component="section">
          <Typography variant="h6" gutterBottom>
            Join Us!
          </Typography>
          <Divider />
          <List
            name="guestList"
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {entries.map((entry) => (
              //had specifically call this fragment by name so that I could add the key
              <React.Fragment key={entry.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="" src="" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={entry.content}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {user.email}-
                        </Typography>
                        {new Date(entry.created_at).toLocaleString('en-US')}
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Container>
      )}
      <p>{error}</p>
    </Container>
  );
}

export default GuestBook;
