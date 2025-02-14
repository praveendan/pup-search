import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextProps = {
  isLoggedIn: boolean;
  logOutUser: () => void;
  logInUser: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  logOutUser: () => { },
  logInUser: () => { },
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logInUser = () => {
    setIsLoggedIn(true);
  };

  const logOutUser = () => {
    setIsLoggedIn(false);
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