import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import GuestBook from './views/GuestBook';
import Main from './views/Main';
import Auth from './views/Auth';
export default function App() {
  return (
    <>
      <Switch>
        <PrivateRoute path="/guestbook">
          <GuestBook />
        </PrivateRoute>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Main} />
      </Switch>
    </>
  );
}
