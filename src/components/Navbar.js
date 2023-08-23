import React from 'react';
import logo from '../imgs/logo.png';
import './Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className='navbar'>
            <img src={logo} alt='Instagram'/>
            <ul className='nav-menu'>
                <Link to='/signin'><li>Sign in</li></Link>
                <Link to='/signup'> <li>Sign up</li></Link>
                <Link to='/profile'> <li>Profile</li></Link>
            </ul>
        </div>
    )
}

export default Navbar;