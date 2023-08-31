import React, {useContext} from 'react';
import logo from '../imgs/logo.png';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/navigation';

function Navbar({login}) {
    const {setmodal} = useContext(LoginContext)
    const status = () => {
        const token = localStorage.getItem("jwt");
        if(token || login){
            return [
                <>
                <Link to='/profile'> <li>Profile</li></Link>
                <Link to='/createpost'> <li>Create Post</li></Link>
                <Link to={""}>
                    <button className='logout' onClick={()=> {setmodal(true)}}>Log out</button>
                </Link>
                </>
            ]
        }
        else{
            return[
                <>
                <Link to='/signin'><li>Sign in</li></Link>
                <Link to='/signup'> <li>Sign up</li></Link>
                </>
            ]
        }
    }


    return (
        <div className='navbar'>
            <img src={logo} alt='Instagram'/>
            <ul className='nav-menu'>
                {status()}
            </ul>
        </div>
    )
}

export default Navbar;