import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextProps = {
  isLoggedIn: boolean;
  logOutUser: () => void;
  logInUser: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = 'isUserOn'

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  logOutUser: () => { },
  logInUser: () => { },
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem(LOCAL_STORAGE_KEY));

  const logInUser = () => {
    setIsLoggedIn(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
  };

  const logOutUser = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      logOutUser,
      logInUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };