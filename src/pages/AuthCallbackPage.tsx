import { useCreateMyUser } from "../api/createUserApi"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const AuthCallbackPage = () => {


    const navigate = useNavigate()
    const { user } = useAuth0()
    const hashCreatedUser = useRef(false)

    const { createUser } = useCreateMyUser()

    useEffect(() => {
        if (user?.sub && user?.email && !hashCreatedUser.current) {
            createUser({ auth0Id: user.sub, email: user.email })

            hashCreatedUser.current = true // Only create user once per session
        }
        navigate("/") // Redirect to home page after user creation or login
    }, [createUser, user, navigate])

    return (
        <div>Loading...</div>
    )
}

export default AuthCallbackPage