import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Avatar,TextField } from "@mui/material";
import { CalendarToday, Group, Assignment, Dashboard } from "@mui/icons-material";

function ProjectDetails({ project }) {
  return (
    <Box>
      {/* Título del Panel */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "primary.main" }}>
        <strong>Detalles del Proyecto</strong>
      </Typography>

      {/* Descripción */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "text.primary", display: "flex", alignItems: "center" }}>
          <Dashboard sx={{ mr: 1, color: "secondary.main" }} /> Descripción
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", pl: 3 }}>
          {project.descripcion || "Sin descripción"}
        </Typography>
      </Box>

      {/* Fechas */}
<Box sx={{ mb: 4 }}>
  <Typography
    variant="h6"
    sx={{
      fontWeight: "bold",
      mb: 2,
      color: "text.primary",
      display: "flex",
      alignItems: "center",
    }}
  >
    <CalendarToday sx={{ mr: 1, color: "info.main" }} /> Fechas
  </Typography>
  <Box
    sx={{
      display: "flex",
      flexDirection: "row", // Alinear en fila
      justifyContent: "space-between", // Distribuir espacio entre los elementos
      alignItems: "center",
      gap: 2,
      pl: 3,
      pr: 3, // Espaciado a la derecha
    }}
  >
    <Typography
      variant="body1"
      sx={{
        color: "text.secondary",
        display: "flex",
        alignItems: "center",
      }}
    >
      <strong>Creado el:</strong> {project.fechaDeCreacion || "No disponible"}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body1" sx={{ color: "text.secondary", display: "flex", alignItems: "center" }}>
        <strong>Finalización:</strong>
      </Typography>
      <TextField
        type="date"
        variant="outlined"
        size="small"
        value={project.fechaFinalizacion || ""}
        InputLabelProps={{ shrink: true }}
        sx={{
          width: 200,
        }}
      />
    </Box>
  </Box>
</Box>

      {/* Equipo */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "text.primary",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Group sx={{ mr: 1, color: "success.main" }} /> Equipo
        </Typography>
        {project.equipo.length > 0 ? (
          <Box
            sx={{
              maxHeight: 200, // Altura máxima del contenedor
              overflowY: "auto", // Scroll vertical si es necesario
              pl: 3,
              pr: 3,
              border: "1px solid #ddd", // Borde opcional para mayor claridad
              borderRadius: 2,
              bgcolor: "background.paper", // Fondo
              p: 1,
            }}
          >
            <List>
              {project.equipo.map((miembro, index) => (
                <ListItem
                  key={miembro._id}
                  sx={{
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    borderBottom: "1px solid #ddd",
                    pb: 2,
                  }}
                >
                  <Avatar sx={{ bgcolor: "secondary.light", width: 32, height: 32, mr: 2 }}>
                    {miembro.NombreCompleto[0]}
                  </Avatar>
                  <ListItemText
                    primary={miembro.NombreCompleto}
                    secondary={`ID: ${miembro.Identificacion} - Rol: ${miembro.rol} - Permiso: ${miembro.permiso}`}
                    primaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                    secondaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ color: "text.secondary", pl: 3 }}>
            Sin equipo asignado.
          </Typography>
        )}
      </Box>

      {/* Objetivos */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "text.primary",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Assignment sx={{ mr: 1, color: "warning.main" }} /> Objetivos
        </Typography>
        {project.objetivos.length > 0 ? (
          <Box
            sx={{
              maxHeight: 200, // Altura máxima del contenedor
              overflowY: "auto", // Scroll vertical si es necesario
              pl: 3,
              pr: 3,
              border: "1px solid #ddd", // Borde opcional para mayor claridad
              borderRadius: 2,
              bgcolor: "background.paper", // Fondo
              p: 1,
            }}
          >
            <List>
              {project.objetivos.map((objetivo, index) => (
                <ListItem key={index} sx={{ p: 0, display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "info.light", width: 24, height: 24, mr: 2 }}>{index + 1}</Avatar>
                  <ListItemText
                    primary={objetivo}
                    primaryTypographyProps={{ variant: "body1", color: "text.secondary" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ color: "text.secondary", pl: 3 }}>
            Sin objetivos definidos.
          </Typography>
        )}
      </Box>

    </Box>
  );
}

export default ProjectDetails;
