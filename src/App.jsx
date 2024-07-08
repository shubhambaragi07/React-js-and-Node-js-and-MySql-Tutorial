import React from 'react'
import { Headder } from './Componnents/Headder'
import { Home } from './Componnents/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
// import "./Style.css"
import { Routes,Route } from 'react-router-dom';
import { Userlist } from './Componnents/Userlist';
import UserRegester from './Componnents/UserRegester';
// import { UserRegester } from './Componnents/UserRegester';

export const App = () => {
  return (
    <div className='App'>
      <div className='leftside'>
      <Headder/>
      </div>
      <div className='rightside'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/userlist' element={<Userlist/>}/>
          <Route path='/userregestration' element={<UserRegester/>}/>
        
        </Routes>
      </div>
    
    </div>
  )
}
