import React from "react";
import { Box, Typography, Paper, Button, Avatar, Divider, Grid } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import { AssignmentTurnedIn, Person, EventNote, Settings } from "@mui/icons-material";
import logo from "@src/assets/images/iconoCelerium.png"; // Importa el logo

const Inicio = () => {
  return (
    <>
      <PageBreadcrumb title="Inicio" subName="Páginas" />
      <Box sx={{ p: 4, bgcolor: "background.default", minHeight: "60vh", color: "#fff" }}>
        {/* Encabezado de Bienvenida */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <img src={logo} alt="Logo" style={{ width: 100, height: 100 }} /> {/* Modifica el tamaño aquí */}
          </Box>
          <Typography variant="h6" sx={{ fontStyle: "italic" }}>
            {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
            Buenas noches, Juan
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            ¡Esperamos que tengas un día productivo! Recuerda revisar tus pendientes y celebrar tus logros.
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={3}>
            <Button variant="outlined" color="inherit">
              Mi semana
            </Button>
            <Button variant="outlined" startIcon={<AssignmentTurnedIn />} color="inherit">
              0 tareas finalizadas
            </Button>
            <Button variant="outlined" startIcon={<Person />} color="inherit">
              0 colaboradores
            </Button>
          </Box>
        </Box>

        {/* Sección de Actividades y Resumen */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper", color: "text.primary", mb: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src="https://via.placeholder.com/150" sx={{ width: 56, height: 56, mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Resumen de Actividades
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Último proyecto trabajado:
                </Typography>
                <Typography variant="body2">Proyecto A - Módulo "Entrega"</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Última interacción con:
                </Typography>
                <Typography variant="body2">Ana Gómez</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Próximo plazo:
                </Typography>
                <Typography variant="body2">15 de noviembre - Proyecto X</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Tareas en progreso:
                </Typography>
                <Typography variant="body2">5 Tareas activas</Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>

     
      </Box>
    </>
  );
};

export default Inicio;
