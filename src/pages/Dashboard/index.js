import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"

export default function Dashboard() {

    const { logoutUser } = useContext(UserContext);

    return (
        <div>
            <h1>This is a dashboard</h1>
            <button onClick={logoutUser}>Logout</button>
        </div>
    )
}