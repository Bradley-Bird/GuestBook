import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { UserProvider } from '../context/UserContext';
import GuestBook from './GuestBook';
import { userData, entries } from '../Tests/fixtures';
export const theme = createTheme({
  palette: {
    primary: {
      main: '#00263a',
      light: '#E7ECF2',
    },
    secondary: {
      main: '#7fbc03',
    },
    background: { default: '#E7ECF2' },
  },
});
const server = setupServer(
  rest.post(`${process.env.SUPABASE_API_URL}/auth/v1/token`, (req, res, ctx) =>
    res(ctx.json({ userData }))
  ),
  rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
    res(ctx.json(entries))
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('GuestBook', () => {
  it('displays an input, and a list of signatures', async () => {
    render(
      <ThemeProvider theme={theme}>
        <UserProvider>
          <MemoryRouter initialEntries={['/guestbook']}>
            <GuestBook />
          </MemoryRouter>
        </UserProvider>
      </ThemeProvider>
    );
  });
});
