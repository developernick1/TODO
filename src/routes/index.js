import { View, Text } from 'react-native';
import React, { useState } from 'react';
import AppRoutes from './app-routes';
import AuthRoutes from './auth-routes';
import { SplashScreen } from '../screens';

export default function Routes() {
  const [user, setuser] = useState(true)
  const [Show, setShow] = useState(true)

  setTimeout(() => {
    setShow(false)
  }, 1000);

  return (
    Show ?
      <SplashScreen />
      :
      user ? <AppRoutes /> : <AuthRoutes />

  )
}
