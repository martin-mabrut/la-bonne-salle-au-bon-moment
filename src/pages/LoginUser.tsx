import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

function LoginUser() {

    const context = useContext(UserContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { login } = context;

    async function onSubmit(data) {
        console.log(data);
        try {
            const response = await fetch(
                `http://localhost:3000/users?email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`
            );

            if (!response.ok) {
                throw new Error("Erreur lors de la connexion");
            }

            const users = await response.json();

            // Aucun utilisateur trouvé
            if (users.length === 0) {
                alert("Email ou mot de passe incorrect");
                return;
            }
            const user = users[0];

            const roleResponse = await fetch(
                `http://localhost:3000/roles/${user.roleId}`
            );

            const role = await roleResponse.json();

            //On enregistre l'info du rôle
            const userWithRole = {
                ...user,
                roleLabel: role.label,
            };

            console.log(
                "Utilisateur avec rôle :",
                userWithRole
            );

            //Stockage dans le contexte
            login(userWithRole);

            //Redirection
            navigate(`/dashboard/${role.label}`);

        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue");
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-black">Email</label>
                    <input type="email"
                        className="block rounded-md bg-white border border:bg-[#A0AAAB]"
                        {...register("email",
                            { required: "L'email est obligatoire", })} />
                    {errors.email && (<p>{errors.email.message}</p>)}
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">Mot de passe</label>
                    <input type="password"
                        className="block rounded-md bg-white border border:bg-[#A0AAAB]"
                        {...register("password",
                            { required: "Le mot de passe est obligatoire", })} />
                    {errors.password && (<p>{errors.password.message}</p>)}
                </div>
                <button type="submit"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white"
                > Se connecter </button>
            </form>
        </>
    )
}
export default LoginUser