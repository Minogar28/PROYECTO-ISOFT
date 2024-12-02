import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HttpClient } from "@src/helpers";
import { useAuthContext } from "@src/states";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { gsUrlApi } from "@src/Apiconfig/Apiconfig";
import Swal from "sweetalert2";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isAuthenticated,
    saveSession
  } = useAuthContext();
  const {
    enqueueSnackbar
  } = useSnackbar();
  const loginFormSchema = yup.object({
    email: yup.string().email("Please enter valid email").required("Please enter email"),
    password: yup.string().required("Please enter password"),
    rememberMe: yup.boolean().oneOf([true], "Checkbox must be checked").optional()
  });
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "demo@demo.com",
      password: "password"
    }
  });
  const redirectUrl = useMemo(() => (location.state?.from.pathname, "/"), [location.state]);
  const login = handleSubmit(async values => {
    setLoading(true);
    try {
      const response = await fetch(`${gsUrlApi}/usuariosAdministrativos/validarIngreso`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Login: values.email,
          Clave: values.password,
        }),
      });

      const data = await response.json();
console.log("aaaa...", data);

      if (response.ok && data.token) {
        // Guarda el token y otros datos de sesión en localStorage
        const userSessionData = {
          token: data.token,
          userData: data.Datos
        };
        localStorage.setItem("userSession", JSON.stringify(userSessionData));

        // Guarda la sesión en el contexto de autenticación
        saveSession({
          ...data,
          token: data.token
        });

        // Redirecciona después del login
        navigate(redirectUrl);
      } else {
        Swal.fire({
          icon: "error",
          title: "Usuario no encontrado",
          text:"Verifica que ingresaste los datos correctamente",
          timer: 2000, // Mensaje visible durante 3 segundos
          showConfirmButton: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      enqueueSnackbar("An error occurred. Please try again.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  
    // try {
    //   const res = await HttpClient.post("/login", values);
    //   if (res.data.token) {
    //     saveSession({
    //       ...(res.data ?? {}),
    //       token: res.data.token
    //     });
    //     navigate(redirectUrl);
    //   }
    // } catch (error) {
    //   if (error.response?.data?.error) {
    //     enqueueSnackbar(error.response?.data?.error, {
    //       variant: "error"
    //     });
    //   }
    // } finally {
    //   setLoading(false);
    // }
  });
  return {
    loading,
    login,
    redirectUrl,
    isAuthenticated,
    control
  };
}