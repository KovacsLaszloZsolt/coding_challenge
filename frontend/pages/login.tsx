import Box from '@mui/material/Box';
import { NextPage } from 'next';
import LoginForm from '../components/LoginForm';
import { useContext, useEffect } from 'react';
import FoodContext, { FoodContextType } from '../context/FoodContext';
import { useRouter } from 'next/router';
import React from 'react';

const login: NextPage = (): JSX.Element => {
  const { user } = useContext(FoodContext) as FoodContextType;
  const router = useRouter();

  useEffect(() => {
    if (user?.token) {
      void router.push('/');
    }
  }, [user]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Login</h2>
      <LoginForm />
    </Box>
  );
};

export default login;
