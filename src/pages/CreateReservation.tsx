import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import type { Reservation } from "../context/ReservationContext";

function CreateReservation(){
  const {getReservation,postReservation, putReservation, deleteReservation,getReservationList,reservationList,...reservation} = useContext(ReservationContext);
  useEffect(()=>{getReservationList()},[]);

  return(
    <>
    
    </>
  );
}

export default CreateReservation;