import { Link } from 'react-router-dom'
import { useState } from 'react'
import * as userService from "../../utilities/users-service"
import './NavBar.css'

export default function NavBar({ user, setUser }) {
    const [selectedPage, setSelectedPage] = useState('Daily View')
    
    function handleLogOut() {
        // Remove token using the user service
        userService.logOut();
        // Update user state in App
        setUser(null)
    }

    function handleLinkClick(evt) {
        setSelectedPage(evt.target.innerText)
    }

    return (
        <nav className='d-flex'>

            <span className="leftLogo display-3">Nourish</span>

            <div className='navBar-right'>
                <Link 
                to="/" 
                className={`text-decoration-none navBar-link ${selectedPage === 'Daily View' ? "selectedPage" : ""}`} 
                value='Daily View'
                onClick={handleLinkClick}
                >Daily View</Link>
                &nbsp;&nbsp;
                <Link 
                to="/" 
                className={`text-decoration-none navBar-link ${selectedPage === 'Daily View Two' ? "selectedPage" : ""}`}
                value='Daily View Two'
                onClick={handleLinkClick}
                >Daily View Two</Link>
                &nbsp;&nbsp;
                
                {/* <span>Hi {user.name}</span>
            &nbsp;&nbsp; */}
                <Link to="" onClick={handleLogOut} className='text-decoration-none'>Log Out</Link>
            </div>
        </nav>
    )
}