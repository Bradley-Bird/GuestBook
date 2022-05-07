import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { UserProvider } from '../context/UserContext';
import GuestBook from './GuestBook';
import { userData, entries } from '../Tests/fixtures';

const userInput = {
  content: 'Fake Object',
};
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
  ),
  rest.post(
    `${process.env.SUPABASE_API_URL}/rest/v1/entries`,
    (req, res, ctx) => {
      const { userInput } = req.body;
      return res(
        ctx.json({
          userInput,
          id: 1000,
          guest_id: '123123',
          created_at: '2022-06-06T16:44:08.718123+00:00',
        })
      );
    }
  ),
  rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1000,
          guest_id: '123123',
          content: 'Fake Object',
          created_at: '2022-06-06T16:44:08.718123+00:00',
        },
        ...entries,
      ])
    )
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('GuestBook', () => {
  it('displays an input, and a list of signatures', async () => {
    const container = render(
      <ThemeProvider theme={theme}>
        <UserProvider>
          <MemoryRouter initialEntries={['/guestbook']}>
            <GuestBook />
          </MemoryRouter>
        </UserProvider>
      </ThemeProvider>
    );
    screen.getByRole('banner');
    screen.getByText(/loading/i);
    await screen.findByRole('heading', { name: /join us!/i });
    const List = await screen.findAllByRole('listitem');
    // screen.debug();

    const textBox = screen.getByRole('textbox', { name: /sign here/i });
    userEvent.type(textBox, 'Fake Object');
    expect(textBox.value).toBe('Fake Object');

    const submitButton = screen.getByRole('button', {
      name: /submit your signature!/i,
    });
    userEvent.click(submitButton);

    await screen.findByText(/loading/i);
    container.querySelector('#root > main > section');
    // const List = await screen.findAllByRole('listitem');
    console.log(List.children);

    // await waitFor(() => expect(List.length).toEqual(5));
    // expect(List.length).toEqual(4);
  });
});
