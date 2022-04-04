import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Registration';
import Home from './components/Home/Home';
import { Profilo } from './components/Profilo';
import { Interessi } from './components/Interessi';
import { UtentiByInteressi } from './components/Utenti';


ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Signup />} />
    <Route path="/profilo" element={<Profilo/>} />
    <Route path="/home" element={<Home />} />
    <Route path="/interessi" element={<Interessi />} />
    <Route path="/utenti" element={<UtentiByInteressi />} /> 
  </Routes>
</BrowserRouter>  
 

 ,
  document.getElementById('root')
);