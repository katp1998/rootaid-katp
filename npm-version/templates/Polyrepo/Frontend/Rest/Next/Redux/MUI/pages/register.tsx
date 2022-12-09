import {useState,useEffect} from 'react'
import { User } from '../types/user.type';
import authService from '../api/authService'
import { useRouter } from 'next/router'
import React from 'react';
import styles from '../styles/Home.module.css'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { register , reset } from '../features/authSlice/auth.slice';

import {Box, Typography, TextField, Button} from '@mui/material/';

const registerForm: React.FC = () => {

  const [fields,setFields] = useState({
    name: '',
    email:'',
    password: ''
  }) 

  const [error,setError] = useState('')

  const dispatch= useAppDispatch()
  const {user, isLoading , isError, message} = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() =>  {
    if(isError) {
      setError(message)
    }

    if(user) {
      router.push('/')
      window.location.reload();
    }
    dispatch(reset())
  },[user, isError,  message, router, dispatch])

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
  }

  const handleRegister = async (e :any) => {
    e.preventDefault();

    const user : User = {
      name: fields.name as string,
      email: fields.email as string,
      password: fields.password as string
    }

    dispatch(register(user))
  };

  return (
    <>
    <div>
      <form onSubmit={handleRegister}>
        <Box 
        display = "flex" 
        flexDirection={"column"} 
        maxWidth = {400} 
        alignItems="center" 
        justifyContent={"center"} 
        margin="auto" 
        marginTop={5} 
        padding={'50px'} 
        borderRadius={5} 
        boxShadow={'5px 5px 10px #ccc'}
        sx={{":hover":{
          boxShadow:'10px 10px 20px #ccc'
        }}}>
          <Typography 
          variant='h3'
          padding= {3}
          textAlign = "center">REGISTER</Typography>
          <TextField type='text' name="name" value={fields.name}  onChange={onChange} required label="Name" variant="outlined" multiline placeholder='Enter your name' margin='normal' fullWidth color='error' />
          <TextField type='email' name="email" value={fields.email}  onChange={onChange} required label="Email" variant="outlined" multiline placeholder='Enter email address' margin='normal' fullWidth color='error' />
          <TextField type="password" name="password" value={fields.password}  onChange={onChange} required label="Password" variant="outlined" multiline placeholder='Enter password' margin="normal" fullWidth color='error' id="outlined-password-input" />
          <Button sx={{marginTop: 3}} variant ="contained"  type="submit" color="error" size="large" fullWidth>Register</Button> 
          <h1>{error}</h1>
        </Box>
        </form>
    </div>
    </>
  );
};

export default registerForm;