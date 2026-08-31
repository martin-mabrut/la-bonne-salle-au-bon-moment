import {useForm} from "react-hook-form";


function NewRoom(){
    const { register, handleSubmit, formState: { errors } } = useForm();

async function onSubmit(data: FormData) {
    console.log(data);

        try {
            const response = await fetch("http://localhost:3000/salles",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Erreur dans la création de salle:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nom de la salle (5 caractères minimum)</label>
                <input type="text" {...register("name",{required: "Le nom de la salle est obligatoire", minLength: {value: 5, message: "Le nom de la salle doit comporter au moins 5 caractères"}})} />
                {errors.name && (<p>{errors.name.message}</p>)}
            </div>
                        <div>
                <label >Capacité de la salle supérieur à 0</label>
                <input type="number" {...register("capacity",{required: "La capacité ne doit pas être nulle"})} />
                {errors.capacity && (<p>{errors.capacity.message}</p>)}
            </div>
            <button type="submit">Enregistrer la salle</button>
        </form>
    )
}

export default NewRoom;
