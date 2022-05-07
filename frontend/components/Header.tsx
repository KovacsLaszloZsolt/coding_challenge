import { useContext } from 'react';
import styles from '../styles/Header.module.scss';
import FoodContext, { FoodContextType } from '../context/FoodContext';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import Logo from './Logo';

const Header = (): JSX.Element => {
  const { user, setUser } = useContext(FoodContext) as FoodContextType;
  const router = useRouter();
  const handleClickLogout = (): void => {
    localStorage.removeItem('user');
    setUser(null);
    void router.push('/login');
  };
  return (
    <Box
    className={styles.header}
      component="header"
      sx={{
        // display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        py: '2rem',
        backgroundColor: '#000',
      }}
    >
      <Box sx={{ width: '90vw', maxWidth: '600px', display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        {user?.token && (
          <Button sx={{ alignSelf: 'baseline' }} variant="contained" type="button" onClick={handleClickLogout}>
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
