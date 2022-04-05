import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Sidebar } from '../Home/Sidebar';
import './style.css';

export const Interessi = () => {

  const [results, setResults] = useState<any[]>([]);
  const [errors, setErrors] = useState('');
  const [checked, setChecked] = useState<any>();

  useEffect(() => {
    const arrayStr: Array<any> = [];
    const userID = localStorage.getItem('userID');

    axios.get('http://127.0.0.1:8000/api/utente/listaInteressi/' + userID).then(response => {
      const interests = response.data;
      setResults(interests);
      for (var index in interests) {
        if (interests[index].checked) {
          arrayStr.push(interests[index].id);
        }
      }
      setChecked(arrayStr);

    })
  }, [])


  const setInterests = () => {
    let userID = localStorage.getItem('userID');

    if (checked.length > 0) {
      const data = {
        userID: userID,
        arrayStr: checked.toString()
      };

      axios.post("http://127.0.0.1:8000/api/utente/registerInterests", data)
        .then((response: { data: string; }) => {
          setErrors("Interessi aggiunti con successo!")

        });
    }
    else
      alert('Devi indicare almeno un interesse.');

  }

  const handleChange = (event: { target: { checked: any; value: any; }; }) => {
    var updatedList = [...checked];
    var indiceAtt =  updatedList.indexOf(event.target.value);
    if(indiceAtt == -1){
      for (let i = 0; i < updatedList.length; i++) {
        if(updatedList[i] == event.target.value)
        indiceAtt = i;
      }
    }
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      if(indiceAtt > -1)
      updatedList.splice(indiceAtt, 1);
    }

    setChecked(updatedList);
  }
  return (
    <div className="Interest">
      <Sidebar />
      <span className='title-interest'>Seleziona i tuoi interessi</span>
      <h3 className='success' style={{ color: "green" }}>{errors}</h3>
      <ul className="toppings-list">
        {results.map(({ name, id, checked }: any, index: React.Key | null | undefined) => {
          return (
            <li style={{listStyle:'none'}} key={index}>
              <div className="toppings-list-item">
                <div >
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={id}
                    defaultChecked={checked}
                    onChange={handleChange}

                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>

              </div>
            </li>
          );
        })}

      </ul>
      <div className="search-button">
        <Button type='submit' onClick={setInterests} color='primary' variant="contained" fullWidth>
          <div>Conferma</div>
        </Button>
      </div>
      <NavLink to="/home">
           <span className='back'> Indietro</span>
      </NavLink>
    </div>
  )

}


