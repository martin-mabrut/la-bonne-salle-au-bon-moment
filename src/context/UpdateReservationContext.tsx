import { createContext } from 'react';

export interface Reservation {
    id: number,
    salle_id: number,
    date_debut: string, 
    date_fin: string,
    user_id: number,
}

type UpdateReservationContextType = {
    reservations: Reservation[];
    updateReservation(id: number, updatedReservation: Reservation): void;
}

export const updateReservationContext = createContext<UpdateReservationContextType | null>(null);