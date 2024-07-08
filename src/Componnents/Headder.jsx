import React from 'react'
import { Link } from 'react-router-dom'

export const Headder = () => {
  return (
    <div>
       <nav className="navbar">
        <div className="container">
        <div className="row">
        <div className="col-md-12">
           <h5>Left Menu</h5>
        <ul className='navbar-nav'>
            <li className='nav-item'><Link to="/" className='nav-link'>Home</Link></li>
            <li className='nav-item'><Link to="/userlist" className='nav-link'>UserList</Link></li>
        </ul>
        </div>
        </div>

        </div>


       </nav>
    </div>
  )
}
