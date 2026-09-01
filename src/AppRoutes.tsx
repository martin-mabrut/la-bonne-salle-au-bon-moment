import { Route, Routes } from "react-router";
import FormCompte from "./composants/formCompte";
import LoginUser from "./pages/LoginUser";
import ProtectedRoute from "./composants/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
// import CreateRoom from "./pages/CreateRoom";
import NewRoom from "./pages/NewRoom";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/signin" element={<FormCompte />} />
            <Route path="/login" element={<LoginUser />} />
            {/* <Route path="/CreateRoom" element={<CreateRoom />} /> */}
            <Route path="/NewRoom" element={<NewRoom />} />
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/dashboard/:role"
                    element={<Dashboard />}
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
