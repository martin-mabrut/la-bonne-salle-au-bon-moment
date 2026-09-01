import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router";
import type { ChangeEvent } from "react";
import { UserContext } from "../context/UserContext";

function UpdateReservation() {

    const context = useContext(UserContext);
    const user = context?.user; 
    const navigate = useNavigate();

    interface Reservation { 
        "id"?: string, 
        "salle_id": string,
        "date_debut": string,
        "date_fin": string, 
        "user_id": string
    }

    const {id} = useParams();

    const [reservation, setReservation] = useState<Reservation | null>(null);

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

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [event.target.name]:event.target.value
        });
    }

    async function putReservation(id: string, donnees: Reservation) {
        const response = await fetch(`http://localhost:3000/reservations/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(donnees),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        return response.json();
        }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {

        event.preventDefault();

        if (reservation===null) {
            return;
        }

        if(reservation.user_id !== user.id || user.roleId !== "1"){
            navigate(`/dashboard/${user?.roleLabel}`);
            return;
        }

        const newReservation = {
            "salle_id": form.salle_id,
            "date_debut": form.date_debut,
            "date_fin": form.date_fin,
            "user_id": reservation.user_id
        };

        if(typeof id === "string") {
        await putReservation(id, newReservation);
        }

        console.log(newReservation);
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