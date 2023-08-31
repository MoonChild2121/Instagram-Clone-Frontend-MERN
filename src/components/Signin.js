import React, { useState, useContext } from "react";
import logo from '../imgs/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { BiInfoCircle } from "react-icons/bi"; // Import the icon
import { LoginContext } from "../context/navigation";

function Signin() {
    const {setuserlogin}=useContext(LoginContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

    const [error, setError] = useState(""); // State to store error message

    const login = () => {
        if (!email || !password) {
            setError("Please fill in all the required fields");
            return;
        }

        if (!validEmail.test(email)) {
            setError("Please enter a valid email");
            return;
        }

        setError(""); // Clear any previous error message

        fetch('http://localhost:5000/signin', {
            method: 'post',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(data.error); // Set the error message
            } else {
                setError(""); // Clear error message
                console.log(data)
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                setuserlogin(true)
                navigate("/");
            }
            console.log(data);
        });
    }

    return (
        <div className="signup">
            <div className="form-container">
                <img src={logo} alt="Instagram" style={{ width: '300px', height: '70px' }} />
                <div className="logininputs" style={{ marginTop: '10px' }}>
                    <input type="email" id="email" name="email" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                </div>
                <div className="logininputs">
                    <input type="password" id="password" name="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                </div>
                {error && <p className="error-message-popover"><BiInfoCircle className="info-icon" />{error}</p>}
                <input type="submit" value="Sign In" id="submit-btn" onClick={login} ></input>
            </div>
            <div className="form-2">
                Dont have an account?
                <Link to='/signup'> <span style={{ color: 'blue', cursor: 'pointer', fontSize: '17px' }}>Sign up</span></Link>
            </div>
        </div>
    )
}

export default Signin;
