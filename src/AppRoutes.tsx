import { Route, Routes } from "react-router";
import FormCompte from "./composants/formCompte";
import LoginUser from "./pages/LoginUser";
import ProtectedRoute from "./composants/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function AppRoutes() {
    return (
        <Routes>

            <Route path="/login" element={<LoginUser />} />
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/dashboard/:role"
                    element={<Dashboard />}
                />
                <Route path="/signin" element={<FormCompte />} />
            </Route>
        </Routes>
    );
}
export default AppRoutes;