// useProyecto.js
import { useState, useEffect } from "react";
import { gsUrlApi } from "../Apiconfig/apiConfig";
import Swal from "sweetalert2";

const useProyecto = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tareas, setTareas] = useState([]);
  const info = JSON.parse(localStorage.getItem('userSession'));
  const userData = info.userData[0];

  const Token = info.token
  // Función para listar proyectos desde la API
  const listarProyectos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${gsUrlApi}/proyecto/listar`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${Token}`,
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      console.log("listando...", data);

      if (response.ok) {
        setProyectos(data.datos || []);  // Suponiendo que los datos vienen en el campo `datos`
      } else {
        throw new Error(data.mensaje || "Error al listar proyectos");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Función para eliminar proyectos
  const eliminarProyecto = async (proyecto) => {
    try {
      const response = await fetch(`${gsUrlApi}/proyecto/eliminar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto), // Enviando el objeto completo
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || "Error al eliminar el proyecto");
      }

      // Eliminar localmente el proyecto eliminado
      setProyectos((prev) => prev.filter((p) => p._id !== proyecto._id));
      // Mostrar notificación con SweetAlert
      Swal.fire({
        icon: "success",
        title: "Proyecto eliminado",
        text: `El proyecto "${proyecto.nombreProyecto}" ha sido eliminado correctamente.`,
        confirmButtonText: "OK",
      });
      return data; // Retorna los datos eliminados si es necesario
    } catch (err) {
      setError(err.message);
      throw err; // Lanza el error para manejarlo en el componente
    }
  };

  // Función para consultar usuario por su username
  const consultarUsuario = async (usuario) => {
    setLoading(true);
    try {
      const response = await fetch(`${gsUrlApi}/usuariosAdministrativos/consultar?search=${usuario}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("MDNNA", data);
      if (response.ok && data.datos) {
        return data.datos; // Devuelve directamente el objeto usuario
      } else {

        throw new Error(data.Mensaje || "Usuario no encontrado");      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  // Función para actualizar un proyecto completo manteniendo sus datos actuales
  const actualizarProyecto = async (proyecto) => {
    setLoading(true);
    try {
      // Llamar a la API para actualizar el proyecto completo
      const response = await fetch(`${gsUrlApi}/proyecto/actualizar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto),
      });
  
      const data = await response.json();
      console.log("Relevante..", data);
  
      // Verificar si el estado de la respuesta es "SUCCEEDED"
      if (data.status === "SUCCEEDED") {
        // Actualizar el estado local con el proyecto actualizado
        setProyectos((prev) =>
          prev.map((p) =>
            p._id === proyecto._id ? { ...p, ...proyecto } : p
          )
        );
  
        return proyecto; // Retornar el proyecto actualizado localmente
      } else {
        throw new Error(data.mensaje || "Error al actualizar el proyecto");
      }
    } catch (err) {
      console.error("Error en actualizarProyecto:", err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  


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

      return data.datos; // Devuelve la tarea creada desde el backend
    } catch (err) {
      setError(err.message);
      throw err; // Lanza el error para manejarlo en el componente
    }
  };

  // Función para listar tareas desde la API
  const listarTareas = async () => {
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

      if (response.ok) {
        setTareas(data.datos || []); // Suponiendo que las tareas vienen en el campo `datos`
      } else {
        throw new Error(data.mensaje || "Error al listar tareas");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar una tarea existente
  const actualizarTarea = async (tareaData) => {
    try {
      const response = await fetch(`${gsUrlApi}/tareas/actualizar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tareaData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || "Error al actualizar tarea");
      }

      // Devuelve la tarea actualizada desde el backend
      return data.datos[0];
    } catch (err) {
      setError(err.message);
      throw err; // Lanza el error para manejarlo en el componente
    }
  };


  return {
    proyectos,
    tareas,
    loading,
    error,
    listarProyectos,
    agregarTarea,
    actualizarTarea,
    eliminarProyecto,
    listarTareas,
    consultarUsuario,
    actualizarProyecto,
  };
};
export default useProyecto;