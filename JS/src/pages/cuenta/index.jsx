import { Avatar, Box, Card, CardContent, Grid, Typography, useTheme, Button, TextField, Switch } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { gsUrlApi } from "../../configuracionApi/apiConfig";
import { AccountCircle, Save as SaveIcon } from "@mui/icons-material";

const Profile = () => {
  const theme = useTheme();

  const [infoUser, setInfoUser] = useState({
    NombreCompleto: "Nombre no disponible",
    Rol: "Rol no disponible",
    Celular: "Celular no disponible",
    Correo: "Correo no disponible",
    about: "No disponible",
    NumeroIdentificacion: "Número no disponible",
  });

  const [editMode, setEditMode] = useState(false); // Estado para el modo de edición

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("userSession"));
    const userData = info?.userData[0];
    if (userData) {
      setInfoUser({
        NombreCompleto: `${userData.PrimerNombre} ${userData.PrimerApellido}` || "Nombre no disponible",
        Rol: userData.RolNombre || "Rol no disponible",
        Celular: userData.Celular || "Celular no disponible",
        Correo: userData.Correo || "Correo no disponible",
        about: userData.About || "No disponible",
        NumeroIdentificacion: userData.NumeroIdentificacion || "Número no disponible",
      });
    }
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(`${gsUrlApi}/usuariosAdministrativos/actualizar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoUser),
      });
      const result = await response.json();

      if (!result.Error) {
        setInfoUser(result.datos); // Actualizar el estado con los datos del servidor
        alert("Perfil actualizado correctamente");
        setEditMode(false); // Salir del modo de edición después de guardar
      } else {
        alert(`Error al actualizar: ${result.Mensaje}`);
      }
    } catch (error) {
      alert(`Error en la actualización: ${error.message}`);
    }
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoUser((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <>
      <PageBreadcrumb title="Mi Cuenta" subName="App" />
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item container spacing={3} xs={12} xl={5} lg={5} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Card
              sx={{
                textAlign: "center",
                color: theme.palette.common.white,
                boxShadow: theme.shadows[6],
                borderRadius: "16px",
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    width: "96px",
                    height: "96px",
                    margin: "0 auto",
                    boxShadow: theme.shadows[4],
                    mb: 2,
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                  }}
                >
                  <AccountCircle fontSize="large" />
                </Avatar>

                <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
                  {infoUser.NombreCompleto}
                </Typography>

                <Typography variant="body1" color="text.secondary" fontSize="16px" mb={3}>
                  {infoUser.Rol}
                </Typography>

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={2}
                  width="100%"
                  maxWidth="350px"
                  mx="auto"
                >
                  {[
                    { label: "Número de Identificación", name: "NumeroIdentificacion", value: infoUser.NumeroIdentificacion },
                    { label: "Nombre completo", name: "NombreCompleto", value: infoUser.NombreCompleto },
                    { label: "Teléfono móvil", name: "Celular", value: infoUser.Celular },
                    { label: "Correo electrónico", name: "Correo", value: infoUser.Correo },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      width="100%"
                      p={2}
                      borderRadius="12px"
                      boxShadow={theme.shadows[1]}
                      bgcolor={theme.palette.grey[50]}
                      textAlign="center"
                    >
                      <Typography fontWeight="bold" variant="body2" color="text.secondary">
                        {item.label}
                      </Typography>
                      {editMode ? (
                        <TextField
                          variant="outlined"
                          fullWidth
                          name={item.name}
                          value={item.value}
                          onChange={handleChange}
                          sx={{ mt: 1 }}
                        />
                      ) : (
                        <Typography variant="body1" color="text.primary" mt={0.5}>
                          {item.value}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" mt={3} gap={2}>
                  <Switch
                    checked={editMode}
                    onChange={toggleEditMode}
                    color="primary"
                    inputProps={{ "aria-label": "Toggle edit mode" }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {editMode ? "Modo Edición" : "Modo Vista"}
                  </Typography>
                  {editMode && (
                    <Button
                      onClick={handleSave}
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      sx={{ ml: 2 }}
                    >
                      Guardar cambios
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
