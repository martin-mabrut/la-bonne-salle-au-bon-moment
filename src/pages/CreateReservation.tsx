import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import type { Reservation } from "../context/ReservationContext";

function CreateReservation(){
  const {getReservation,postReservation, putReservation, deleteReservation,...reservation} = useContext(ReservationContext);
  const[oldReservation, setOldReservation] = useState({}as Reservation);
  useEffect(()=>{getReservation("1")},[]);

  return(
    <>
    <p>{reservation.id}</p>
    <p>{reservation.salle_id}</p>
    <p>{reservation.date_debut}</p>
    <button onClick={()=>putReservation("1",{
    id:"1",
    salle_id:5,
    date_debut:"2O26-09-20",
    date_fin:"2026-09-21",
    user_id:19
    })}>click</button>
    <button onClick={()=>deleteReservation("uj3idBZsh1E")}>refresh</button>
    </>
  );
}

export default CreateReservation;