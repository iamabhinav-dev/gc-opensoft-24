import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    return (
        auth?.user
            ? <Navigate to="/" replace/>
            : <Outlet/>
    );
}

export default RequireAuth;