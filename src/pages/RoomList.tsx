import { useContext, useEffect } from "react";
import { RoomContext } from "../context/RoomContext";

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
            <li key={room.id}>
              {room.name} — {room.capacity} personnes
            </li>
          ))}
        </ul>{" "}
      </div>
    </>
  );
}

export default RoomList;
