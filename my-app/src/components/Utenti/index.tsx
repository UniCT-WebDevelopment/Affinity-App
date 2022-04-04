import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import './style.css';
import { NavLink } from 'react-router-dom';
import { Sidebar } from '../Home/Sidebar';

export const UtentiByInteressi = () => {

  const [results, setResults] = useState<[]>([]);
  const[errors,setErrors] = useState<string>('');


  useEffect(() => {
    let userID = localStorage.getItem('userID');
    const data = {
      userID: userID
    };
  axios.post('http://127.0.0.1:8000/api/utente/searchByInterest', data).then(response => {
    
    const interests = response.data;
    console.log('interessi',interests)
  
    setResults(interests);
    if ( interests.length===0) {
      setErrors("Spiacente! nessun utente trovato!")
    }
  })
  }, [])
  
 
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 130 },
    { field: 'nickname', headerName: 'Nickname', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'eta', headerName: 'Età', width: 130 },
  

  ];


          return (
          <div className="User">
               <Sidebar/>

          <span style={{ marginBottom:'10px' }}>Lista Utenti che condividono i tuoi stessi interessi</span>
            <div style={{ height: 400, width: '100%' }}>

            <DataGrid
            className='grid-user'
                rows={results}
                columns={columns}
                pageSize={6}
                rowsPerPageOptions={[6]}
                checkboxSelection
            />
            </div>
            <h3 className='user-error' style={{ color: "green" }}>{errors}</h3>
  
          <NavLink to="/home">
           <span className='back'> Indietro</span>
          </NavLink>
        </div>
        
        )
}


