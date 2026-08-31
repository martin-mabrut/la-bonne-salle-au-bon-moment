import { useState } from "react";

function CreateRoom() {
    const [form, setForm] = useState<{ name?: string, capacity?: number }>();
    const [error, setError] = useState("");

    function handleChange(event) {
        console.log(event.target.value);
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
console.log(form?.name);
        if (form?.name == undefined || form?.name.length < 4 ) {
            setError("Le nom de la salle est obligatoire et doit comporter au moins 4 caractères");
            return;
        }

        if (form?.capacity == undefined || form?.capacity == 0) {
             setError("La capacité de la salle doit être supérieure à 0");
             return;
        }

        setError("");
        console.log("formulaire envoyé"),

            console.log(form);

    }

    return (
        <>
            <label htmlFor="">nom de la salle (4 caractères minimum)</label>
            <input type="text" name="name" value={form?.name} onChange={handleChange} />

            <label htmlFor="">capacité de la salle (nombre de personnes)</label>
            <input type="number" name="capacity" value={form?.capacity} onChange={handleChange} />
            {error && <p>{error}</p>}

            <button type="submit" onClick={handleSubmit}>Ajouter</button>
        </>
    )

}

export default CreateRoom;