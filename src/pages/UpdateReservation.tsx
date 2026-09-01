import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import type { ChangeEvent } from "react";
import { UserContext } from "../context/UserContext";
import { ReservationContext } from "../context/ReservationContext";
import { RoomContext } from "../context/RoomContext";

function UpdateReservation() {

    const context = useContext(UserContext);
    const user = context?.user; 
    const navigate = useNavigate();
    const {getReservation,postReservation, deleteReservation,getReservationList,reservationList} = useContext(ReservationContext);
    const {getRoom, postRoom, putRoom,deleteRoom, getRoomList,roomList,...room} = useContext(RoomContext);
    useEffect(()=>{getRoomList()},[]);
    useEffect(()=>{getReservationList()},[]);

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

    const [form, setForm] = useState({
        salle_id:"",
        date_debut:"",
        date_fin:"",
    })

    useEffect(() => {
        if (reservation) {
            setForm({
                salle_id: reservation.salle_id,
                date_debut: reservation.date_debut,
                date_fin: reservation.date_fin,
            });
        }
    }, [reservation]);

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

        if(reservation.user_id !== user?.id && user?.roleId !== "1"){
            navigate(`/dashboard/${user?.roleLabel}`);
            return;
        }

        const confirmed = window.confirm("Voulez-vous vraiment modifier cette réservation ?");
            if (!confirmed) {
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
        window.alert("Modifications effectuées avec succès.");
        }
    }

    

return  <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Salle</label>
                    <select name = "salle_id" value={form.salle_id} onChange={e=>{setForm({...form,salle_id:e.target.value})}} required>
                        {roomList.map((room)=>(
                            <option key={room.id} value={room.id}>{room.name} / capacité : {room.capacity}</option>
                         ))}
                    </select>

                </div>

                <div>
                    <label>Date de début</label>
                    <input type="datetime-local" step="3600" name = "date_debut" value={form.date_debut} onChange={handleChange} required/>
                </div>

                <div>
                    <label>Date de fin</label>
                    <input type="datetime-local" step="3600" name = "date_fin" value={form.date_fin} onChange={handleChange} required/>
                </div>

                <button type="submit">Modifier</button>
                <button>Annuler</button>

            </form>

        </div>

};

export default UpdateReservation;