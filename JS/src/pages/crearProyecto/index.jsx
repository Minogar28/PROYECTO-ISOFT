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
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
} from "@mui/material";
import { List, CalendarToday, TableChart, ViewList, People, Lock, CheckCircle } from "@mui/icons-material";
import Swal from "sweetalert2";
import { PageBreadcrumb } from "@src/components";

const ProyectoForm = () => {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [equipo, setEquipo] = useState("");
  const [privacidad, setPrivacidad] = useState("");
  const [vista, setVista] = useState("Lista");

  const handleSave = () => {
    console.log({
      nombreProyecto,
      descripcion,
      equipo,
      privacidad,
      vista,
    });

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

      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "80vh" }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "16px", p: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold"}}>
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

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Selecciona un equipo</InputLabel>
                  <Select
                    value={equipo}
                    onChange={(e) => setEquipo(e.target.value)}
                    label="Selecciona un equipo"
                    startAdornment={
                      <InputAdornment position="start">
                        <People />
                      </InputAdornment>
                    }
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

                <Typography variant="subtitle1" mt={3} sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                  Vista predeterminada
                </Typography>
                <ToggleButtonGroup
                  value={vista}
                  exclusive
                  onChange={(e, newVista) => setVista(newVista)}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  <ToggleButton value="Lista" sx={{ flexGrow: 1, borderRadius: 1 }}>
                    <ViewList sx={{ mr: 1 }} />
                    Lista
                  </ToggleButton>
                  <ToggleButton value="Tablero" sx={{ flexGrow: 1, borderRadius: 1 }}>
                    <TableChart sx={{ mr: 1 }} />
                    Tablero
                  </ToggleButton>
                  <ToggleButton value="Cronograma" sx={{ flexGrow: 1, borderRadius: 1 }}>
                    <List sx={{ mr: 1 }} />
                    Cronograma
                  </ToggleButton>
                  <ToggleButton value="Calendario" sx={{ flexGrow: 1, borderRadius: 1 }}>
                    <CalendarToday sx={{ mr: 1 }} />
                    Calendario
                  </ToggleButton>
                </ToggleButtonGroup>

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
