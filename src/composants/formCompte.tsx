
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function FormCompte() {

    const checkEmailAvailable = async (email: string): Promise<[]> => {
        const response = await fetch(`http://localhost:3000/users?email=${email}`);
        const data = await response.json();
        return data;
    }

    const compteSchema = z.object({
        lastname: z.string()
            .min(2).max(100),
        firstname: z.string()
            .min(2)
            .max(100),
        email: z
            .string()
            .email("Veuillez entrer un email valide")
            .min(5, "Votre email doit contenir au moins 5 caractères")
            .refine(
                async (email) => {
                    const available = await checkEmailAvailable(email);
                    if (available.length == 0) {
                        return available;
                    }
                },
                { message: "Cet email est déjà utilisé" })
        ,
        password: z
            .string()
            .min(6, "Votre mot de passe doit contenir au moins 6 caractères")
            .max(100),
        roleId: z.string()
            .refine((value) => value !== "", { message: "Please select an option" })
    });



    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(compteSchema),
    });

    async function onSubmit(data) {
        console.log(data);

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data2 = await response.json();
            console.log(data2);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            <div className="min-h-screen bg-[#BCCCDB] flex flex-col items-center">

                <h2 className="text-center text-4xl font-bold uppercase text-black mb-10">Créer un nouveau compte</h2>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Last Name</label>
                            <input type="text" className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white"
                                {...register("lastname", { required: true })} />
                            {errors.nom && <p>{errors.nom.message}</p>}
                        </div>
                        <div>
                            <label>first Name</label>
                            <input type="text" className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white" {...register("firstname")} />
                            {errors.prenom && <p>{errors.prenom.message}</p>}
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white"{...register("email")} />
                            {errors.email && (<p>{errors.email.message}</p>)}
                        </div>

                        <div>
                            <label>Password</label>
                            <input type="password" className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white" {...register("password")} />
                            {errors.password && (<p>{errors.password.message}</p>)}
                        </div>
                        <div>
                            <label>Role:</label>
                            <div>

                                <select id="roleId" className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white"  {...register('roleId')}>
                                    <option value="">Select...</option>
                                    <option value="2">Formateur</option>
                                    <option value="1">Administrateur</option>
                                    <option value="3">Apprenant</option>
                                </select>
                                {errors.option && (<p>{errors.option.message}</p>)}
                            </div>
                        </div>
                        <button type="submit" className="rounded-md bg-black px-3 py-2 text-sm border-[#FFFFFF] border-2 font-semibold text-white" > Valider </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default FormCompte;