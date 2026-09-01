import { Route, Routes } from "react-router";
import FormCompte from "./composants/formCompte";
import LoginUser from "./pages/LoginUser";
import ProtectedRoute from "./composants/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CreateReservation from "./pages/CreateReservation";

import NewRoom from "./pages/NewRoom";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/signin" element={<FormCompte />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/createreservation" element={<CreateReservation/>}/>
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
            {/* <Route path="/CreateRoom" element={<CreateRoom />} /> */}
            <Route path="/NewRoom" element={<NewRoom/>} />
        </Routes>
    );
}

export default AppRoutes;
