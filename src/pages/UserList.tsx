import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import type { User } from "../context/UserContext";
import UserCard from "../composants/UserCard";

function UserList() {
    const userContext = useContext(UserContext);
    const userList = userContext?.userList ?? [];
    const getUserList = userContext?.getUserList;
    useEffect(() => { getUserList && getUserList() }, [])

    return (

        <>
            <div className="grid grid-cols-4 mt-10 p-5">
                {userList.map((user: User) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </>
    )
}

export default UserList