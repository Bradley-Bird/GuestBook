import { Switch, Route } from 'react-router-dom';
import SignUp from './views/Auth';
import Main from './views/Main';
export default function App() {
  return (
    <>
      <Switch>
        <Route path="/auth" component={SignUp} />
        <Route path="/" component={Main} />
      </Switch>
    </>
  );
}
