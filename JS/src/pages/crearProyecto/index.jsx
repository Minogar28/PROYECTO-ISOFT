import {
  CalendarToday,
  CheckCircle,
  List,
  Lock
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import useCrearProyecto from "@src/hooks/useCrearProyecto";
import React, { useState } from "react";

const ProyectoForm = () => {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [equipo, setEquipo] = useState([]);
  const [privacidad, setPrivacidad] = useState("");
  const [vista, setVista] = useState("Lista");
  const [fechaEstimacion, setFechaEstimacion] = useState("");
  const fechaCreacion = new Date().toLocaleString();
  const [objetivos, setObjetivos] = useState([]);

  //INFO DE USUARIO EN SESION
  const info = JSON.parse(localStorage.getItem('userSession'));
  const userData = info.userData[0];


  // Hook personalizado para la creación de proyectos
  const { crearProyecto, loading } = useCrearProyecto();

  const handleSave = async () => {
    const proyectoData = {
      nombreProyecto,
      descripcion,
      equipo,
      privacidad,
      vista,
      fechaFinalizacion: fechaEstimacion,
      fechaCreacion: new Date().toLocaleString(),
      objetivos,
      IdAdmin: userData._id || "",
    };

    try {
      const data = await crearProyecto(proyectoData);
      // Redirige después de crear el proyecto
      setTimeout(() => {
        window.location.href = "/inicio";
      }, 500);
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };
 
  return (
    <>
      <PageBreadcrumb title="Creación de proyecto" subName="Crear" />

      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "80vh" }}>
        <Grid item xs={12} md={8} lg={6}>
          <Card sx={{ borderRadius: "16px", p: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
                Nuevo Proyecto
              </Typography>
              <Box mt={3} component="form">
                <TextField
                  fullWidth
                  label="Nombre del Proyecto"
                  variant="outlined"
                  margin="normal"
                  value={nombreProyecto}
                  onChange={(e) => setNombreProyecto(e.target.value)}
                  required
                  // error={!nombreProyecto}
                  // helperText={!nombreProyecto ? "Es necesario un nombre para el proyecto." : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CheckCircle color={nombreProyecto ? "primary" : "disabled"} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Descripción"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <List color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Fecha estimada de finalización"
                  type="date"
                  variant="outlined"
                  margin="normal"
                  value={fechaEstimacion}
                  onChange={(e) => setFechaEstimacion(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Privacidad</InputLabel>
                  <Select
                    value={privacidad}
                    onChange={(e) => setPrivacidad(e.target.value)}
                    label="Privacidad"
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="Privado">Privado</MenuItem>
                    <MenuItem value="Compartido">Compartido</MenuItem>
                  </Select>
                </FormControl>

                <Box mt={4} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={!nombreProyecto}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      boxShadow: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 5,
                      },
                    }}
                  >
                    Crear Proyecto
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProyectoForm;
