import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import { collapseClasses } from '@mui/material';
import { createContext, useContext, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { signUp } from '../services/auth.js';
import { getUser } from '../services/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser || { email: null });

  const signUpUser = async (email, password) => {
    const authUser = await signUp({ email, password });
  };

  return (
    <UserContext.Provider value={(user, signUpUser)}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) (
    throw new Error('useUser must be used within a UserProvider');
  )

  return context;
};
