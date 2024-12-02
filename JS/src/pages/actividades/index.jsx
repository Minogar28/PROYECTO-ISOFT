import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Card,
  Grid,
  CardContent,
  Avatar,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { Folder, Add } from "@mui/icons-material";
import { useProyecto } from "../../hooks/usehook"; // Hook personalizado
import Tablero from "./vistaTareas"; // Importa el componente Kanban
import { PageBreadcrumb } from "@src/components";

// Componente para listar proyectos
function ProjectList({ projects, onViewTasks }) {
  return (
    <List>
      {projects.map((project) => (
        <ListItem key={project._id} disablePadding sx={{ mb: 2 }}>
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            width: "100%",
            gap: 2,
          }}>
            <ListItemButton
              sx={{
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
                flexGrow: 1,
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "center" },
                gap: 2,
              }}
            >
              <Avatar sx={{ bgcolor: "primary.main", mr: 1, width: 46, height: 46 }}>
                <Folder fontSize="large" />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {project.nombreProyecto}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      Fecha de creación: {project.fechaDeCreacion}
                    </Typography>
                  }
                />
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onViewTasks(project)} // Llama la función al hacer clic
                sx={{
                  alignSelf: { xs: "flex-start", md: "center" },
                  mt: { xs: 2, md: 0 },
                }}
              >
                Ver Tareas
              </Button>
            </ListItemButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

export default function TareasIndex() {
  const { proyectos, loading, error, listarPorMiembro, añadirMiembro } = useProyecto(); // Hook para gestionar proyectos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // Estado para manejar el proyecto seleccionado
  const info = JSON.parse(localStorage.getItem("userSession"));
  const userData = info.userData[0];
  const [joinProjectData, setJoinProjectData] = useState({
    nombreProyecto: "",
    invitacion: "",
  });
  const [miembro, setMiembro] = useState({
    _id: userData._id, // ID del miembro
    NombreCompleto: userData.NombreCompleto, // Nombre del miembro
    Identificacion: userData.NumeroIdentificacion || "", // Identificación
    rol: "Colaborador",
    permiso: "Solo Ver",
  });

  // Cargar proyectos por miembro al montar el componente
  useEffect(() => {
    listarPorMiembro(userData._id);
  }, [userData._id]);

  const handleJoinProject = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setJoinProjectData({ nombreProyecto: "", invitacion: "" });
  };

  const handleSubmitJoinProject = async () => {
    try {
      const { nombreProyecto, invitacion } = joinProjectData;
      if (!nombreProyecto && !invitacion) {
        Swal.fire("Error", "Debes proporcionar el nombre del proyecto o el código de invitación", "error");
        return;
      }
      handleCloseModal();
      await añadirMiembro(nombreProyecto, invitacion, miembro); // Llamar la función del hook

      listarPorMiembro(userData._id); // Actualizar la lista de proyectos después de unirse
    } catch (error) {
      console.error("Error al unirse al proyecto:", error.message);
    }
  };

  const handleViewTasks = (project) => {
    setSelectedProject(project); // Selecciona el proyecto actual para mostrar Tablero
  };

  const handleBackToProjects = () => {
    setSelectedProject(null); // Regresa a la vista de proyectos
  };

  return (
    <>
      <PageBreadcrumb title="Mis tareas" subName="Actividades" />

      {selectedProject ? (
        // Mostrar el componente Kanban (Tablero)
        <Tablero project={selectedProject} onBack={handleBackToProjects} />
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "60vh", p: 3 }}
        >
          <Card sx={{ width: "100%", borderRadius: 4 }}>
            <CardContent sx={{
              width: "100%",
              padding: "16px", // Puedes ajustar el padding del contenido
              boxSizing: "border-box",
            }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Proyectos
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={handleJoinProject}
                >
                  Unirme a un Proyecto
                </Button>
              </Box>

              {loading ? (
  <Typography align="center">Cargando proyectos...</Typography>
) : proyectos.length === 0 ? ( // Verifica si no hay proyectos
  <Typography align="center" color="text.secondary">
    No eres colaborador de ningún proyecto.
  </Typography>
) : (
  <ProjectList
    projects={proyectos}
    onViewTasks={handleViewTasks} // Pasa la función de ver tareas
  />
)}

            </CardContent>
          </Card>
        </Grid>
      )}

      <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="join-project-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "90%",
            maxWidth: 400,
          }}
        >
          <Typography id="join-project-modal" variant="h6" sx={{ mb: 3 }}>
            Unirse a un Proyecto
          </Typography>
          <TextField
            fullWidth
            label="Nombre del Proyecto"
            variant="outlined"
            value={joinProjectData.nombreProyecto}
            onChange={(e) => setJoinProjectData({ ...joinProjectData, nombreProyecto: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Ingrese link invitación"
            variant="outlined"
            value={joinProjectData.invitacion}
            onChange={(e) => setJoinProjectData({ ...joinProjectData, invitacion: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmitJoinProject}>
              Unirse
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
