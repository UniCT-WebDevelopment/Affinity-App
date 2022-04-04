import { Button, Grid } from '@material-ui/core'
import axios from 'axios';
import React from 'react'

const ButtonSearch = () => {
    
 
    const search = () =>
    {
      let userID = localStorage.getItem('userID');
      const data = {
        userID: userID
      };

       axios.post("http://127.0.0.1:8000/api/utente/searchByInterest", data)
       .then((response: { data: string; }) => {
        console.log('GET@risposta',response.data);
        localStorage.setItem("users",response.data);
       
      });
    }
  return (
        <Grid >
           <div className="search-button">         
             <Button type='submit' onClick={search} color='primary' variant="contained" fullWidth>
                 <div><h2>Search</h2>
               <i className=" material-icons">search</i>
               </div>
              </Button>
          </div>
        </Grid>   

  )
}

export default ButtonSearch
