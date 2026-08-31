import { useContext } from "react";
import {
    Navigate,
    useParams,
} from "react-router";

import { UserContext } from "../context/UserContext";

function Dashboard() {
    const { role } = useParams();

    const context = useContext(UserContext);

    if (!context) {
        throw new Error(
            "Dashboard doit être utilisé dans UserProvider"
        );
    }

    const {
        user,
        logout,
    } = context;

    // Vérification de sécurité :
    // le rôle de l'URL doit correspondre
    // au rôle de l'utilisateur.
    if (role !== user?.roleLabel) {
        return (
            <Navigate
                to={`/dashboard/${user?.roleLabel}`}
                replace
            />
        );
    }

    return (
        <div>
            <h1>
                Dashboard {role}
            </h1>

            <p>
                Bonjour {user?.firstname} !
            </p>

            <p>
                Email : {user?.email}
            </p>

            {role === "admin" && (
                <div>
                    <h2>
                        Espace administrateur
                    </h2>

                    <p>
                        Gestion des utilisateurs,
                        salles, réservations...
                    </p>
                </div>
            )}

            {role === "formateur" && (
                <div>
                    <h2>
                        Espace formateur
                    </h2>

                    <p>
                        Gestion des formations,
                        cours...
                    </p>
                </div>
            )}

            {role === "apprenant" && (
                <div>
                    <h2>
                        Espace apprenant
                    </h2>

                    <p>
                        Mes formations,
                        mes réservations...
                    </p>
                </div>
            )}

            <button onClick={logout}>
                Se déconnecter
            </button>
        </div>
    );
}

export default Dashboard;