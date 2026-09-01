import './App.css'
import { BrowserRouter } from 'react-router'
import AppRoutes from './AppRoutes'
import UserProvider from './providers/UserProvider'
import ReservationProvider from './context/ReservationProvider'

function App() {

  return (
    <>
      <UserProvider>
        <ReservationProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        </ReservationProvider>
      </UserProvider>
    </>
  )
}

export default App;
