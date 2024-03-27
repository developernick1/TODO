import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppRoutes from './app-routes';
import AuthRoutes from './auth-routes';
import { SplashScreen } from '../screens';
import AppwriteContext from '../appwrite/appWriteContext';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setIsloggedIn } from '../redux/actions/user';

export default function Routes() {
  const [user, setuser] = useState(false)
  const [Show, setShow] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const {appwrite,setIsLoggedIn} = useContext(AppwriteContext)
	const { isLoggedIn } = useSelector(state => state.userDetails);
  const dispatch = useDispatch();


  useEffect(() => {
    appwrite
    .getCurrentUser()
    .then(response => {
      setIsLoading(false)
      if (response) {
        dispatch(setIsloggedIn(true));
          setIsLoggedIn(true)
      }
    })
    .catch(_ => {
      setIsLoading(false)
      setIsLoggedIn(false)
    })
  }, [appwrite, setIsLoggedIn])



  if (isLoading) {
    return <Loading />
}

  setTimeout(() => {
    console?.log('ALL VAL',isLoggedIn)
    setShow(false)
  }, 1000);
  

  return (
   
      isLoggedIn ? <AppRoutes /> : <AuthRoutes />

  )
}
