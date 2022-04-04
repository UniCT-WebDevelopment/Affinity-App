import React, { useState } from 'react'
import { Avatar, Button, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, MenuItem, Paper, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import './style.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const Signup = () => {
  const onChange = (e: any) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  const onLoad = (fileString: string | ArrayBuffer | null) => {
    user.foto = fileString as string;
  };

  const getBase64 = (file: Blob) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const [errors, setErrors] = useState('');
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    nickname: "",
    provincia: "",
    eta: "",
    language: "",
    citta: "",
    gender: "",
    foto: "",
  });

  const {
    name,
    email,
    phone,
    nickname,
    provincia,
    eta,
    language,
    citta,
    gender,
   } = user;



  const onInputChange = (e: { target: { name: any; value: any; }; }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  async function signup() {
        if(user.name === '' 
        || user.email===''
        || user.password===''
        || user.phone===''
        || user.nickname===''
        || user.provincia===''
        || user.eta==='' 
        || user.language==='' 
        || user.citta==='' 
        || user.gender===''
        || user.foto==='')
      {
        setErrors('Inserire i campi richiesti')
    
      } 
      else if( user.name!==''
      && user.email!==''
      && user.password!==''
      && user.phone!==''
      && user.nickname!==''
      && user.provincia!==''
      && user.eta!==''
      && user.language!=='' 
      && user.citta!=='' 
      && user.gender!==''
      && user.foto!=='')
     {
    
      await axios.post("http://127.0.0.1:8000/api/utente/register", user);
        setErrors('Registrazione avvenuta con successo!')
        setUser(
        {
          name: "",
          email: "",
          password: "",
          phone: "",
          nickname: "",
          provincia: "",
          eta: "",
          language: "",
          citta: "",
          gender: "",
          foto: ""
        })

  }}

  const handleClickShowPassword = () => {
    setShowPassword(()=> !showPassword)      
  };

  return (
    <Grid className="registration">
      <Paper className="container" elevation={10}>
        <Grid>
          <Avatar className="avatar"> <i className=" material-icons">favorite</i></Avatar>
          <h2>Sign Up</h2>
          <h3 className='success' style={{ color: "green" }}>{errors}</h3>
        </Grid>
        <TextField label='Nome' name="name" value={name} onChange={e => onInputChange(e)} placeholder='Enter Name' type='text' fullWidth required />
        <TextField label='Email' name="email" value={email} onChange={e => onInputChange(e)} placeholder='Enter Email' type='email' fullWidth required />
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
        <TextField label='Nickname' name="nickname" value={nickname} onChange={e => onInputChange(e)} placeholder='Enter nickname' type='text' fullWidth required />
        <TextField label='Età' name="eta" value={eta} onChange={e => onInputChange(e)} placeholder='Enter age' type='number' fullWidth required />
        <TextField label='Telfono' name="phone" value={phone} onChange={e => onInputChange(e)} placeholder='Enter phone' type='number' fullWidth required />
        <FormLabel className="radio-buttons-label" >Sesso</FormLabel>
       <RadioGroup 
        row
        name="gender"
        value={gender}
        onChange={e => onInputChange(e)}
        
      >
        <FormControlLabel className='mb-0' value="femmina" control={<Radio />} label="Femmina" />
        <FormControlLabel className='mb-0' value="maschio" control={<Radio />} label="Maschio" />
      </RadioGroup>
       <TextField
        className='gender'
          select
          label='Lingua'
          name="language"
          value={language}
          required
          onChange={e => onInputChange(e)} >
          <MenuItem key="IT" value="IT">
            Italiano
          </MenuItem>
          <MenuItem key="EN" value="EN">
          Inglese
          </MenuItem>
          <MenuItem key="FR" value="FR">
            Francese
          </MenuItem>
          <MenuItem key="DE" value="DE">
            Tedesco
          </MenuItem>
        </TextField>
        <TextField label='Citta' name="citta" value={citta} onChange={e => onInputChange(e)} placeholder='Enter citta' type='text' fullWidth required />
        <TextField label='Provincia' name="provincia" value={provincia} onChange={e => onInputChange(e)} placeholder='Enter provincia' type='text' fullWidth required />
        <TextField label='Foto' type="file" onChange={onChange} placeholder='Upload photo' required />
        <Button className='button-signup' type='submit' onClick={signup} color='primary' variant="contained" fullWidth>Singup</Button>
        <Typography>Clicca qui per
          <NavLink to="/">
            <span>Login</span>
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Signup
