import { useState } from "react";
import { ReservationContext } from "./ReservationContext";
import type { Reservation } from "./ReservationContext";

function ReservationProvider({children}: { children?: React.ReactNode }) {

const [reservation, setReservation] = useState<Reservation>({} as Reservation);
const [reservationList, setReservationList] = useState<Reservation[]>([]);
const url = 'http://localhost:3000/reservations';

async function getReservation(id:string){
    const res = await fetch(url+"/"+id);
    const data = await res.json();
    setReservation(data);
}

async function postReservation(reservation:Reservation){
    const res = await fetch(url, {
        method:'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    });
    const data = await res.json()
}

async function putReservation(id:string, reservation:Reservation){
    const res = await fetch((url+"/"+id), {
        method:'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    });
    const data = await res.json()
}

async function deleteReservation(id:string){
    const res = await fetch((url+"/"+id), {
        method:'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
    });
    const data = await res.json()
}

async function getReservationList(){
    const res = await fetch(url);
    const data = await res.json();
    setReservationList(data);
}

return (
<ReservationContext.Provider value={{getReservation, postReservation, putReservation,deleteReservation, getReservationList,reservationList,...reservation}}>
{children}
</ReservationContext.Provider>
);
}
export default ReservationProvider;