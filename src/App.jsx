import { Switch, Route } from 'react-router-dom';
import Auth from './views/Auth';
import Main from './views/Main';
export default function App() {
  return (
    <>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Main} />
      </Switch>
    </>
  );
}
