import { useState } from "react";
import { UserContext, type User } from "../context/UserContext";


function UserProvider({ children }: { children?: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (data: User) => {
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