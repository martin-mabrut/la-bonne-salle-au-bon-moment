import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import type { Reservation } from "../context/ReservationContext";
import { ReservationContext } from "../context/ReservationContext";

interface ReservationCardProps {
    reservation: Reservation;
}

function ReservationCard({ reservation }: ReservationCardProps) {
    const navigate = useNavigate();
    const [salleName, setSalleName] = useState("");

    const { deleteReservation } = useContext(ReservationContext);

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
        deleteReservation(reservation.id)
    }

    return (
        <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">Salle : <span className="font-medium text-gray-900">{salleName}</span></p>
            <p className="text-sm text-gray-500">Date de début : <span className="font-medium text-gray-900">{reservation.date_debut}</span></p>
            <p className="text-sm text-gray-500">Date de fin : <span className="font-medium text-gray-900">{reservation.date_fin}</span></p>

            <div className="mt-4 flex gap-2">
                <button
                    onClick={handleModifier}
                    className="flex-1 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                >
                    Modifier
                </button>
                <button
                    onClick={handleSupprimer}
                    className="flex-1 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
}

export default ReservationCard;
