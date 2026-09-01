import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import { UserContext } from "../context/UserContext";
import type { Reservation } from "../context/ReservationContext";
import ReservationCard from "../composants/ReservationCard";


function ViewReservation(){
    const {user, userList,getUserList}=useContext(UserContext);
    useEffect(()=>{getUserList()},[]);
    const {getReservation,postReservation, putReservation, deleteReservation,getReservationList,reservationList,...reservation} = useContext(ReservationContext);
    useEffect(()=>{getReservationList()},[]);
    const [userReservationList, setUserReservationList] = useState<Reservation[]>([]);
    useEffect(()=>{
        if(!user) {
            return;
        }
        reservationList.forEach((res)=>{
            if(res.user_id==user.id) {
            setUserReservationList([...userReservationList,res])
            }
        })
    },[reservationList])

    return(
        <>
        {reservationList.map((reservation)=>(
            <ReservationCard key={reservation.id} reservation={reservation}/>
        ))}
        </>
    );
}

export default ViewReservation