import { Redirect, Route, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

function PrivateRoute({ children, ...rest }) {
  const { user } = useUser();
  const location = useLocation();
  return (
    <Route {...rest}>
      {user.email ? (
        children
      ) : (
        <Redirect
          to={{ pathname: '/auth/signIn', state: { from: location } }}
        />
      )}
    </Route>
  );
}

export default PrivateRoute;
