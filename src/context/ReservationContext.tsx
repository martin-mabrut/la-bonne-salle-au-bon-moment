import { createContext } from "react";

export type Reservation = {
    id:string,
    salle_id:string,
    date_debut:string,
    date_fin:string,
    user_id:string
}

export interface ReservationContextType extends Reservation {
    getReservation:(id:string)=>void;
    postReservation:(reservation:Reservation)=>void;
    putReservation:(id:string, reservation:Reservation)=>void;
    deleteReservation:(id:string)=>void;
    getReservationList:()=>void;
    reservationList:Reservation[];
}

export const ReservationContext = createContext<ReservationContextType>(
    {} as ReservationContextType
);