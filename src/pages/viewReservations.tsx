import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import { UserContext } from "../context/UserContext";
import type { Reservation } from "../context/ReservationContext";

function ViewReservation(){
    const {user, userList,getUserList}=useContext(UserContext);
    useEffect(()=>{getUserList()},[]);
    const {getReservation,postReservation, putReservation, deleteReservation,getReservationList,reservationList,...reservation} = useContext(ReservationContext);
    useEffect(()=>{getReservationList()},[]);
    const [userReservationList, setUserReservationList] = useState<Reservation[]>([]);
    useEffect(()=>{
        reservationList.forEach((res)=>{
            res.user_id==user.id && setUserReservationList([...userReservationList,res])
        })
    },[reservationList])

    return(
        <>
        {reservationList.map((reservation)=>(
            <></> // appel carte 
        ))}
        </>
    );
}

export default ViewReservation