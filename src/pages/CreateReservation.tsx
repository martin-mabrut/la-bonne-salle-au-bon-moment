import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ReservationContext } from '../context/ReservationContext';
import { getReservation } from '../context/ReservationContext';

export function CreateReservation() {
  const url = 'http://localhost:3000/reservations/5';
  useEffect(()=>{getReservation(url).then(value=>console.log(value))},[]);
  return (
    <>
    
    </>
  )
}

export default CreateReservation
