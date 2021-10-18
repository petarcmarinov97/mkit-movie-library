import React, { useState } from "react";
import '../Styles/RegisterPage/Register.css';
import { useHistory } from 'react-router-dom';

const Register = () => {

    const history = useHistory();
    const [ errors, setErrors ] = useState('');
    const [ passErrors, setPassErrors ] = useState('');
    
    async function registerSubmit(e){
    e.preventDefault();
    
    if(!(e.currentTarget.password.value===e.currentTarget.repeatPassword.value && e.currentTarget.password.value.length>4)){
        setPassErrors(`The password must be at least 5 characters \n The passwords must be the same`)
    }else{
        try{
            const response = await fetch('http://localhost:5000/api/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:e.currentTarget.email.value,
                    username:e.currentTarget.username.value,
                    password:e.currentTarget.password.value
                })
            })
            const data = await response.json();
            if(data.message){
                setErrors(data.message)
                console.log(data.message)
                throw new Error(data.message)
            }
            history.push('/login');
        }catch(err){
            console.error(err);
        }
    }
        
}


    return (
        <section>
            <form onSubmit={registerSubmit}>
            <div className="containerRegister">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr/>
            <label htmlFor="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" name="email" id="email" required />
            <label htmlFor="username"><b>Username</b></label>
            <input type="username" placeholder="Enter Username" name="username" id="username" required />
            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" id="password" required/>
            <label htmlFor="repreatPassword"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="repeatPassword" id="repeatPassword" required/>
            
            {passErrors
            ?<div className="passErrors">{passErrors}</div>
            : ''}

            {errors
            ?<div className="error">{errors}</div>
            : ''}
            
            <hr />
            <button type="submit" className="registerbtn">Register</button>
            </div>   
            <div className="container signin">
            <p>Already have an account? <a href="/login">Login</a>.</p>
            </div>  
            </form>
        </section>
    );

}

export default Register;