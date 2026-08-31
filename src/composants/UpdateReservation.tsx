import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";

function UpdateReservation() {

    const {id} = useParams();

    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        const fetchReservation = async () => {
            const response = await fetch(`http://localhost:3000/reservations/${id}`)
            const data = await response.json();
            setReservation(data)
        };

        fetchReservation();
    }, [id]);

    useEffect(() => {
        console.log(reservation)
    }, [reservation])

    function postReservation() {
        
    }

return  <div>
        </div>

};

export default UpdateReservation;