import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Main() {
  const history = useHistory();
  const location = useLocation();
  console.log('his', history, 'locaiton', location);
  return <div>Main</div>;
}

export default Main;
