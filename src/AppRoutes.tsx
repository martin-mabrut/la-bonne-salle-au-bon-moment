import { Routes, Route } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/CreateRoom" element={<CreateRoom />} />
        </Routes>
    );
}

export default AppRoutes;
