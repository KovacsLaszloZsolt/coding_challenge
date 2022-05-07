import React, { useState, useContext } from 'react';
import FoodContext from '../context/FoodContext';
import { FoodContextType } from '../context/FoodContext';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Box,
  FormHelperText,
} from '@mui/material/';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { UserInfo, InputValidation } from '../interfaces';

const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputValidation, setInputValidation] = useState<InputValidation>({
    emailError: '',
    emailValid: false,
    passwordError: '',
    passwordValid: false,
  });

  const { setUser, setToastMsg } = useContext(FoodContext) as FoodContextType;

  const handleChange = (prop: keyof UserInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [prop]: event.target.value });
  };

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleEmailBlur = (): React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!userInfo.email) {
      setInputValidation({ ...inputValidation, emailError: 'Email required!', emailValid: false });
      return;
    }

    if (!regex.test(userInfo.email)) {
      setInputValidation({ ...inputValidation, emailError: 'Email formation invalid!', emailValid: false });
      return;
    }

    setInputValidation({ ...inputValidation, emailError: '', emailValid: true });
  };

  const handlePasswordBlur = (): void => {
    if (!userInfo.password) {
      setInputValidation({ ...inputValidation, passwordError: 'Password required!', passwordValid: false });
      return;
    }

    setInputValidation({ ...inputValidation, passwordError: '', passwordValid: true });
  };

  const handleFormSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response: AxiosResponse = await axios.post('http://127.0.0.1:3001/login', {
        username: userInfo.email,
        password: userInfo.password,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const token = response.data.token as string;
      localStorage.setItem('user', JSON.stringify({ email: userInfo.email, token: token }));
      setUser({ email: userInfo.email, token: token });
      void router.push('/');
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        setToastMsg({ msg: 'Invalid email/password!', type: 'error' });
        return;
      }

      setToastMsg({ msg: 'Something went wrong!', type: 'error' });
    }
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={handleFormSubmit}
        autoComplete="off"
      >
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <TextField
            required
            error={inputValidation.emailError ? true : false}
            id="email"
            label="Email"
            variant="standard"
            value={userInfo.email}
            onChange={handleChange('email')}
            onBlur={handleEmailBlur}
            helperText={inputValidation.emailError}
          />
        </FormControl>
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          required
          error={inputValidation.passwordError ? true : false}
          variant="standard"
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={userInfo.password}
            onChange={handleChange('password')}
            onBlur={handlePasswordBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{inputValidation.passwordError}</FormHelperText>
        </FormControl>

        <Button
          type="submit"
          disabled={inputValidation.emailValid && inputValidation.passwordValid ? false : true}
          sx={{ alignSelf: 'flex-end', marginTop: '3rem', marginRight: '1rem' }}
          variant="contained"
        >
          LOGIN
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
