import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Avatar, TextField, IconButton } from "@mui/material";
import { CalendarToday, Group, Assignment, Dashboard, Visibility, VisibilityOff } from "@mui/icons-material";

function ProjectDetails({ project }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <Box>
    {/* Título del Panel */}
    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "WindowText" }}>
      <strong>Detalles del Proyecto</strong>
    </Typography>
  
    {/* Descripción y Código de Invitación */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap", // Permitir que las filas se ajusten en pantallas pequeñas
        gap: 2,
        mb: 4,
        justifyContent: "space-between",
        alignItems: "flex-start", // Alinear verticalmente
      }}
    >
      {/* Descripción */}
      <Box
        sx={{
          flex: "1 1 100%", // Ocupa todo el ancho en pantallas pequeñas
          "@media (min-width: 600px)": {
            flex: "1 1 45%", // Ocupa el 45% del ancho en pantallas medianas y grandes
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "text.primary", display: "flex", alignItems: "center" }}
        >
          <Dashboard sx={{ mr: 1, color: "secondary.main" }} /> Descripción
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {project.descripcion || "Sin descripción"}
        </Typography>
      </Box>
  
      {/* Código de Invitación */}
      <Box
        sx={{
          flex: "1 1 100%",
          "@media (min-width: 600px)": {
            flex: "1 1 45%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "text.primary", display: "flex", alignItems: "center" }}
        >
          Código de Invitación:
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
          <TextField
            type={showCode ? "text" : "password"}
            value={project.codigoInvitacion || "No disponible"}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              flexGrow: 1, // Ocupar el espacio disponible
            }}
          />
          <IconButton onClick={() => setShowCode(!showCode)}>
            {showCode ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  
    {/* Fechas */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 4,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {/* Fecha de Creación */}
      <Box
        sx={{
          flex: "1 1 100%",
          "@media (min-width: 600px)": {
            flex: "1 1 45%",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "text.primary", display: "flex", alignItems: "center" }}
        >
          <CalendarToday sx={{ mr: 1, color: "info.main" }} /> Creado el:
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {project.fechaDeCreacion || "No disponible"}
        </Typography>
      </Box>
  
      {/* Fecha de Finalización */}
      <Box
        sx={{
          flex: "1 1 100%",
          "@media (min-width: 600px)": {
            flex: "1 1 45%",
          },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "text.primary", display: "flex", alignItems: "center" }}
        >
          Finalización:
        </Typography>
        <TextField
          type="date"
          variant="outlined"
          size="small"
          value={project.fechaFinalizacion || ""}
          InputLabelProps={{ shrink: true }}
          sx={{
            width: "100%", // Ajusta automáticamente el ancho
          }}
        />
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
        <Group sx={{ mr: 1, color: "success.main" }} />Colaboradores 
      </Typography>
      {project.equipo.length > 0 ? (
        <Box
          sx={{
            maxHeight: 200,
            overflowY: "auto",
            pl: 3,
            pr: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
            bgcolor: "background.paper",
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
                  secondary={`Rol: ${miembro.rol} - Permiso: ${miembro.permiso}`}
                  primaryTypographyProps={{ variant: "body1", color: "text.primary" }}
                  secondaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: "text.secondary", pl: 3 }}>
          Sin colaboradores.
        </Typography>
      )}
    </Box>
  </Box>
  
  );
}

export default ProjectDetails;
