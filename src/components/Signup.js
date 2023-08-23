import React, {useState } from "react";
import logo from '../imgs/logo.png';
import './Signupin.css';
import { Link, useNavigate } from "react-router-dom";


function Signup() {

    const [name, setName] = useState('');
    const [username, setUserame] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/; //regex email validation
    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; //regex password validation

    const postdata = () => {
        //email validation
        if (!validEmail.test(email)) {
            window.alert("Please enter a valid email")
            return;
        }
        if(!validPassword.test(password)) {
            window.alert("Password must have minimum eight characters, at least one letter, one number and one special character")
            return;
        }
        fetch('http://localhost:5000/signup', {
            method: 'post',
            headers: {
                'content-Type': 'application/json'
            },
            body:JSON.stringify ({
                name:name,
                username:username,
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error) {
                window.alert(data.error)
            }
            else{
                window.alert(data.message)
                navigate("/signin")
            }
            console.log(data)
        })
    }
    
    return(
        <div className="signup">
            <div className="form-container">
                <img src={logo} className="imgstyle" alt="instagram"/> 
                <p className="login-text">Sign up to see photos and videos<br/> from your friends.</p>
                <div>
                    <input type="email" id="email" name="email" placeholder="email" value={email} onChange={(e)=> {setEmail(e.target.value)}}></input>
                </div>
                <div>
                    <input type="name" id="name" name="name" placeholder="full name" value={name} onChange={(e)=> {setName(e.target.value)}}></input>
                </div>
                <div>
                    <input type="username" id="username" name="username" placeholder="username" value={username} onChange={(e)=> {setUserame(e.target.value)}}></input>
                </div>
                <div>
                    <input type="password" id="password" name="password" placeholder="password" value={password} onChange={(e)=> {setPassword(e.target.value)}}></input>
                </div>
                <p className="login-terms">By signing up, you agree to our Terms , Privacy<br/> Policy and Cookies Policy .</p>
                <input type="submit" id="submit-btn" value="Sign Up" onClick={()=>{postdata()}}/>
            </div>
            <div className="form-2">
                Already have an account? 
                <Link to='/signin'> <span style={{color:'blue', cursor:'pointer', fontSize:'17px'}}>Sign in</span></Link>
            </div>
        </div>
    )
}

export default Signup;