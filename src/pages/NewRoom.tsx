import { useForm } from "react-hook-form";
import { useState } from "react";

type RoomFormData = {
    name: string;
    capacity: number;
};

function NewRoom() {
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<RoomFormData>({mode: "onChange"});
    const [success, setSuccess] = useState(false);
    
    async function onSubmit(data: FormData) {
        console.log(data);

        try {
            const response = await fetch("http://localhost:3000/salles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);

            setSuccess(true);
            reset();
            setTimeout(() => setSuccess(false), 5000);

        } catch (error) {
            console.error("Erreur dans la création de salle:", error);
        }
    };

    return (
        <>
            <h1 className="h1 text-center text-2xl p-2 mb-15">CREATION DE SALLE</h1>
                <form className="flex flex-col items-center p-6 space-y-8 min-h-screen min-w-screen p-3" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex items-center justify-between gap-6">
                        <label className="text-black bg-[#D9D9D9] p-2 w-[84px]">Nom</label>
                        <input className="bg-white m-2 p-2 w-[212px]" type="text" {...register("name", { required: "Le nom de la salle est obligatoire", minLength: { value: 5, message: "Le nom de la salle doit comporter au moins 5 caractères" } })} />
                        {errors.name && (<p>{errors.name.message}</p>)}
                    </div>
                    <div className="flex items-center justify-between gap-6">
                        <label className="text-black bg-[#D9D9D9] p-2 w-[84px]">Capacité</label>
                        <input className="bg-white m-2 p-2 w-[212px]" type="number" {...register("capacity", { required: "La capacité ne doit pas être nulle" })} />
                        {errors.capacity && (<p>{errors.capacity.message}</p>)}
                    </div>
                    
                    <button disabled={!isValid} className="w-44 text-white bg-black border-2 border-white rounded-xl p-2" type="submit">Valider</button>
                </form>

            {success && (
                <div className="fixed bottom-6 right-6 flex items-center gap-3 rounded-lg bg-green-600 px-5 py-3 text-white shadow-lg">
                    <span>✓ Salle créée avec succès !</span>
                </div>
            )}
        </>
    )
}

export default NewRoom;