import { useContext, useEffect } from "react";
import { RoomContext } from "../context/RoomContext";
import RoomCard from "../composants/RoomCard";

function RoomList() {
  const { roomList, getRoomList } = useContext(RoomContext);
  useEffect(() => {
    getRoomList();
  }, []);

  return (
    <>
      <div>
        <h1>Liste des salles</h1>
        <ul>
          {roomList.map((room) => (
            <RoomCard key={room.id} salle={room} />
          ))}
        </ul>{" "}
      </div>
    </>
  );
}

export default RoomList;
