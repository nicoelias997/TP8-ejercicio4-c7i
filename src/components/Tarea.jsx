import React  from "react";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {  useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {borrarTareaApi, consultarAPI, crearTareaApi, editarTareaAPI, obtenerTareaApi} from "./queries"

const Tarea = () => {

    // const tareasLocalStorage = JSON.parse(localStorage.getItem("listaTareas")) || [];
    const [tareas, setTareas] = useState([])
    const [id, setId] = useState("")

    const [modoEdicion, setModoEdicion] = useState(false)


    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset, 
      setFocus
    } = useForm();

    setFocus("nombreTarea");
    
    //ciclo de vida componente
    useEffect(() => {
      consultarAPI().then(respuesta => {
        setTareas(respuesta)
      })
    },[])

  const agregarTarea = (tarea) => {
      crearTareaApi(tarea).then(respuesta => {
          if(respuesta.status === 201){
            Swal.fire(
              "Producto creado",
              "El producto fue creado exitosamente",
              "success"
            )
          reset()
          consultarAPI().then((respuesta) => {
            setTareas(respuesta);
          });
        } 
        if(respuesta.status === 400) {
          Swal.fire("Hubo un error", "No pudimos agregar la tarea", "error")
          return
        }
      })
    }
  

  const eliminarTarea = (id) => {
    borrarTareaApi(id).then(respuesta => {
      if(respuesta.status === 200){
          Swal.fire(
            "Tarea eliminada",
            "La tarea fue eliminada exitosamente",
            "success"
          )
          reset()
          consultarAPI().then(respuesta => {
            setTareas(respuesta)
          })
          setId("")
          setModoEdicion(false)
      } else{
        console.log("no se pudo eliminar")
      }
    })
}
   
const obtenerTarea = item => {
  setId(item._id)
  obtenerTareaApi(item._id).then((respuesta) => {
    if(respuesta.status === 200){
      setValue("nombreTarea", respuesta.dato.nombreTarea)
      setModoEdicion(true)
    }})
  }

  const editarTarea = (datos) => {
    editarTareaAPI(id, datos).then(respuesta => {
      if(respuesta.status === 200){
          Swal.fire(
            "Tarea editada",
            "La tarea fue editado exitosamente",
            "success"
          )
        consultarAPI().then(respuesta => {
          setTareas(respuesta)
        })
        setModoEdicion(false)
        reset()
      } 
      if(respuesta.status === 400) {
        Swal.fire("Hubo un error", "No pudimos editar la tarea", "error")
        return
      }
    })
  }
   

  return (
    <div className="row d-flex m-2">
      <div className="col-12 text-center">
        <h3>Ingrese su tarea</h3>
      {
        modoEdicion ? 
        <>
        <Form xs={12} onSubmit={handleSubmit(editarTarea)}>
          <Form.Group>
          <Form.Text className="text-danger float-start mb-2">
                {errors.nombreTarea?.message}
              </Form.Text>
            <Form.Control
            type="text"
            placeholder="Ingrese una tarea"
            aria-label="Recipient"
            aria-describedby="boton"
            {
              ...register("nombreTarea", {
                required: "Debe ingresar una tarea",
                minLength: {
                  value: 1,
                  message: "El nombre debe tener al menos 1 caracter",
                }
              })
            }
            
            >
            </Form.Control>
         
            <Button
            type="submit"
            id="boton"
            className="btn btn-warning mt-2"
          >
            Editar tarea
         </Button>
          </Form.Group>
          </Form>
        </>
        : 
        <>
        <Form xs={12} onSubmit={handleSubmit(agregarTarea)}>
          <Form.Group>
          <Form.Text className="text-danger float-start mb-2">
                {errors.nombreTarea?.message}
              </Form.Text>
            <Form.Control
            type="text"
            placeholder="Ingrese una tarea"
            aria-label="Recipient"
            aria-describedby="boton"
            {
              ...register("nombreTarea", {
                required: "Debe ingresar una tarea",
                minLength: {
                  value: 1,
                  message: "El nombre debe tener al menos 1 caracter",
                }
              })
            }
            
            >
            </Form.Control>
         
           
              <Button
            type="submit"
            id="boton"
            className="btn btn-danger mt-2"
          >
            Enviar tarea
          </Button>
          </Form.Group>
          </Form>
        </>
      }
          
      </div>
      <div className="row col-12">
        <h3 className="float-start">Lista de tareas</h3>
        <div >
          <ul className="list-group">
          {
            tareas.map(item => (
                <li className="list-group-item" key={item._id}>
                    <span className="lead">{item.nombreTarea}</span>
                    <div className="float-end">
                    <button 
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={()=> eliminarTarea(item._id)}>
                    Eliminar
                    </button>
                    <button 
                    className="btn btn-warning btn-sm float-end mx-2"
                    onClick={()=> obtenerTarea(item)}>
                    Edit
                    </button>
                    </div>
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
