import { Route, Routes } from "react-router";
import LoginUser from "./pages/LoginUser";
import ProtectedRoute from "./composants/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import UpdateReservation from "./pages/UpdateReservation";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginUser />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard/:role" element={<Dashboard />}/>
                
            </Route>
            <Route path="/reservations/:id" element={<UpdateReservation />}/>
        </Routes>
    );
}
export default AppRoutes;