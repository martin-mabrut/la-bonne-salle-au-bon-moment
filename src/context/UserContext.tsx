import { createContext } from "react";

export type User = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    roleId: string
};


type UserContextType = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);