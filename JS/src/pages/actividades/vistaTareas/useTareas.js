import { useState, useCallback } from "react";
import { gsUrlApi } from "@src/Apiconfig/Apiconfig";

const useTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [descriptionModal, setDescriptionModal] = useState(false);

  const info = JSON.parse(localStorage.getItem("userSession"));
  const Token = info?.token;

  // Función para listar tareas desde la API
  const listarTareas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${gsUrlApi}/tareas/listar`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      console.log("Llegaron tareas...", data);

      if (response.ok) {
        setTareas(data.datos || []);
      } else {
        throw new Error(data.mensaje || "Error al listar tareas");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [Token]);

  // Función para agregar tareas
  const agregarTarea = async (tareaData) => {
    try {
      const response = await fetch(`${gsUrlApi}/tareas/insertar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tareaData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || "Error al agregar tarea");
      }

      return data.datos;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

// Función para actualizar la tarea completa
const actualizarTarea = async (tareaActualizada) => {
    try {
        const response = await fetch(`${gsUrlApi}/tareas/actualizar`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tareaActualizada),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "Error al actualizar la tarea");
        }

        return data.datos;
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        throw error;
    }
};

   

  const onDragEnd = (result) => {
    const { source, destination } = result;
  
    // dropped outside the list
    if (!destination) {
      return;
    }
  
    let sourceOccurrence = source.index;
    let destinationOccurrence = destination.index;
    let sourceId = 0,
      destinationId = 0;
    tareas.forEach((tarea, index) => {
      if (tarea.estado === source.droppableId) {
        if (sourceOccurrence === 0) {
          sourceId = index;
        }
        sourceOccurrence--;
      }
      if (tarea.estado === destination.droppableId) {
        if (destinationOccurrence === 0) {
          destinationId = index;
        }
        destinationOccurrence--;
      }
    });
 
    const tarea = tareas[sourceId];
    const newTareas = tareas.filter((t) => t._id !== tarea._id); // Cambia `id` por `_id`
    tarea.estado = destination.droppableId;
    const parity = destination.droppableId !== source.droppableId ? -1 : 0;
    setTareas([
      ...newTareas.slice(0, destinationId + parity),
      tarea,
      ...newTareas.slice(destinationId + parity),
    ]);
  };
  const toggleDescriptionModal = () => {
    setDescriptionModal(prevState => !prevState);
  };
  return {
    tareas,
    loading,
    error,
    agregarTarea,
    listarTareas,
    actualizarTarea,
    onDragEnd,
    descriptionModal,
    toggleDescriptionModal,

  };
};

export default useTareas;
