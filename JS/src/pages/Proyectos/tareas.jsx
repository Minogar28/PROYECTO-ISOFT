import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Autocomplete,
  IconButton,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { LuX } from "react-icons/lu";
import useProyecto from "@src/hooks/useProyecto.js";
import { ExpandMore, Delete, Add } from "@mui/icons-material";

import { Assignment, PriorityHigh, CalendarToday, People } from "@mui/icons-material";

function Tareas({ colaboradores, IdProyecto }) {
  const [newTask, setNewTask] = useState({
    nombreTarea: "",
    descripcion: "",
    prioridad: "Baja",
    fechaFinalizacion: "",
    asignados: [],
    estado: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const { tareas, listarTareas, agregarTarea, actualizarTarea } = useProyecto();

  useEffect(() => {
    listarTareas();
  }, [listarTareas]);

  const filteredTasks = tareas.filter((task) => task.IdProyecto === IdProyecto);
  // const handleRemoveAsignado = async (taskId, asignadoId) => {
  //   try {
  //     const updatedTask = await actualizarTarea({
  //       taskId,
  //       asignados: filteredTasks
  //         .find((task) => task._id.$oid === taskId)
  //         .asignados.filter((a) => a._id !== asignadoId),
  //     });
  //     listarTareas(); // Refresca la lista de tareas
  //   } catch (error) {
  //     console.error("Error al eliminar asignado:", error);
  //   }
  // };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.nombreTarea && newTask.fechaFinalizacion && newTask.asignados) {
      try {
        await agregarTarea({
          ...newTask,
          IdProyecto,
          fechaDeCreacion: new Date().toISOString(),
        });

        listarTareas();
        setNewTask({
          nombreTarea: "",
          descripcion: "",
          prioridad: "Baja",
          fechaFinalizacion: "",
          asignados: [],
        });
        setOpenModal(false);
      } catch (error) {
        console.error("Error al agregar tarea:", error.message);
      }
    }
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>

      <Box sx={{ mb: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap", // Permitir que los elementos se apilen en pantallas pequeñas
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            gap: 2, // Espaciado entre elementos
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Assignment fontSize="large" />
            Tareas del Proyecto
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setOpenModal(true)}
            sx={{
              textTransform: "none",
              px: 3,
              py: 1,
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "primary.dark",
                boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Nueva tarea
          </Button>
        </Box>

        {/* Task List */}
        <Box>
          {filteredTasks.map((task, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 1,
                border: "none", // Elimina cualquier borde
                "&:before": {
                  display: "none", // Elimina la línea divisoria por defecto de Material-UI
                },
                borderRadius: "20px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  bgcolor: "primary",
                  borderRadius: "20px",
                }}
              >
                <Stack
                  direction={{
                    xs: "column", // Apilado en pantallas pequeñas
                    sm: "row", // Horizontal en pantallas medianas y grandes
                  }}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ width: "100%", gap: { xs: 1, sm: 2 } }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Assignment fontSize="small" />
                    {task.nombreTarea}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: 1, sm: 2 },
                      alignItems: "center",
                      flexWrap: "wrap", // Permitir ajuste en pantallas pequeñas
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontStyle: "italic",
                        color: "grey.700",
                      }}
                    >
                      <CalendarToday fontSize="small" />
                      {new Date(task.fechaDeCreacion).toLocaleDateString()}
                    </Typography>
                    <Chip
                      icon={<PriorityHigh />}
                      label={` ${task.prioridad}`}
                      color={
                        task.prioridad === "Alta"
                          ? "error"
                          : task.prioridad === "Media"
                            ? "warning"
                            : "success"
                      }
                      size="small"
                    />
                  </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <People />
                    Asignados:
                  </Typography>
                  <Box>
                    {task.asignados.map((asignado) => (
                      <Stack
                        key={asignado._id}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          p: 1,
                          mb: 1,
                          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Typography variant="body2">
                          {asignado.NombreCompleto} - {asignado.rol} ({asignado.permiso})
                        </Typography>
                      </Stack>
                    ))}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      mt: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Assignment />
                    Descripción:
                  </Typography>
                  <Typography variant="body2">{task.descripcion || "N/A"}</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>


      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth={"md"} fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Crear Nueva Tarea</Typography>
          <IconButton onClick={() => setOpenModal(false)}>
            <LuX />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ overflowY: "auto" }} dividers>
          <form onSubmit={handleAddTask}>
            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre de la Tarea"
                  name="nombreTarea"
                  value={newTask.nombreTarea}
                  onChange={handleNewTaskChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="descripcion"
                  value={newTask.descripcion}
                  onChange={handleNewTaskChange}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Prioridad"
                  name="prioridad"
                  value={newTask.prioridad}
                  onChange={handleNewTaskChange}
                >
                  <MenuItem value="Alta">Alta</MenuItem>
                  <MenuItem value="Media">Media</MenuItem>
                  <MenuItem value="Baja">Baja</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  multiple
                  options={colaboradores}
                  getOptionLabel={(option) => option.NombreCompleto}
                  value={newTask.asignados}
                  onChange={(event, newValue) =>
                    setNewTask((prev) => ({ ...prev, asignados: newValue }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Asignar a"
                      placeholder="Seleccionar usuarios"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de Finalización"
                  name="fechaFinalizacion"
                  value={newTask.fechaFinalizacion}
                  onChange={handleNewTaskChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Estado"
                  name="estado"
                  value={newTask.estado}
                  onChange={handleNewTaskChange}
                >
                  <MenuItem value="Por Hacer">Por Hacer</MenuItem>
                  <MenuItem value="En Desarrollo">En Desarrollo</MenuItem>
                  <MenuItem value="En Prueba">En Prueba</MenuItem>
                  <MenuItem value="Completadas">Completadas</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  textTransform: "none",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                Guardar
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Tareas;
