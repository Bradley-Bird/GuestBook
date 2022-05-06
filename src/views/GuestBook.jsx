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
} from '@mui/material';
import { IoIosHome } from 'react-icons/io';
import { useUser } from '../context/UserContext';
import { Link, useHistory } from 'react-router-dom';
import { createEntry, getEntries } from '../services/entries';
import Markdown from '../components/Markdown';
import { signOutUser } from '../services/auth';
import LogoutIcon from '@mui/icons-material/Logout';

function GuestBook() {
  const { user, setUser } = useUser();
  const [signature, setSignature] = useState('');
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    getEntries()
      .then(setEntries)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createEntry({ id: user.id, signature });
    console.log(user.id, signature);
    setSignature('');
  };
  const handleSignOut = () => {
    signOutUser().then(setUser({})).finally(history.push('/'));
  };
  return (
    <>
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
      {loading ? (
        <Container maxWidth="lg">
          <Typography variant="body1">Loading...</Typography>
        </Container>
      ) : (
        <>
          <Container maxWidth="lg">
            <CssBaseline />
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                '& .markdown': {
                  py: 3,
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Join Us!
              </Typography>
              <Divider />
              {entries.map((entry) => (
                <Markdown className="markdown" key={entry.id}>
                  {entry.content}
                </Markdown>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}

export default GuestBook;
