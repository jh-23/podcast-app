import React, { useState } from 'react';
import SignupForm from './SignupForm';
import './App.css';
import Label from './Label.js'
import H1 from './H1';
import H4 from './H4';


function LoginForm({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user))
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    function handleSignUpClick(){
        setShowSignUp(true)
    }

    return(
        <div className='Login'>
            {showSignUp ? (<SignupForm /> ): (
        <>
        <form onSubmit={handleSubmit} >
            <H1>Welcome to the Podcast Reviews App! </H1>
            <br />
            <br />
            <br />
            <H4>Please enter your account's username and password to view Podcast Information</H4>
                <Label htmlFor='username'>Username:</Label>
            <input 
                type="text"
                id="username"
                autoComplete='off'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
                <Label htmlFor='password'>Password:</Label>
                <input
                type="password"
                id="password"
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                >
                </input>
                <br />
                <button variant='fill' color='primary' type="submit">
                {isLoading ? "Loading..." : "Login"}
                </button>
                <h4 className='loginform-h4'>Don't have an account?  Click the Sign up button:</h4>
                
        </form>
        <button onClick={handleSignUpClick}>Sign up Here! </button>
        </>
        )}
        </div>
    )
}

export default LoginForm;