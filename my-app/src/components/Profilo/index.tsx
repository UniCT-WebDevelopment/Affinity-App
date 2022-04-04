import React, { useState } from 'react'
import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import './style.css';
import { Sidebar } from '../Home/Sidebar';


export const Profilo = () => {

  var userSession = localStorage.getItem('user');

  var uSession = JSON.parse(JSON.parse(JSON.stringify(userSession)));


  const [errors, setErrors] = useState('');
  const [user, setUser] = useState({
    name: uSession.name,
    email: uSession.email,
    phone: uSession.phone,
    foto: uSession.foto,
    nickname: uSession.nickname
  });

  const {
    name,
    email,
    phone,
    nickname,
     } = user;

    const onChange = (e: any) => {
      const files = e.target.files;
      const file = files[0];
      getBase64(file);
    };
  
    const onLoad = (fileString: string | ArrayBuffer | null) => {
      console.log(fileString);
      user.foto = fileString as string;
    };
  
    const getBase64 = (file: Blob) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onLoad(reader.result);
      };
    };
  const onInputChange = (e: { target: { name: any; value: any; }; }) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

 
     async function modifica()
    {
      const userData = {
        email: user.email,
        name: user.name,
        phone: user.phone,
        nickname: user.nickname,
        foto: user.foto,
        id: uSession.id

      };
      if(user.name === '' 
      || user.email===''
      || user.phone===''
      || user.nickname===''
      || user.foto==='')
    {
      setErrors('Inserire i campi richiesti')
  
    } 
    else if(user.name!==''
    && user.email!==''
    && user.phone!==''
    && user.nickname!=='' 
    && user.foto!=='')
   {

    
      const result = await axios.post("http://127.0.0.1:8000/api/utente/update", userData);
      localStorage.setItem('users', user.name);
      localStorage.setItem('image',user.foto);

    
      setErrors('Modifica profilo avvenuta con successo!')
      console.log(result)
    }}
 

  return (
    <Grid className="profile">
        <Sidebar/>

      <Paper className="container" elevation={10}>
        <Grid>
          <Avatar className="avatar"> <i className=" material-icons">favorite</i></Avatar>
          <h2>Modifica Profilo</h2>
          <h3 className='success' style={{ color: "green" }}>{errors}</h3>
        </Grid>
        <TextField error={name === ''} label='Name' name="name" value={name} onChange={e => onInputChange(e)} placeholder='Enter Name' type='text' fullWidth required />
        <TextField error={email === ''} label='Email' name="email" value={email} onChange={e => onInputChange(e)} placeholder='Enter Email' type='text' fullWidth required />
        <TextField error={nickname === ''} label='Nickname' name="nickname" value={nickname} onChange={e => onInputChange(e)} placeholder='Enter nickname' type='text' fullWidth required />
        <TextField error={phone === ''} label='Phone' name="phone" value={phone} onChange={e => onInputChange(e)} placeholder='Enter phone' type='number' fullWidth required />
        <TextField label='Foto' type="file" onChange={onChange} placeholder='Upload photo' required />

        <Button className='button-profile' type='submit' onClick={modifica} color='primary' variant="contained" fullWidth>Modifica Dati</Button>
      
          <NavLink to="/home">
           <span className='back'> Indietro</span>
          </NavLink>
  
      </Paper>
    </Grid>
  )
}
