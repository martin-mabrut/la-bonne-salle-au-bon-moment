import { useState } from "react";
import { UserContext } from "../context/UserContext";


type User = {
    email: string,
    password: string;
};

function UserProvider({ children }) {
    const [user, setUser] = useState<User>(null);

    const login = data => {
        setUser(data);
    };
    const logout = () => {
        setUser(null);
    };
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;