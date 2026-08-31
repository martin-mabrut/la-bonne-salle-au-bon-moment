import { createContext } from "react";

export interface Reservation {
    id:number,
    salle_id:number,
    date_debut:string,
    date_fin:string,
    user_id:number
}

export const ReservationContext = createContext(null);

export async function getReservation(urlAPI:string):Promise<Reservation|unknown>{
    try{
        const response = await fetch(urlAPI);
        const data:Reservation = await response.json();
        if(!response.ok) {throw new Error("Erreur de récupération")};
        return data;
    } catch(error){
        return error;
    }
}

export async function getReservationsList(urlAPI:string):Promise<Reservation[]|unknown>{
    try{
        const response = await fetch(urlAPI);
        const data:Reservation = await response.json();
        if(!response.ok) {throw new Error("Erreur de récupération")};
        return data;
    } catch(error){
        return error;
    }
}
