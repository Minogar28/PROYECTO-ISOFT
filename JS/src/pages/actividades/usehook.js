// useProyecto.js
import { useState, useEffect } from "react";
import { gsUrlApi } from "../../configuracionApi/apiConfig";
import Swal from "sweetalert2";

export const useProyecto = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const info = JSON.parse(localStorage.getItem('userSession'));
  
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
      
      if (response.ok) {
        setProyectos(Array.isArray(data.datos) ? data.datos : []); // Valida que sea un array
      } else {
        throw new Error(data.mensaje || "Error al listar proyectos");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const añadirMiembro = async (nombreProyecto, codigoInvitacion, miembro) => {
    try {
      const response = await fetch(`${gsUrlApi}/proyecto/unirMiembro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${Token}`,
          'Accept': 'application/json',

        },
        body: JSON.stringify({ nombreProyecto, codigoInvitacion, miembro }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.mensaje || "Error al unirte al proyecto");
      }
  
      Swal.fire("Éxito", "Te has unido exitosamente al proyecto como colaborador", "success");
      return data.datos[0];
    } catch (error) {
      Swal.fire("Error", error.message, "error");
      throw error;
    }
  };
  
  
  return {
    proyectos,
    loading,
    error,
    listarProyectos,
    añadirMiembro
  };
};
