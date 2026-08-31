import { Routes, Route } from "react-router-dom";
// import CreateRoom from "./pages/CreateRoom";
import NewRoom from "./pages/NewRoom";


function AppRoutes() {
    return (
        <Routes>
            {/* <Route path="/CreateRoom" element={<CreateRoom />} /> */}
            <Route path="/NewRoom" element={<NewRoom/>} />
        </Routes>
    );
}

export default AppRoutes;
