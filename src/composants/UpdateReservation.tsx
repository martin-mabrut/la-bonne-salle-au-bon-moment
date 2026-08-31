import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";

function UpdateReservation() {

    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        const fetchReservation = async () => {
            const response = await fetch('http://localhost:3000/reservations')
            const data = await response.json();
            setReservation(data)
        };

        fetchReservation();
    }, []);

    useEffect(() => {
        console.log(reservation)
    }, [reservation])

return  <div>
        </div>

};

export default UpdateReservation;