
import { Avatar, Button, Grid, IconButton, InputAdornment, Paper, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './style.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {

    const[errors,setErrors] = useState<string>('');
    //const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password:""
      });
      
    const handleSignin = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      const userData = {
        email: user.email,
        password: user.password
      };

      if(user.email === '' && user.password!=='')
      {
        setErrors('Il campo Email è vuoto')
      }
      if(user.password === ''  && user.email!=='')
      {
        setErrors('Il campo Password è vuoto')
      }
        if(user.password === '' && user.email==='')
      {
        setErrors('Inserire i campi richiesti')
    
      }
       else if(user.password !== '' && user.email!=='')
     {
      axios.post('http://127.0.0.1:8000/api/utente/login/', userData)
      .then(response => {


        if (!response.data.code) {  
          setErrors('Email o Password errati! Riprova');
        }else{
          localStorage.setItem('users',response.data.data.name);
          localStorage.setItem('user',JSON.stringify(response.data.data));
          localStorage.setItem('userID',response.data.data.id);
          localStorage.setItem('image',response.data.data.foto)
          navigate('/home')
          
        }

      })
      .catch((error) => {
        if (error.response) {
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
    }}
    
    const onInputChange = (e: { target: { value: any; name: any; }; }) => {
      const value = e.target.value;
      setUser({
        ...user,
        [e.target.name]: value
      });

    };
    const handleClickShowPassword = () => {
      setShowPassword(()=> !showPassword)      
    };

  return (
    <Grid className="login">
    <Paper className="container" elevation={10} >
        <Grid>
          <Avatar className="avatar"> <i className=" material-icons">favorite_border</i></Avatar>
            <h2>Accedi</h2>  
        </Grid>
        <TextField label='Email'  name="email" value={user.email}  onChange={onInputChange} placeholder='Enter Email' type='text' fullWidth required/>
        <TextField label='Password'  name="password" value={user.password}  onChange={onInputChange} placeholder='Enter password'
         type={showPassword ? 'text' : 'password'} fullWidth required 
         InputProps={{
          endAdornment: <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
          >
            {showPassword ? <Visibility />:<VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
        }/>
        <Button className='button-access' onClick={handleSignin} type='submit' color='primary' variant="contained"  fullWidth>Accedi</Button>
        <h3 className='success' style={{ color: "green" }}>{errors}</h3>
        <h6 > Non hai un Account ?
          <NavLink to="Registration">
           <span>Registrati</span>
          </NavLink>
        </h6>
    </Paper>
</Grid>
 
  )
}

export default Login

