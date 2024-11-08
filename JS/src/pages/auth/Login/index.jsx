import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CheckboxInput, PageMetaData, PasswordInput } from "@src/components";
import { FormInput } from "@src/components";
import useLogin from "./useLogin";
import AuthLayout from "../AuthLayout";

/**
 * Enlaces inferiores
 */
const BottomLink = () => {
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
        ¿No tienes una cuenta?&nbsp;
        <Link to="/auth/register">
          <Typography variant="subtitle2" component={"span"}>
            Regístrate
          </Typography>
        </Link>
      </Typography>
    </Box>;
};
const Login = () => {
  const {
    loading,
    login,
    control
  } = useLogin();
  return <>
      <PageMetaData title={"Iniciar sesión"} />

      <AuthLayout authTitle="Iniciar sesión" helpText="Ingresa tu correo electrónico y contraseña para acceder al panel de administración." bottomLinks={<BottomLink />}>
        <form onSubmit={login}>
          <FormInput name="email" type="email" label="Correo electrónico" control={control} />

          <Box sx={{
          mt: 2
        }}>
            <PasswordInput name="password" type="password" label={"Contraseña"} control={control} />
          </Box>

          <Box sx={{
          mt: 1
        }}>
            <CheckboxInput name="rememberMe" label="Recuérdame" control={control} />
          </Box>

          <Box sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2
        }}>
            <Button variant="contained" color="primary" type="submit" disabled={loading} size={"large"}>
              Iniciar sesión
            </Button>
          </Box>
        </form>
      </AuthLayout>
    </>;
};
export default Login;
