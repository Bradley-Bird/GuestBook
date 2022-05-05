import { Switch, Route } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { useRouteLocation } from '../context/UserContext';

function Auth() {
  const { path } = useRouteLocation();
  return (
    <>
      <Switch>
        <Route path={`/auth/signIn`}>
          <SignIn />
        </Route>
        <Route path={`/auth/signUp`}>
          <SignUp />
        </Route>
      </Switch>
    </>
  );
}

export default Auth;
