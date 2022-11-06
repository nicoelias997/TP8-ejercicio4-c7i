const URL = process.env.REACT_APP_API_TAREA

export const consultarAPI =  async () => {
    try{
        const respuesta = await fetch(URL)
        const listaTareas = await respuesta.json()
        return listaTareas
    } catch(e){
        console.log(e)
    }
}

export const crearTareaApi =  async (tarea) => {
    try{
        const respuesta = await fetch(URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarea)
        })
        return respuesta
    } catch(e){
        console.log(e)
    }
}

export const borrarTareaApi =  async (_id) => {
    try{
        const respuesta = await fetch(URL+"/"+_id,{
            method: "DELETE"
        })
        return respuesta
    } catch(e){
        console.log(e)
    }
}

export const obtenerTareaApi =  async (_id) => {
    try{
        const respuesta = await fetch(URL+"/"+_id)
        const tarea = {
            dato: await respuesta.json(),
            status: respuesta.status
        }
        return tarea
    } catch(e){
        console.log(e)
    }
}

export const editarTareaAPI =  async (_id, nombreTarea) => {
    try{
        const respuesta = await fetch(URL+"/"+_id,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nombreTarea)
        })
        return respuesta
    } catch(e){
        console.log(e)
    }
}