import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import SignupForm from './SignupForm';


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
        <form onSubmit={handleSubmit} >
            <h2>Welcome to the Podcast Reviews App! </h2>
            <h4>Please enter your account's username and password to view Podcast Information</h4>
                <label htmlFor='username'>Username:</label>
            <input 
                type="text"
                id="username"
                autoComplete='off'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
                <label htmlFor='password'>Password:</label>
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
                <h4>Don't have an account?  Sign up here:</h4>
                <button onClick={handleSignUpClick}>Signup</button>
                {showSignUp ? <SignupForm /> : null}
        </form>
    )
}

export default LoginForm;