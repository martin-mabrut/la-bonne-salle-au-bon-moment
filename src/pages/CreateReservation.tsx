import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import type { Reservation } from "../context/ReservationContext";
import { useForm } from "react-hook-form";

function CreateReservation(){
  const {getReservation,postReservation, putReservation, deleteReservation,getReservationList,reservationList,...reservation} = useContext(ReservationContext);
  useEffect(()=>{getReservationList()},[]);
  const [errorForm, setErrorForm] = useState("");
  const salleListe = ["1","2","3","4","5"];
  const UtilisateurListe = ["1","2","3","4"];


  const{
    register,
    handleSubmit,
    formState:{errors},
  }=useForm<Reservation>();

 function onSubmit(data:Reservation){
  let isOk = true;
  if(new Date(data.date_debut).getTime()>new Date(data.date_fin).getTime()){
    setErrorForm("Date de fin inférieur à date de début")
    return
  }
  for(let resa of reservationList){
    if(data.salle_id==resa.salle_id){
      if(!((new Date(data.date_fin).getTime()>new Date(resa.date_debut).getTime())||(new Date(data.date_debut).getTime()>new Date(resa.date_fin).getTime()))){
        isOk=false;
        console.log(isOk);
      }
    }
  }
  isOk?postReservation(data):setErrorForm("Salle indisponible sur ce créneau");
  }

  return(
    <>
    <form onSubmit={handleSubmit(onSubmit)} onClick={()=>setErrorForm("")}>
    <div>
      <label>Salle</label>
      <select id="selectmethod" defaultValue="" {...register("salle_id",{required:"Salle Obligatoire"})}>
        {salleListe.map((salle)=>(
          <option key={salle} value={salle}>{salle}</option>
        ))}
      </select>
    </div>
    <div>
      <label>Utilisateur</label>
      <select id="selectmethod" defaultValue="" {...register("user_id",{required:"Utilisateur Obligatoire"})}>
        {UtilisateurListe.map((utilisateur)=>(
          <option key={utilisateur} value={utilisateur}>{utilisateur}</option>
        ))}
      </select>
    </div>
    <div>
      <label>Date début</label>
      <input type="date" {...register("date_debut",{required:"Date début obligatoire"})}/>
      {errors.date_debut && (<p>{errors.date_debut.message}</p>)}
    </div>
    <div>
      <label>Date fin</label>
      <input type="date" {...register("date_fin",{required:"Date fin obligatoire"})}/>
      {errors.date_fin && (<p>{errors.date_fin.message}</p>)}
    </div>

    <button type="submit">Créer réservation</button>
    </form>
    <p>{errorForm}</p>
    </>
  );
}

export default CreateReservation;