import { useForm } from "react-hook-form";

function LoginUser() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    async function onSubmit(data) {

        console.log(data);
        // appel à l'API ici
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-black">Email</label>
                    <input type="email"
                        className="block rounded-md bg-white border border:bg-[#AOAAAB]"
                        {...register("email",
                            { required: "L'email est obligatoire", })} />
                    {errors.email && (<p>{errors.email.message}</p>)}
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">Mot de passe</label>
                    <input type="password"
                        className="block rounded-md bg-white border border:bg-[#AOAAAB]"
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