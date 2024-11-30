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
  Card,Grid,
  CardContent,
  Avatar,IconButton
} from "@mui/material";
import { Folder, DateRange, Person, AddBox, Group } from "@mui/icons-material";
import ProjectView from "./gestionProyectos";
import { PageBreadcrumb } from "@src/components";
import { useProyecto } from "./useProyecto";  // Importa el hook personalizado
import {  Delete } from "@mui/icons-material";


function ProjectList({ projects, onSelectProject, onDeleteProject }) {
  return (
    <List>
      {projects.map((project) => (
        <ListItem key={project._id} disablePadding sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <ListItemButton
              onClick={() => onSelectProject(project)}
              sx={{ borderRadius: 2, boxShadow: 1, p: 2, flexGrow: 1 }}
            >
              <Avatar sx={{ bgcolor: "primary.main", mr: 2, width: 56, height: 56 }}>
                <Folder fontSize="large" />
              </Avatar>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {project.nombreProyecto}
                  </Typography>
                }
                secondary={
                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body2" color="text.secondary">
                      Fecha de creación: {project.fechaDeCreacion}
                    </Typography>
                  </Box>
                }
              />
            </ListItemButton>
            <IconButton
            color="error"
            onClick={() => onDeleteProject(project)} // Enviar el objeto completo
            sx={{ alignSelf: "center", ml: 2 }}
          >
            <Delete />
          </IconButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}


export default function Main() {
  const { proyectos, loading, error, listarProyectos,eliminarProyecto } = useProyecto();
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
        <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", p: 3 }}>
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
                <ProjectList projects={userProjects} onSelectProject={handleSelectProject}                   onDeleteProject={handleDeleteProject} // Pasar la función de eliminar
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Box>
  );
}
