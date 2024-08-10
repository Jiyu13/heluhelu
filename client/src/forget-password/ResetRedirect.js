import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ResetRedirect() {
    const location = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const token = searchParams.get("token")
        if (token) {
            navigate('/reset_password', {state: {token: token}})
        } else {
            navigate("/")
        }
    }, [location, navigate])

    return (
        <div></div>
    )
}