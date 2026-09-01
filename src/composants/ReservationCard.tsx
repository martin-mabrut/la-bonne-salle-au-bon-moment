import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Reservation } from "../context/ReservationContext";

interface ReservationCardProps {
    reservation: Reservation;
}

function ReservationCard({ reservation }: ReservationCardProps) {
    const navigate = useNavigate();
    const [salleName, setSalleName] = useState("");

    useEffect(() => {
        const fetchSalle = async () => {
            const response = await fetch(`http://localhost:3000/salles/${reservation.salle_id}`);
            const data = await response.json();
            setSalleName(data.name);
        };

        fetchSalle();
    }, [reservation.salle_id]);

    function handleModifier() {
        navigate(`/reservations/${reservation.id}`);
    }

    function handleSupprimer() {
    }

    return (
        <div>
            <p>Salle : {salleName}</p>
            <p>Date de début : {reservation.date_debut}</p>
            <p>Date de fin : {reservation.date_fin}</p>

            <button onClick={handleModifier}>Modifier</button>
            <button onClick={handleSupprimer}>Supprimer</button>
        </div>
    );
}

export default ReservationCard;
