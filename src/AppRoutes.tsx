import { Route, Routes } from "react-router";
import FormCompte from "./composants/formCompte";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/signin" element={<FormCompte />} />
        </Routes>
    );
}

export default AppRoutes;