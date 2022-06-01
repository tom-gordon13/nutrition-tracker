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
            <Link to="/orders">Order History</Link>
            &nbsp; &nbsp;| &nbsp;&nbsp;
            <Link to="/orders/new">New Order</Link>
            &nbsp;&nbsp;
            <span>Hi {user.name}</span>
            &nbsp;&nbsp;
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}