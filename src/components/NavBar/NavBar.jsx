import { Link } from 'react-router-dom'
import * as userService from "../../utilities/users-service"

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
        // Remove token using the user service
        userService.logOut();
        // Update user state in App
        setUser(null)
    }
    
    
    return (
        <nav>
            
            <Link to="/food">Food Test</Link>
            &nbsp;&nbsp;
            <Link to="/">Day View</Link>
            &nbsp;&nbsp;
            {/* <Link to="/food/new">Food Test NEW</Link> */}
            &nbsp;&nbsp;
            <span>Hi {user.name}</span>
            &nbsp;&nbsp;
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}