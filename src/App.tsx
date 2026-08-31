import './App.css'
import UpdateReservation from "./composants/UpdateReservation"
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {

  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route
                    path="/reservations/:id"
                    element={<UpdateReservation />}
                />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
