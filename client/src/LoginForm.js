import React, { useState } from 'react';

function LoginForm({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true);
        fetch("/loginform", {
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
            <formfield>
                <label htmlFor='username'>Username</label>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </formfield>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;