import { useState } from 'react'
import './App.css'
import ReservationProvider from './context/ReservationProvider';
import CreateReservation from './pages/CreateReservation';

function App() {

  return (
    <>
    <ReservationProvider>
      <CreateReservation/>
    </ReservationProvider>
    </>
  )
}

export default App
