import { Avatar, Box, Card, CardContent, Grid, Typography, useTheme, Button, TextField, Switch, InputAdornment } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import { useEffect, useState } from "react";
import { gsUrlApi } from "../../configuracionApi/apiConfig";
import { AccountCircle, Save as SaveIcon, CalendarToday, Phone, Mail, Person, LocationOn, Badge } from "@mui/icons-material";

const Profile = () => {
  const theme = useTheme();

  const [infoUser, setInfoUser] = useState({
    FechaNacimiento: "",
   
    PrimerNombre: "",
    SegundoNombre: "",
    PrimerApellido: "",
    SegundoApellido: "",
    TipoIdentificacion: "",
    NombreTipoIdentificacion: "",
    Usuario: "",
    Clave: "",
    Correo: "Correo no disponible",
    Celular: "",
    Direccion: "",
    Telefono: "",
    NumeroIdentificacion: "Número no disponible",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("userSession"));
    const userData = info?.userData[0];
    if (userData) {
      setInfoUser({
        FechaNacimiento: userData.FechaNacimiento || "",
        
        PrimerNombre: userData.PrimerNombre || "",
        SegundoNombre: userData.SegundoNombre || "",
        PrimerApellido: userData.PrimerApellido || "",
        SegundoApellido: userData.SegundoApellido || "",
        TipoIdentificacion: userData.TipoIdentificacion || "",
        NombreTipoIdentificacion: userData.NombreTipoIdentificacion || "",
        Usuario: userData.Usuario || "",
        Clave: userData.Clave || "",
        Correo: userData.Correo || "Correo no disponible",
        Celular: userData.Celular || "",
        Direccion: userData.Direccion || "",
        Telefono: userData.Telefono || "",
        NumeroIdentificacion: userData.NumeroIdentificacion || "Número no disponible",
      });
    }
  }, []);

  const handleSave = async () => {
    const fullName = `${infoUser.PrimerNombre} ${infoUser.SegundoNombre} ${infoUser.PrimerApellido} ${infoUser.SegundoApellido}`;
    const updatedUser = { ...infoUser, NombreCompleto: fullName };
    const info = JSON.parse(localStorage.getItem('userSession'));
  
    const Token = info.token
    try {
      const response = await fetch(`${gsUrlApi}/usuariosAdministrativos/actualizar`, {
        method: "POST",
        headers: {   'Authorization': `Bearer ${Token}`,
        "Content-Type": "application/json",
        'Accept': 'application/json', },
        body: JSON.stringify(updatedUser),
      });
      const result = await response.json();
      console.log("Que hizo..", result);
      
      if (!result.Error) {
        setInfoUser(result.datos); 
        alert("Perfil actualizado correctamente");
        setEditMode(false);
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

  const fields = [
    { label: "Número de Identificación", name: "NumeroIdentificacion", icon: <Badge /> },
    { label: "Primer Nombre", name: "PrimerNombre", icon: <Person /> },
    { label: "Segundo Nombre", name: "SegundoNombre", icon: <Person /> },
    { label: "Primer Apellido", name: "PrimerApellido", icon: <Person /> },
    { label: "Segundo Apellido", name: "SegundoApellido", icon: <Person /> },
    { label: "Teléfono móvil", name: "Celular", icon: <Phone /> },
    { label: "Correo electrónico", name: "Correo", icon: <Mail /> },
    { label: "Fecha de Nacimiento", name: "FechaNacimiento", icon: <CalendarToday /> },
    { label: "Tipo de Identificación", name: "TipoIdentificacion", icon: <Badge /> },
    { label: "Dirección", name: "Direccion", icon: <LocationOn /> },
    { label: "Teléfono", name: "Telefono", icon: <Phone /> },
  ];

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
                  {`${infoUser.PrimerNombre} ${infoUser.PrimerApellido}`}
                </Typography>

                <Typography variant="body1" color="text.secondary" fontSize="16px" mb={3}>
                  {infoUser.RolNombre}
                </Typography>

                <Grid container spacing={2}>
                  {fields.map((field, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        p={2}
                        borderRadius="12px"
                        boxShadow={theme.shadows[1]}
                        bgcolor={theme.palette.grey[50]}
                        textAlign="center"
                      >
                        <Typography fontWeight="bold" variant="body2" color="text.secondary">
                          {field.label}
                        </Typography>
                        {editMode ? (
                          <TextField
                            variant="outlined"
                            fullWidth
                            name={field.name}
                            value={infoUser[field.name] || ""}
                            onChange={handleChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {field.icon}
                                </InputAdornment>
                              ),
                            }}
                            sx={{ mt: 1 }}
                          />
                        ) : (
                          <Typography variant="body1" color="text.primary" mt={0.5}>
                            {infoUser[field.name] || "No disponible"}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>

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
