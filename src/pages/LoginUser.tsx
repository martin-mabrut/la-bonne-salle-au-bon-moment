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
        try {
            //Empêche l'email et le mot de passe en clair dans l'url
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
            <main className="min-h-screen bg-[#BCCCDB] flex flex-col items-center">
                <h2 className="mt-14 text-center text-4xl font-extrabold uppercase text-white">
                    Page de connexion
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="mt-9 flex w-full max-w-[295px] flex flex-col">
                    <div>
                        <input type="email"
                            className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white"
                            placeholder="Identifiants ou adresse mail"
                            {...register("email",
                                { required: "L'email est obligatoire", })} />
                        {errors.email && (<p className="text-xs text-red-600 mb-5">{errors.email.message}</p>)}
                    </div>
                    <div>
                        <input type="password"
                            className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white"
                            placeholder="Mot de passe"
                            {...register("password",
                                { required: "Le mot de passe est obligatoire", })} />
                        {errors.password && (<p className="text-xs text-red-600 mb-5">{errors.password.message}</p>)}
                    </div>
                    <button type="submit"
                        className="rounded-md bg-black px-3 py-2 text-sm border-[#FFFFFF] border-2 font-semibold text-white"
                    > Se connecter </button>
                </form>
            </main >
        </>
    )
}
export default LoginUser