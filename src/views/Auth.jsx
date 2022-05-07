import { Switch, Route, useRouteMatch } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

function Auth() {
  const { url, path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={`${path}/signIn`}>
          <SignIn url={url} />
        </Route>
        <Route path={`${path}/signUp`}>
          <SignUp url={url} />
        </Route>
      </Switch>
    </>
  );
}

export default Auth;
