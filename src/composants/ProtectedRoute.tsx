import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context/UserContext";

type requiredRoleInfo = {
    requiredRole?: string;
};

function ProtectedRoute({ requiredRole }: requiredRoleInfo) {
    const context = useContext(UserContext);

    const { user } = context;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Mauvais rôle
    if (requiredRole && user.roles !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;