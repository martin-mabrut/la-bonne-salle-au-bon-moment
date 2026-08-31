import { useState } from "react";

function CreateRoom() {
    const [form, setForm] = useState({ id: "", name: "", capacity: "" });

    function handleChange(event) {
      console.log(event.target.value);
      setForm({...form,
        [event.target.name]: event.target.value,
        [event.target.capacity]: event.target.value
      });
    }

    function handleSubmit(event) {
      event.preventDefault();
      console.log(form);
    }

    return (
    <>
      <label htmlFor="">nom de la salle (4 caractères minimum)</label>
      <input type="text" defaultValue={form.name} onChange={handleChange}/>

      <label htmlFor="">capacité de la salle (nombre de personnes)</label>
      <input type="number" defaultValue={form.capacity} />
      <button type="submit" onClick={handleSubmit}>Ajouter</button>
    </>
  )

  }

  export default CreateRoom;