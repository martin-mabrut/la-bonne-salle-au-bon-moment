import { Route, Routes } from "react-router";
import LoginUser from "./pages/LoginUser";
import ProtectedRoute from "./composants/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginUser />} />
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/professor/dashboard"
                    element={<ProfessorDashboard />}
                />
            </Route>
        </Routes>
    );
}
export default AppRoutes;