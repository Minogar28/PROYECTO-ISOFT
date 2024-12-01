// useCrearProyecto.js
import { useState } from "react";
import Swal from "sweetalert2";
import { gsUrlApi } from "@src/apiConfig/apiConfig";

const useCrearProyecto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para guardar el proyecto
  const crearProyecto = async (proyectoData) => {
    setLoading(true);
    try {
      const response = await fetch(`${gsUrlApi}/proyecto/insertar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyectoData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Proyecto creado correctamente",
          text: "Redirigiendo a inicio...",
          timer: 1000,
          showConfirmButton: false,
        });

        // Retornar datos para redirección o uso posterior
        return data;
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al crear el proyecto",
          text: data.error?.message || "Ocurrió un error inesperado.",
        });
        throw new Error(data.error?.message || "Error al crear el proyecto");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.",
      });
      setError(error.message);
      console.error("Error al enviar el proyecto:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    crearProyecto,
    loading,
    error,
  };
};

export default useCrearProyecto;
