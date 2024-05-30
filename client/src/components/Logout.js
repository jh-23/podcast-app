import React from 'react';
import { useOutletContext } from 'react-router-dom';

function Logout() {

    const {user, setUser} = useOutletContext();

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null)
            }
        })
    }

    return(

        <div>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    )
}

export default Logout;