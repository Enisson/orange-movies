import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"

export default function Dashboard() {

    const { logoutUser, name } = useContext(UserContext);

    return (
        <div>
            <h1>This is a dashboard</h1>
            <p>Seja bem vindo, {name}! </p>
            <button onClick={logoutUser}>Logout</button>
        </div>
    )
}