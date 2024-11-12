import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { List, CalendarToday, TableChart, ViewList } from "@mui/icons-material";
import Swal from "sweetalert2";
import { PageBreadcrumb } from "@src/components";

const ProyectoForm = () => {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [equipo, setEquipo] = useState("");
  const [privacidad, setPrivacidad] = useState("");
  const [vista, setVista] = useState("Lista");

  const handleSave = () => {
    // Lógica para guardar el proyecto en la base de datos
    // Aquí podrías enviar la data a un backend o simplemente hacer un console.log
    console.log({
      nombreProyecto,
      descripcion,
      equipo,
      privacidad,
      vista,
    });

    // Mostrar SweetAlert de éxito
    Swal.fire({
      icon: "success",
      title: "Proyecto guardado",
      text: "Se ha guardado el proyecto correctamente",
      confirmButtonText: "Aceptar",
    });
  };

  return (
    <>
                <PageBreadcrumb title="Creación de proyecto" subName="Crear" />

    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "70vh" }}>

      <Grid item xs={12} md={6}>
        <Card sx={{ borderRadius: "16px", p: 3 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
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
                error={!nombreProyecto}
                helperText={!nombreProyecto ? "Es necesario un nombre para el proyecto." : ""}
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
              />

              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Selecciona un equipo</InputLabel>
                <Select
                  value={equipo}
                  onChange={(e) => setEquipo(e.target.value)}
                  label="Selecciona un equipo"
                >
                  <MenuItem value="Equipo 1">Equipo 1</MenuItem>
                  <MenuItem value="Equipo 2">Equipo 2</MenuItem>
                  <MenuItem value="Equipo 3">Equipo 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Privacidad</InputLabel>
                <Select
                  value={privacidad}
                  onChange={(e) => setPrivacidad(e.target.value)}
                  label="Privacidad"
                >
                  <MenuItem value="Privado">Privado</MenuItem>
                  <MenuItem value="Compartido">Compartido</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle1" mt={2}>
                Vista predeterminada
              </Typography>
              <ToggleButtonGroup
                value={vista}
                exclusive
                onChange={(e, newVista) => setVista(newVista)}
                fullWidth
                sx={{ mt: 1 }}
              >
                <ToggleButton value="Lista">
                  <ViewList />
                  Lista
                </ToggleButton>
                <ToggleButton value="Tablero">
                  <TableChart />
                  Tablero
                </ToggleButton>
                <ToggleButton value="Cronograma">
                  <List />
                  Cronograma
                </ToggleButton>
                <ToggleButton value="Calendario">
                  <CalendarToday />
                  Calendario
                </ToggleButton>
              </ToggleButtonGroup>

              <Box mt={4} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={!nombreProyecto}
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
