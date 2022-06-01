import * as usersService from "../../utilities/users-service"

export default function OrderHistoryPage() {
    async function handleCheckToken() {
        const expDate = await usersService.checkToken()
        console.log(expDate)
    }
    
    return (
        <div>
            <h1>OrderHistoryPage</h1>
            <button onClick={handleCheckToken}>Check When Login Expires</button>
        </div >
    )
}