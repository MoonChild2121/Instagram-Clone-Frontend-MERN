import React from "react";
import logo from '../imgs/logo.png';
import { Link } from "react-router-dom";


function Signin() {
    return(
        <div className="signup">
            <div className="form-container">
            <img src={logo} alt="Instagram" style={{width:'300px', height:'70px'}} />
            <div className="logininputs" style={{marginTop:'10px'}}>
                <input type="email" id="email" name="email" placeholder="email"></input>
            </div>
            <div className="logininputs">
                <input type="password" id="password" name="password" placeholder="password"></input>
            </div>
            <input type="submit" value="Sign In" id="submit-btn" ></input>
            </div>
            <div className="form-2">
                Dont have an account? 
                <Link to='/signup'> <span style={{color:'blue', cursor:'pointer', fontSize:'17px'}}>Sign up</span></Link>
            </div>
        </div>
    )
}

export default Signin;