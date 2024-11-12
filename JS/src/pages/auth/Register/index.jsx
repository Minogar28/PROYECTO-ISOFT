import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { CheckboxInput, FormInput, PageMetaData, PasswordInput } from "@src/components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import AuthLayout from "../AuthLayout";
import { useSnackbar } from "notistack";
import { gsUrlApi } from "../../../configuracionApi/apiConfig";

/**
 * Enlaces inferiores
 */
const EnlaceInferior = () => {
  return <Box sx={{
    my: "16px",
    display: "flex",
    justifyContent: "center"
  }}>
      <Typography variant="body2" color={"text.secondary"} sx={{
      display: "flex",
      flexWrap: "nowrap",
      gap: 0.5
    }}>
        ¿Ya tienes cuenta?
        <Link to="/auth/login">
          <Typography variant="subtitle2" component={"span"}>
            Iniciar sesión
          </Typography>
        </Link>
      </Typography>
    </Box>;
};


const Registro = () => {
  const esquemaFormularioRegistro = yup.object({
    nombreCompleto: yup.string().required("El nombre es obligatorio"),
    correo: yup.string().email("Por favor, introduce un correo válido").required("Por favor, introduce tu correo"),
    contraseña: yup.string().required("Por favor, introduce una contraseña"),
    recordar: yup.boolean().oneOf([true], "Debe marcar la casilla de verificación").optional()
  });
  
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(esquemaFormularioRegistro),
    defaultValues: {
      nombreCompleto: "Attex Demo",
      correo: "demo@demo.com",
      contraseña: "contraseña"
    }
  });
  
   // Función para enviar el formulario de registro
   const onSubmit = async (values) => {
    try {
      // Realiza la petición POST a la API de registro
      const response = await fetch(`${gsUrlApi}/usuariosAdministrativos/insertar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: values.nombreCompleto,
          email: values.correo,
          password: values.contraseña,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Muestra un mensaje de éxito y redirige al usuario
        // enqueueSnackbar("Registro exitoso", { variant: "success" });
        navigate("/auth/login"); // Redirige a la página de inicio de sesión
      } else {
        // Muestra un mensaje de error
        // enqueueSnackbar(data.message || "Error en el registro", { variant: "error" });
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      // enqueueSnackbar("Ocurrió un error. Por favor, intenta de nuevo.", { variant: "error" });
    }
  };
  return <>
      <PageMetaData title={"Registro"} />

      <AuthLayout authTitle="Registro gratuito" helpText="¿No tienes cuenta? Crea una cuenta, toma menos de un minuto." bottomLinks={<EnlaceInferior />}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput name="nombreCompleto" type="text" label="Nombre completo" control={control} />

          <FormInput name="correo" type="email" label="Correo electrónico" containerSx={{
          mt: 2
        }} control={control} />

          <PasswordInput name="contraseña" type="password" label={"Contraseña"} containerSx={{
          mt: 2
        }} control={control} />

          <CheckboxInput name="recordar" label="Recuérdame" control={control} labelSx={{
          mt: 1
        }} />

          <Box sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2
        }}>
            <Button variant="contained" color="primary" type="submit" size={"large"}>
              Iniciar sesión
            </Button>
          </Box>
        </form>
      </AuthLayout>
    </>;
};

export default Registro;
