import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import type { Reservation } from "../context/ReservationContext";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import type { User } from "../context/UserContext";

function CreateReservation(){
  const {getReservation,postReservation, putReservation, deleteReservation,getReservationList,reservationList,...reservation} = useContext(ReservationContext);
  useEffect(()=>{getReservationList()},[postReservation]);
  const {user, userList,getUserList}=useContext(UserContext);
  useEffect(()=>{getUserList()},[]);
  const[success, setSuccess] = useState(false);
  const [errorForm, setErrorForm] = useState("");
  const salleListe = ["1","2","3","4","5"];

  const{
    register,
    handleSubmit,
    formState:{errors, isValid}, reset,
  }=useForm<Reservation>();

 function onSubmit(data:Reservation){
  let isOk = true;
  if(new Date(data.date_debut).getTime()<new Date(data.date_fin).getTime()){
    setErrorForm("Date de fin inférieur à date de début")
    return
  }
  for(let resa of reservationList){
    if(data.salle_id==resa.salle_id){
      if(!((new Date(data.date_fin).getTime()<=new Date(resa.date_debut).getTime())||(new Date(data.date_debut).getTime()>=new Date(resa.date_fin).getTime()))){
        isOk=false;
      }
    }
  }
  isOk?postReservation(data):setErrorForm("Salle indisponible sur ce créneau");
  isOk && setSuccess(true);
  setTimeout(()=>{setSuccess(false);reset();},50000);
  }

  return(
    <>
    <main className="min-h-screen bg-[#BCCCDB] flex flex-col items-center">
      <h2 className="mt-14 text-center text-4xl font-extrabold uppercase text-white">Réserver un Créneau</h2>
    <form onSubmit={handleSubmit(onSubmit)} onClick={()=>setErrorForm("")} className="mt-9 flex w-full max-w-[295px] flex flex-col">
    <div>
      <label>Salle</label>
      <select id="selectmethod" defaultValue="" {...register("salle_id",{required:"Salle Obligatoire"})} className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white">
        {salleListe.map((salle)=>(
          <option key={salle} value={salle}>{salle}</option>
        ))}
      </select>
      {errors.salle_id && (<p className="text-black-500 font-bold text-sm">{errors.salle_id.message}</p>)}
    </div>
    <div>
      <label>Utilisateur</label>
      {user!=null && user.roleId=="1" && <select id="selectmethod" defaultValue="" {...register("user_id",{required:"Utilisateur Obligatoire"})}className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white">
        {userList.map((user:User)=>(
          <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
        ))}
      </select>}
      {user!=null && user.roleId=="2" && <select id="selectmethod" defaultValue="" {...register("user_id",{required:"Utilisateur Obligatoire"})}className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white">
        <option value={user.id}>{user.firstname} {user.lastname}</option>
      </select>}
      {errors.user_id && (<p className="text-black-500 font-bold text-sm">{errors.user_id.message}</p>)}
    </div>
    <div>
      <label>Date début</label>
      <input type="datetime-local" step="3600" {...register("date_debut",{required:"Date début obligatoire"})} className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white"/>
      {errors.date_debut && (<p className="text-black-500 font-bold text-sm">{errors.date_debut.message}</p>)}
    </div>
    <div>
      <label>Date fin</label>
      <input type="datetime-local" step="3600" {...register("date_fin",{required:"Date fin obligatoire"})} className="h-[30px] w-full rounded-md border border-[#A0AAAB] mb-5 border-2 bg-white"/>
      {errors.date_fin && (<p className="text-black-500 font-bold text-sm">{errors.date_fin.message}</p>)}
    </div>
    <p className="text-black-500 font-bold text-sm">{errorForm}</p>
    <button type="submit" disabled={!isValid} className="rounded-md bg-black px-3 py-2 text-sm border-[#FFFFFF] border-2 font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed">Réserver un créneau</button>
    {success && (
      <div className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white shadow-lg">
        <span>✓ Créneau réservé avec succès !</span>
      </div>
    )}
    </form>
    </main>
    </>
  );
}

export default CreateReservation;
