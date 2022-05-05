import { collapseClasses } from '@mui/material';
import { createContext, useContext, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getUser } from '../services/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //   const currentUser = getUser();
  const { url, path } = useRouteMatch();
  //   const [user, setUser] = useState(currentUser || { email: null });

  return (
    <UserContext.Provider value={(url, path)}>{children}</UserContext.Provider>
  );
};

export const useRouteLocation = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error('useLocation must be used within a UserProvider');
  return context;
};
