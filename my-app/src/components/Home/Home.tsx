import { Avatar, Badge, Button, Grid, styled } from '@material-ui/core'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar';

import './style.css';

const Home = () => {

  const navigate = useNavigate();

  const nameUser = localStorage.getItem('users');

  const imageavatar = localStorage.getItem('image');
  const logout = () => {
    localStorage.removeItem("users")
    localStorage.getItem('image')
    navigate("/");
  }

  const StyledBadge = styled(Badge)({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
    }
  });

  const search = () => {
    let userID = localStorage.getItem('userID');
    const data = {
      userID: userID
    };

    axios.post("http://127.0.0.1:8000/api/utente/searchByInterest", data)
      .then((response: { data: string; }) => {
        console.log('GET@risposta', response.data);
        navigate("/utenti");
      });
  }

  return (

    <div className="Home">
      <Sidebar/>
       <Grid container >
          <Grid xs={12}>
            <div className="button-logout" >
              <Button type='submit' onClick={logout} color='primary' variant="contained" fullWidth>Logout</Button>
            </div>
          </Grid>
          <Grid xs={12}>
            <h2 style={{ textAlign: "center", marginLeft: "10px" }}>Benvenuto nel tuo profilo<br></br><br></br><span style={{ textAlign: 'center', color: " #f50091" }}>{nameUser}</span></h2>
          </Grid> 
          <Grid xs={8}>    
            <StyledBadge className='avatar-badge'
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                 variant="dot"
            >
               <Avatar style={{ marginLeft: '44px', width: '150px', height: '150px' , backgroundColor:'white' }} alt={(nameUser as string)} src={(imageavatar as string)}
              />
            </StyledBadge>
          </Grid>                  
          <Grid xs={12}> 
            <h6 style={{ textAlign: "center", marginTop: "30px" }}>Incontra persone affini a te! <br></br><br></br><h6 style={{ textAlign: 'center' }}>Setta i tuoi interessi nella sezione dedicata e inizia la ricerca!</h6></h6>
          </Grid>
          <Grid  style={{ textAlign: "center" ,fontWeight:'bold', fontSize:'xx-large',marginTop:'10px'}}  xs={12}>        
              <span> Clicca qui </span>
          </Grid>
          <Grid  style={{ textAlign: "center",fontSize:"xx-large" }}  xs={12}> 
              <i className=" material-icons"> south </i>
          </Grid>
          <Grid xs={12}> 
            <div className=" search-button">
             <Button type='submit' onClick={search} color='primary' variant="contained" fullWidth>
                <div>
                  <h6>Cerca</h6>
                  <i className=" material-icons">search</i>
                </div>
             </Button>
            </div>
          </Grid> 
      </Grid> 
    </div>

  )
}

export default Home

