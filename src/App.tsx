import './App.css'
import { BrowserRouter } from 'react-router'
import AppRoutes from './AppRoutes'
import UserProvider from './providers/UserProvider'

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
