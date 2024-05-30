import { NavLink, Link, Outlet } from 'react-router-dom';
import "./NavBar.css";

function NavBar() {
    return (
        <div>
            <header>
            <nav>
                <NavLink
                to="/"
                className="nav-link"
                >
                Home
                </NavLink>
                <NavLink
                to='/newpodcastform'
                className="nav-link"
                >
                New Podcast Form
                </NavLink>
                <NavLink
                to='/logout'
                className='nav-link'
                >
                Logout
                </NavLink>
            </nav>
            </header>
            <main>
            </main>
        </div>
    )

}

export default NavBar;