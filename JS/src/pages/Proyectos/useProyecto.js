// useProyecto.js
import { useState, useEffect } from "react";
import { gsUrlApi } from "../../configuracionApi/apiConfig";

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

  return {
    proyectos,
    loading,
    error,
    listarProyectos,
  };
};
