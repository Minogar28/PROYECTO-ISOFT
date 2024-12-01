import React from "react";
import { Box, Typography, Paper, Button, Avatar, Divider, Grid } from "@mui/material";
import { PageBreadcrumb } from "@src/components";
import { AssignmentTurnedIn, Person } from "@mui/icons-material";
import { motion } from "framer-motion";
import logo from "@src/assets/images/iconoCelerium.png"; // Importa el logo

const Inicio = () => {
  const info = JSON.parse(localStorage.getItem("userSession"));
  const userData = info.userData[0];

  // Variantes para animaciones con Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const hoverEffect = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <PageBreadcrumb title="Inicio" subName="Páginas" />
      {/* Fondo dinámico */}
      <Box
        sx={{
          p: 4,
          bgcolor: "background.default",
          minHeight: "60vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fondo animado */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.1,
            zIndex: 0,
            animation: "moveBackground 10s infinite alternate",
          }}
        ></Box>

        {/* Encabezado de Bienvenida */}
        <Box sx={{ textAlign: "center", mb: 4, zIndex: 1, position: "relative" }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
              <img src={logo} alt="Logo" style={{ width: 100, height: 100 }} />
            </Box>
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              Buenas noches, {userData.Usuario || ""}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              ¡Esperamos que tengas un día productivo! Recuerda revisar tus pendientes y celebrar tus logros.
            </Typography>

            <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={3}>
              <motion.div whileHover={hoverEffect.hover}>
                <Button variant="outlined" color="inherit">
                  Mi semana
                </Button>
              </motion.div>
              <motion.div whileHover={hoverEffect.hover}>
                <Button variant="outlined" startIcon={<AssignmentTurnedIn />} color="inherit">
                  0 tareas finalizadas
                </Button>
              </motion.div>
              <motion.div whileHover={hoverEffect.hover}>
                <Button variant="outlined" startIcon={<Person />} color="inherit">
                  0 colaboradores
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>

        {/* Tarjetas de resumen */}
        <Grid container spacing={2} sx={{ mt: 4, zIndex: 1, position: "relative" }}>
          <Grid item xs={12} sm={6}>
            <motion.div whileHover={hoverEffect.hover}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  color: "text.primary",
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Último proyecto trabajado
                </Typography>
                <Typography variant="body2">Proyecto A - Módulo "Entrega"</Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div whileHover={hoverEffect.hover}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  color: "text.primary",
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Última interacción con
                </Typography>
                <Typography variant="body2">Ana Gómez</Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      <style>
        {`
          @keyframes moveBackground {
            from {
              background-position: 0 0;
            }
            to {
              background-position: 100% 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default Inicio;
