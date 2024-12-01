import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Card, Grid,
  CardContent,
  Avatar, IconButton
} from "@mui/material";
import { Folder, DateRange, Person, AddBox, Group } from "@mui/icons-material";
import ProjectView from "./gestionProyectos";
import { PageBreadcrumb } from "@src/components";
import useProyecto from "@src/hooks/useProyecto.js";  // Importa el hook personalizado
import { Delete } from "@mui/icons-material";


function ProjectList({ projects, onSelectProject, onDeleteProject }) {
  return (
    <Box
      sx={{
        maxHeight: "350px", // Define la altura máxima del contenedor
        overflowY: "auto", // Habilita el scroll vertical si es necesario
        overflowX: "hidden", // Evita el scroll horizontal
        "&::-webkit-scrollbar": {
          width: "8px", // Ancho del scroll
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#b0bec5", // Color del scroll
          borderRadius: "4px", // Bordes redondeados del scroll
        },

      }}
    >
      <List>
        {projects.map((project) => (
          <ListItem key={project._id} disablePadding  sx={{
            mb: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Cambia a columna en pantallas pequeñas
            alignItems: { xs: "flex-start", sm: "center" },
          }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <ListItemButton
                onClick={() => onSelectProject(project)}
                sx={{
                  borderRadius: 2,
                  boxShadow: 1,
                  p: 2,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" }, // Diseño en columna para pantallas pequeñas
                  alignItems: { xs: "flex-start", sm: "center" },
                }}
              >
                <Avatar sx={{ bgcolor: "primary", mr: 2, width: 40, height: 40, display: { xs: "none", sm: "flex" }, }}>
                  <Folder fontSize="large" />
                </Avatar>
                <ListItemText
                primary={
                  <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: { xs: "center", sm: "left" } , textTransform: "uppercase",
                 }}>
                    {project.nombreProyecto}
                  </Typography>
                }
                secondary={
                  <Box
                    display="flex"
                    alignItems="center"
                    mt={1}
                    sx={{
                      justifyContent: { xs: "center", sm: "flex-start" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Fecha de creación: {project.fechaDeCreacion}
                    </Typography>
                  </Box>
                }
              />
                 <IconButton
                color="error"
                onClick={() => onDeleteProject(project)} // Enviar el objeto completo
                sx={{
                  alignSelf: { xs: "center", sm: "flex-start" },
                  ml: { sm: 2 },
                  mt: { xs: 1, sm: 0 },
                }}
              >
                <Delete />
              </IconButton>
              </ListItemButton>
             
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}


export default function Main() {
  const { proyectos, loading, error, listarProyectos, eliminarProyecto } = useProyecto();
  const [selectedProject, setSelectedProject] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    listarProyectos();
  }, [tabIndex]);  // Actualiza la lista al cambiar de pestaña

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };
  const handleDeleteProject = async (proyecto) => {
    try {
      await eliminarProyecto(proyecto); // Enviar el objeto completo al eliminar
    } catch (err) {
      console.error("Error al eliminar el proyecto:", err.message);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  //INFO DE USUARIO EN SESION
  const info = JSON.parse(localStorage.getItem('userSession'));
  const userData = info.userData[0];

  // Filtrar proyectos por usuario
  const userProjects = proyectos.filter((project) => project.IdAdmin === userData._id);

  return (
    <Box>
      <PageBreadcrumb title="Gestión de proyecto" subName="Proyectos" />

      {selectedProject ? (
        <ProjectView project={selectedProject} />
      ) : (
        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", maxHeight: "500px", p: 3 }}>
          <Card sx={{ width: "100%", borderRadius: 4, boxShadow: 5, p: 3 }}>
            <CardContent>

              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                centered
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  mb: 3,
                  "& .MuiTab-root": { minWidth: 120, fontWeight: "bold" },
                  "& .Mui-selected": { color: "secondary.main" },
                }}
              >
                <Tab icon={<AddBox />} label="Proyectos creados" />
              </Tabs>

              {loading ? (
                <Typography align="center">Cargando proyectos...</Typography>
              ) : error ? (
                <Typography align="center" color="error">Error: {error}</Typography>
              ) : (
                <ProjectList projects={userProjects} onSelectProject={handleSelectProject} onDeleteProject={handleDeleteProject} // Pasar la función de eliminar
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Box>
  );
}
