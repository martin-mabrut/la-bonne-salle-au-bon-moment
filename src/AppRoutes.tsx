import { Route, Routes } from "react-router";
import FormCompte from "./composants/formCompte";
import LoginUser from "./pages/LoginUser";
import ProtectedRoute from "./composants/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CreateReservation from "./pages/CreateReservation";
import NewRoom from "./pages/NewRoom";
import UpdateReservation from "./pages/UpdateReservation";

import NewRoom from "./pages/NewRoom";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/signin" element={<FormCompte />} />
            <Route path="/login" element={<LoginUser />} />

            <Route path="/createreservation" element={<CreateReservation/>}/>
            <Route path="/NewRoom" element={<NewRoom />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard/:role" element={<Dashboard />}/>
                <Route path="/NewRoom" element={<NewRoom/>} />
            </Route>
            <Route path="/reservations/:id" element={<UpdateReservation />}/>
        </Routes>
    );
}
export default AppRoutes;
