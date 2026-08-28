import { Route, Routes } from "react-router";
import LoginUser from "./pages/LoginUser";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginUser />} />
        </Routes>
    );
}
export default AppRoutes;