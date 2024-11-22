import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FormInput, PasswordInput } from "@src/components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import AuthLayout from "../AuthLayout";
import { gsUrlApi } from "../../../configuracionApi/apiConfig";
import Swal from "sweetalert2";

const EnlaceInferior = () => (
  <Box sx={{ my: "16px", display: "flex", justifyContent: "center" }}>
    <Typography variant="body2" color={"text.secondary"} sx={{ display: "flex", flexWrap: "nowrap", gap: 0.5 }}>
      ¿Ya tienes cuenta?
      <Link to="/auth/login">
        <Typography variant="subtitle2" component={"span"}>Iniciar sesión</Typography>
      </Link>
    </Typography>
  </Box>
);

const Registro = () => {
  const navigate = useNavigate();  // Inicializa navigate para la redirección

  const esquemaFormularioRegistro = yup.object({
    usuario: yup.string().required("El usuario es obligatorio"),
    correo: yup.string().email("Por favor, introduce un correo válido").required("Por favor, introduce tu correo"),
    contraseña: yup.string().required("Por favor, introduce una contraseña"),
    celular: yup.number().typeError("Por favor, introduce un número válido").required("El número de celular es obligatorio"),
    primerNombre: yup.string().required("El primer nombre es obligatorio"),
    segundoNombre: yup.string().optional(),
    primerApellido: yup.string().required("El primer apellido es obligatorio"),
    segundoApellido: yup.string().optional(),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(esquemaFormularioRegistro),
  });

  const onSubmit = async (values) => {
    const nombreCompleto = `${values.primerNombre} ${values.segundoNombre || ""} ${values.primerApellido} ${values.segundoApellido || ""}`.trim();
    
    console.log("Ingresó");  // Verificación de que el onSubmit se ejecuta

    try {
      const response = await fetch(`${gsUrlApi}/usuariosAdministrativos/insertar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Usuario: values.usuario,
          Correo: values.correo,
          Clave: values.contraseña,
          NombreCompleto: nombreCompleto,
          Celular: values.celular,
          PrimerNombre: values.primerNombre,
          SegundoNombre: values.segundoNombre,
          PrimerApellido: values.primerApellido,
          SegundoApellido: values.segundoApellido,
          RolNombre:"Administrador"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Sus datos han sido guardados correctamente",
          timer: 3000,
          confirmButtonText: false,
        });
        setTimeout(() => {
          navigate("/auth/login"); // Redirige a la página de inicio de sesión después del temporizador
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en el registro",
          text: data.message || "Ocurrió un error al guardar los datos.",
          timer: 2000, // Mensaje visible durante 3 segundos
          showConfirmButton: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <AuthLayout authTitle="Registro gratuito" helpText="¿No tienes cuenta? Crea una cuenta, toma menos de un minuto." bottomLinks={<EnlaceInferior />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}sx={{  overflowY: 'auto',width: '100%', maxWidth: '400px', mx: 'auto' ,maxHeight:'30vh'}}>
        <Grid item xs={6}>
            <FormInput name="primerNombre" type="text" label="Primer Nombre" control={control} icon={<PersonIcon />} />
          </Grid>
          <Grid item xs={6}>
            <FormInput name="segundoNombre" type="text" label="Segundo Nombre" control={control} icon={<PersonIcon />} />
          </Grid>
          <Grid item xs={6}>
            <FormInput name="primerApellido" type="text" label="Primer Apellido" control={control} icon={<PersonIcon />} />
          </Grid>
          <Grid item xs={6}>
            <FormInput name="segundoApellido" type="text" label="Segundo Apellido" control={control} icon={<PersonIcon />} />
          </Grid>
          <Grid item xs={12}>
            <FormInput name="celular" type="number" label="Celular" control={control} icon={<PhoneIcon />} />
          </Grid>
          <Grid item xs={12}>
            <FormInput name="usuario" type="text" label="Usuario" control={control} icon={<AccountCircleIcon />} />
          </Grid>
          <Grid item xs={12}>
            <FormInput name="correo" type="email" label="Correo electrónico" control={control} icon={<EmailIcon />} />
          </Grid>
          <Grid item xs={12}>
            <PasswordInput name="contraseña" type="password" label="Contraseña" control={control} icon={<BadgeIcon />} />
          </Grid>
          
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" color="primary" type="submit" size="large">Registrarse</Button>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default Registro;
