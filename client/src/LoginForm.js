import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';


function LoginForm({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    return(
        <form onSubmit={handleSubmit} >
            <h2>Welcome to the Podcast Reviews App! </h2>
                <label htmlFor='username'>Username: </label>
            <input 
                type="text"
                id="username"
                autoComplete='off'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
                <label htmlFor='password'>Password: </label>
                <input
                type="password"
                id="password"
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button variant='fill' color='primary' type="submit">
                {isLoading ? "Loading..." : "Login"}
                </button>
        </form>
    )
}

export default LoginForm;