import { useState } from "react";

function CreateRoom() {
    const [form, setForm] = useState<{ name: string, capacity: number }>();

    function handleChange(event) {
      console.log(event.target.value);
      setForm({...form,
        [event.target.name]: event.target.value,
      });
    }

    function handleSubmit(event) {
      event.preventDefault();
      console.log(form);
    }

    return (
    <>
      <label htmlFor="">nom de la salle (4 caractères minimum)</label>
      <input type="text" name="name" value={form?.name} onChange={handleChange}/>

      <label htmlFor="">capacité de la salle (nombre de personnes)</label>
      <input type="number" name="capacity" value={form?.capacity} onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>Ajouter</button>
    </>
  )

  }

  export default CreateRoom;