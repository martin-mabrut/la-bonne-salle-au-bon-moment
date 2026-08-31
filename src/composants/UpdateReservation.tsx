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

    const [form, setForm] = useState({
        salle_id:"",
        date_debut:"",
        date_fin:"",
    })

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]:event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        setReservation({
            "id": reservation.id,
            "salle_id": form.salle_id,
            "date_debut": form.date_debut,
            "date_fin": form.date_fin,
            "user_id": reservation.user_id
        });
    }

    function postReservation() {
    }

return  <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Salle</label>
                    <input name = "salle_id" value={form.salle_id} onChange={handleChange}/>
                </div>

                <div>
                    <label>Date de début</label>
                    <input name = "date_debut" value={form.date_debut} onChange={handleChange}/>
                </div>

                <div>
                    <label>Date de fin</label>
                    <input name = "date_fin" value={form.date_fin} onChange={handleChange}/>
                </div>

                <button type="submit">Modifier</button>
                <button>Annuler</button>

            </form>
        </div>

};

export default UpdateReservation;