import React, { useState } from "react";
import '../Styles/LoginPage/Login.css';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();
    const [ errors, setErrors ] = useState('');

    const loginSubmit = async (e) =>{
            e.preventDefault();
            try{
                const response = await fetch('http://localhost:5000/api/login',{
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email:e.currentTarget.email.value,
                        password:e.currentTarget.password.value
                    }),
                })
                const data = await response.json();
                
                if(data.message){
                    setErrors(data.message)
                    throw new Error(data.message)
                }
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('user', JSON.stringify(data))
                history.push('/', {isLogged: true});
            }catch(err){
                console.error(err.message);
            }
}

    return (
    <form onSubmit={loginSubmit}>
        <div className="containerLogin">
        <h1>Login</h1>
        <p>Please fill in this form to create an account.</p>
        <hr/>
        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Enter Email" name="email" id="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter Password" name="password" id="password" required/>
        {errors
        ?<div className="error">{errors}</div>
        : ''}
        <hr />
        <button type="submit" className="loginbtn">Login</button>
        </div>

        <div className="container register">
        <p>Don't have an account? <a href="/register">Sign up</a>.</p>
        </div>  
    </form>
    );
}
 
export default Login;