import React, { useState } from 'react';
import SignupForm from './SignupForm';
import './App.css';
import styled from 'styled-components';
import Label from './Label.js'


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

    const H1 = styled.h1`
    color: blue;
    font-size: 4rem;
    `

    const H4 = styled.h1`
    color: blue;
    `

    return(
        <div className='Login'>
            {showSignUp ? (<SignupForm /> ): (
        <form onSubmit={handleSubmit} >
            <H1>Welcome to the Podcast Reviews App! </H1>
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
                <H4>Don't have an account?  Sign up here:</H4>
                <button onClick={handleSignUpClick}>Signup</button>
        </form>
        )}
        </div>
    )
}

export default LoginForm;