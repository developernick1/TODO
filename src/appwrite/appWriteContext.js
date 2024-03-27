
import { View, Text } from 'react-native'
import React, { FC, createContext } from 'react'

import Appwrite from './service'
import { PropsWithChildren } from 'react';
import { useState } from 'react';

export const AppwriteContext = createContext({
  appwrite: new Appwrite(),
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

export const AppwriteProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultValue = {
      appwrite: new Appwrite(),
      isLoggedIn,
      setIsLoggedIn,
  };

  return (
      <AppwriteContext.Provider value={defaultValue}>
          {children}
      </AppwriteContext.Provider>
  );
};

export default AppwriteContext;