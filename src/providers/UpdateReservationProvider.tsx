import { updateReservationContext } from "../context/UpdateReservationContext";
import type { Reservation } from "../context/UpdateReservationContext";
import { useState } from "react";
import type { ReactNode } from "react";

function UpdateReservationProvider({ children }: { children: ReactNode}) {
    const [reservations, setReservations] = useState<Reservation[]>(
        [   
            {id: 1,
        salle_id: 1,
        date_debut: "2026-09-10", 
        date_fin: "2026-09-11",
        user_id: 1,
            }
        ]
    )
    function updateReservation(id: number, updatedReservation: Reservation) {
        const newReservations = reservations.map((element) => element.id === id ? updatedReservation : element);
        setReservations(newReservations)
    }

    return (
        <updateReservationContext.Provider value={{reservations, updateReservation}}>
            {children}
        </updateReservationContext.Provider>
    );
    
}


export default UpdateReservationProvider;