import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Folder, DateRange, Person, AddBox, Group } from "@mui/icons-material";
import ProjectView from "./gestionProyectos"; // Asegúrate de importar el componente ProjectView
import { PageBreadcrumb } from "@src/components";

// Ejemplo de proyectos creados y proyectos a los que perteneces
const createdProjects = [
  { id: 1, name: "Proyecto A", fechaCreacion: "01/01/2023", responsable: "Juan Pérez" },
  { id: 2, name: "Proyecto B", fechaCreacion: "15/02/2023", responsable: "Ana Gómez" },
];

const joinedProjects = [
  { id: 3, name: "Proyecto C", fechaCreacion: "10/03/2023", responsable: "Luis Martínez" },
  { id: 4, name: "Proyecto D", fechaCreacion: "20/04/2023", responsable: "Carlos López" },
];

function ProjectList({ projects, onSelectProject }) {
  return (
    <List>
      {projects.map((project) => (
        <ListItem key={project.id} disablePadding sx={{ mb: 2 }}>
          <ListItemButton onClick={() => onSelectProject(project)} sx={{ borderRadius: 2, boxShadow: 1, p: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2, width: 56, height: 56 }}>
              <Folder fontSize="large" />
            </Avatar>
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {project.name}
                </Typography>
              }
              secondary={
                <>
                  <Box display="flex" alignItems="center" mt={1}>
                    <DateRange fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">Fecha de creación: {project.fechaCreacion}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Person fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">Responsable: {project.responsable}</Typography>
                  </Box>
                </>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default function Main() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [tabIndex, setTabIndex] = useState(0); // Estado para gestionar la pestaña seleccionada

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (

    <Box>
      <PageBreadcrumb title="Gestión de proyecto" subName="Proyectos" />

      {selectedProject ? (
        <ProjectView project={selectedProject} />
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",minWidth:"100vh", minHeight: "70vh", p: 3 }}>
          <Card sx={{ width: "100%", borderRadius: 4, boxShadow: 5, p: 3, }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
                {tabIndex === 0 ? "Proyectos creados" : "Proyectos a los que pertenezco"}
              </Typography>

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
                <Tab icon={<Group />} label="Proyectos a los que pertenezco" />
              </Tabs>

              {tabIndex === 0 ? (
                <ProjectList projects={createdProjects} onSelectProject={handleSelectProject} />
              ) : (
                <ProjectList projects={joinedProjects} onSelectProject={handleSelectProject} />
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}
