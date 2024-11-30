import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  Collapse,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { LuCalendar, LuChevronDown } from "react-icons/lu";
import { useProyecto } from "./useProyecto";

function Tareas({ colaboradores, IdProyecto }) {
  const [taskSectionOpen, setTaskSectionOpen] = useState(true);
  const [newTask, setNewTask] = useState({
    nombreTarea: "",
    descripcion: "",
    prioridad: "Baja",
    fechaFinalizacion: "",
    asignados: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const { tareas, listarTareas, agregarTarea } = useProyecto(); // Hook para interactuar con la API

  // Cargar las tareas al montar el componente
  useEffect(() => {
    listarTareas();
  }, [listarTareas]);

  // Filtrar las tareas por IdProyecto
  const filteredTasks = tareas.filter((task) => task.IdProyecto === IdProyecto);

  const handleAddTask = async () => {
    if (newTask.nombreTarea && newTask.fechaFinalizacion && newTask.asignados) {
      try {
        // Llamamos a la API para agregar la tarea
        const tareaCreada = await agregarTarea({
          ...newTask,
          IdProyecto, // Pasamos el ID del proyecto
          estado: "Pendiente",
          fechaDeCreacion: new Date().toISOString(),
        });

        // Actualizamos la lista local de tareas llamando a `listarTareas`
        listarTareas();
        setNewTask({
          nombreTarea: "",
          descripcion: "",
          prioridad: "Baja",
          fechaFinalizacion: "",
          asignados: "",
        });
        setOpenModal(false);
      } catch (error) {
        console.error("Error al agregar tarea:", error.message);
      }
    }
  };

  const Task = ({ task }) => (
    <Box
      key={task._id.$oid}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "16px",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox id={`task-${task._id.$oid}`} />
        <Typography component="label" htmlFor={`task-${task._id.$oid}`} sx={{ fontWeight: 500 }}>
          {task.nombreTarea}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: 500 }}>
          {task.asignados && task.asignados.length > 0 ? task.asignados.join(", ") : "No asignados"}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <LuCalendar size={16} style={{ marginRight: "6px" }} />
          {task.fechaFinalizacion}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Box sx={{ mb: 4 }}>
        {/* Botón para agregar tarea */}
        <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setOpenModal(true)}
          >
            Agregar tarea
          </Button>
        </Box>

        {/* Lista de tareas */}
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 3, textAlign: "center", color: "primary.main" }}
            >
              Tareas del Proyecto
            </Typography>

            <Typography
              onClick={() => setTaskSectionOpen(!taskSectionOpen)}
              sx={{ mb: 2, cursor: "pointer", fontWeight: 500 }}
            >
              <LuChevronDown
                style={{
                  marginRight: "8px",
                  transform: taskSectionOpen ? "rotate(0deg)" : "rotate(-90deg)",
                }}
              />
              Lista de Tareas ({filteredTasks.length})
            </Typography>
            <Collapse in={taskSectionOpen}>
              <Card sx={{ p: 2 }}>
                {filteredTasks.map((task) => (
                  <Task key={task._id.$oid} task={task} />
                ))}
              </Card>
            </Collapse>
          </CardContent>
        </Card>
      </Box>

      {/* Modal para agregar tarea */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="add-task-modal">
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
            maxWidth: 500,
          }}
        >
          <Typography id="add-task-modal" variant="h6" sx={{ mb: 3, textAlign: "center" }}>
            Agregar Nueva Tarea
          </Typography>
          <TextField
            fullWidth
            label="Nombre de la tarea"
            variant="outlined"
            value={newTask.nombreTarea}
            onChange={(e) => setNewTask({ ...newTask, nombreTarea: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Descripción"
            multiline
            rows={3}
            variant="outlined"
            value={newTask.descripcion}
            onChange={(e) => setNewTask({ ...newTask, descripcion: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Prioridad</InputLabel>
            <Select
              value={newTask.prioridad}
              onChange={(e) => setNewTask({ ...newTask, prioridad: e.target.value })}
            >
              <MenuItem value="Baja">Baja</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
              <MenuItem value="Alta">Alta</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Fecha de finalización"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newTask.fechaFinalizacion}
            onChange={(e) => setNewTask({ ...newTask, fechaFinalizacion: e.target.value })}
            sx={{ mb: 2 }}
          />
       <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Asignado a</InputLabel>
          <Select
            value={newTask.asignados}
            onChange={(e) => setNewTask({ ...newTask, asignados: e.target.value })}
          >
            {colaboradores.map((colaborador, index) => (
              <MenuItem key={index} value={colaborador._id}>
                {colaborador.NombreCompleto}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          <Button fullWidth variant="contained" color="primary" onClick={handleAddTask}>
            Guardar
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Tareas;
