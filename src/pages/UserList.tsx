import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

function UserList() {
    const { getUserList, userList } = useContext(UserContext);
    useEffect(() => { getUserList() }, [])

    return (

        <>

            {userList.map((user) => (
                <p key={user.id}>
                    {user.lastname} {user.firstname} {user.email}
                </p>
            ))}

        </>
    )
}

export default UserList