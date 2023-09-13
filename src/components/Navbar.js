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

    const statusmobile = () => {
        const token = localStorage.getItem("jwt");
        if(token || login){
            return [
                <>
                <Link to='/'><li><span class="material-symbols-outlined">home</span></li></Link>
                <Link to='/profile'><li><span class="material-symbols-outlined">account_circle</span></li> </Link>
                <Link to='/createpost'> <li><span class="material-symbols-outlined">add_box</span></li></Link>
                <Link to={""}>
                    <li onClick={()=> {setmodal(true)}}><span class="material-symbols-outlined">logout</span></li>
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
            <Link to='/'><img src={logo} alt='Instagram' id='instalogo'/></Link>
            <ul className='nav-menu'>
                {status()}
            </ul>
            <ul className='nav-mobile'>
                {statusmobile()}
            </ul>
        </div>
    )
}

export default Navbar;