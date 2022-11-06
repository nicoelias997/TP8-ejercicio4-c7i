import React  from "react";
import { useEffect, useState } from "react";
import {consultarAPI, crearTareaApi} from "./queries"

const Tarea = () => {

    const tareasLocalStorage = JSON.parse(localStorage.getItem("listaTareas")) || [];
    const [tarea, setTarea] = useState("")
    const [tareas, setTareas] = useState(tareasLocalStorage)

    
    //ciclo de vida componente
    useEffect(() => {
      consultarAPI().then(respuesta => {
        setTareas(respuesta)
      })
    },[tareas])

  const agregarTarea = () => {
    if(!tarea.trim()){
        console.log("Error")
        return
    } else {
        crearTareaApi(tarea).then(respuesta => {
          if(respuesta.status === 201){
            setTareas(tarea)
          } else{
            console.log("Ocurrio un error")
          }
        }
        )
        setTarea("")
    }
  };

  const eliminarTarea = (tarea) => {
    const arrayFiltrado = tareas.filter(item => item.nombreTarea !== tarea)
    setTareas(arrayFiltrado)
}

  return (
    <div className="row d-flex m-2">
      <div className="col-12 text-center">
        <h3>Ingrese su tarea</h3>
        <div className="input-group">
          <input
            type="text"
            placeholder="Ingrese una tarea"
            className="form-control"
            aria-label="Recipient"
            aria-describedby="boton"
            onChange={e => setTarea(e.target.value)}
            value={tarea}
          />
          <button
            type="button"
            id="boton"
            onClick={() => agregarTarea()}
            className="btn btn-danger btn-sm"
          >
            Enviar tarea
          </button>
        </div>
      </div>
      <div className="row col-12 col-sm-6 mt-4">
        <h3>Lista de tareas</h3>
        <div >
          <ul className="list-group">
          {
            tareas.map(item => (
                <li className="list-group-item" key={item.nombreTarea}>
                    <span className="lead">{item.nombreTarea}</span>
                    <button 
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={()=> eliminarTarea(item.nombreTarea)}>
                    Eliminar
                    </button>
                </li>
                ))
            }
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tarea;
