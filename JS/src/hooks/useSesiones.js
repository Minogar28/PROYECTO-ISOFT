import { useState } from "react";
import Swal from "sweetalert2";

// Función para cargar el script de Google API
const loadGoogleApiScript = () =>
  new Promise((resolve, reject) => {
    if (document.getElementById("google-api")) {
      resolve(window.gapi);
    } else {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.id = "google-api";
      script.onload = () => resolve(window.gapi);
      script.onerror = () => reject(new Error("Error al cargar el script de Google API"));
      document.body.appendChild(script);
    }
  });

const useSesiones = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para crear una sesión de Google Meet
  const crearSesion = async () => {
    setLoading(true);
    try {
      const gapi = await loadGoogleApiScript();

      // Cargar los módulos de cliente y autenticación
      await new Promise((resolve, reject) => {
        gapi.load("client:auth2", {
          callback: resolve,
          onerror: () => reject(new Error("Error al cargar los módulos de Google API")),
        });
      });
      const ApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const ClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      
      // Inicializar el cliente de Google API
      await gapi.client.init({
        apiKey: ApiKey, // Obtén la API Key desde .env
        clientId: ClientId, // Obtén el Client ID desde .env
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.events",
      });

      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }

      // Crear un evento en el calendario para la sesión de Google Meet
      const event = {
        summary: "Nueva Reunión",
        description: "Reunión generada automáticamente",
        start: {
          dateTime: new Date().toISOString(),
          timeZone: "America/Bogota",
        },
        end: {
          dateTime: new Date(new Date().getTime() + 3600000).toISOString(),
          timeZone: "America/Bogota",
        },
        conferenceData: {
          createRequest: {
            requestId: "123456",
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      };

      const response = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
      });

      if (response.result) {
        const meetLink = response.result.hangoutLink;
        Swal.fire({
          icon: "success",
          title: "Sesión creada",
          text: "El enlace de la reunión se ha generado correctamente.",
          footer: `<a href="${meetLink}" target="_blank">Abrir sesión</a>`,
        });
        return meetLink;
      } else {
        throw new Error("Error al crear la sesión");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo crear la sesión",
      });
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    crearSesion,
    loading,
    error,
  };
};

export default useSesiones;
