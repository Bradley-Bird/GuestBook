import { createContext, useContext, useState } from 'react';
import { signUp, signIn } from '../services/auth.js';
import { getUser } from '../services/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const currentUser = getUser();
  console.log(currentUser);
  const [user, setUser] = useState({ currentUser } || { email: null });

  const signUpUser = async (email, password) => {
    const authUser = await signUp({ email, password });
    if (authUser) {
      setUser(authUser);
    }
  };
  const signInUser = async (email, password) => {
    const authUser = await signIn({ email, password });
    if (authUser) {
      setUser(authUser);
    }
  };

  return (
    <UserContext.Provider value={{ user, signUpUser, signInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
