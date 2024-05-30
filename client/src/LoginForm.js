import React, { useState } from 'react';


function LoginForm() {

    const [user, setUser] = useState(null)
    // pass down user and setUser as a prop
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
                r.json().then((user) => setUser(user))
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    // function handleLogin(username) {
    //     setUsername(username)
    // }

    return(
        <form onSubmit={handleSubmit} >
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