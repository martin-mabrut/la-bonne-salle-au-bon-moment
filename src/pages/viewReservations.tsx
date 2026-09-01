import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import { UserContext } from "../context/UserContext";
import type { Reservation } from "../context/ReservationContext";
import ReservationCard from "../composants/ReservationCard";
import { Link } from "react-router";


function ViewReservation(){
    const {user, userList,getUserList}=useContext(UserContext);
    useEffect(()=>{getUserList();console.log(user)},[]);
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
        <Link to="/createreservation"><button>Réserver une salle</button></Link>
        {reservationList.map((reservation)=>(
            <ReservationCard key={reservation.id} reservation={reservation}/>
        ))}
        </>
    );
}

export default ViewReservation