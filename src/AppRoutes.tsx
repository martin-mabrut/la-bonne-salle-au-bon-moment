import { Route, Routes } from "react-router";
import FormCompte from "./composants/formCompte";
import LoginUser from "./pages/LoginUser";
import ProtectedRoute from "./composants/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CreateReservation from "./pages/CreateReservation";
import UpdateReservation from "./pages/UpdateReservation";
import NewRoom from "./pages/NewRoom";
import RoomList from "./pages/RoomList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginUser />} />
      <Route path="/roomlist" element={<RoomList />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/createreservation" element={<CreateReservation />} />
        <Route path="/reservations/:id" element={<UpdateReservation />} />
        <Route path="/signin" element={<FormCompte />} />
        <Route path="/dashboard/:role" element={<Dashboard />} />
        <Route path="/NewRoom" element={<NewRoom />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
