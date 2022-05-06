import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';
import { ThemeProvider, createTheme } from '@mui/material/';

export const theme = createTheme({});
render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
