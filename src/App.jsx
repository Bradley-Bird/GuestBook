import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import GuestBook from './views/GuestBook';
import Main from './views/Main';
import Auth from './views/Auth';
import { useUser } from './context/UserContext';
export default function App() {
  const { user } = useUser();
  return (
    <>
      <Switch>
        <PrivateRoute path="/guestbook">
          <GuestBook />
        </PrivateRoute>
        <Route path="/auth">
          {user?.email ? <Redirect to="/guestbook" /> : <Auth />}
        </Route>
        <Route path="/" component={Main} />
      </Switch>
    </>
  );
}
