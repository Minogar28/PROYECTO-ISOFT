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
  Avatar,
} from "@mui/material";
import { Folder, DateRange, Person, AddBox, Group } from "@mui/icons-material";
import ProjectView from "./gestionProyectos";
import { PageBreadcrumb } from "@src/components";
import { useProyecto } from "./useProyecto";  // Importa el hook personalizado

function ProjectList({ projects, onSelectProject }) {
  return (
    <List>
      {projects.map((project) => (
        <ListItem key={project._id} disablePadding sx={{ mb: 2 }}>
          <ListItemButton onClick={() => onSelectProject(project)} sx={{ borderRadius: 2, boxShadow: 1, p: 2 }}>
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
                <>
                  <Box display="flex" alignItems="center" mt={1}>
                    <DateRange fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      Fecha de creación: {project.fechaDeCreacion}
                    </Typography>
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
  const { proyectos, loading, error, listarProyectos } = useProyecto();
  const [selectedProject, setSelectedProject] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    listarProyectos();
  }, [tabIndex]);  // Actualiza la lista al cambiar de pestaña

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
                <Tab icon={<Group />} label="Proyectos a los que perteneces" />
              </Tabs>

              {loading ? (
                <Typography align="center">Cargando proyectos...</Typography>
              ) : error ? (
                <Typography align="center" color="error">Error: {error}</Typography>
              ) : (
                <ProjectList projects={proyectos} onSelectProject={handleSelectProject} />
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Box>
  );
}
