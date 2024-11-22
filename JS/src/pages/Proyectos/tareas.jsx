import React, { useState, useRef } from "react";
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
import { LuCalendar, LuChevronDown, LuListChecks, LuMessageSquare } from "react-icons/lu";

function Tareas({ colaboradores }) {
  const tasksRef = useRef([]); // Usamos un useRef para almacenar las tareas sin desencadenar renderizaciones
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Baja",
    due_date: "",
    assignee: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [taskSectionOpen, setTaskSectionOpen] = useState(true);
  const [, setForceUpdate] = useState(0); // Usamos un dummy state para forzar re-renderizado en TaskSection si es necesario

  const handleAddTask = () => {
    if (newTask.title && newTask.due_date && newTask.assignee) {
      const creationDate = new Date().toISOString().split("T")[0]; // Fecha de creación automática
      const newTaskWithId = {
        ...newTask,
        id: tasksRef.current.length + 1,
        creation_date: creationDate,
        checklists: [],
      };
      tasksRef.current.push(newTaskWithId); // Añadimos la tarea a la referencia mutable
      setNewTask({ title: "", description: "", priority: "Baja", due_date: "", assignee: "" });
      setOpenModal(false);
      setForceUpdate((prev) => prev + 1); // Forzamos re-renderizado sólo en TaskSection si es necesario
    }
  };

  const Task = ({ task, classname }) => {
    const [completed, setCompleted] = useState(false);

    return (
      <Box
        sx={{
          classname,
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "16px",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Checkbox
            id={`task-${task.id}`}
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <Typography component="label" htmlFor={`task-${task.id}`} sx={{ fontWeight: 500 }}>
            {task.title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 500 }}>{task.assignee}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <LuCalendar size={16} style={{ marginRight: "6px" }} />
              {task.due_date}
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <LuListChecks size={16} style={{ marginRight: "6px" }} />
              {task.checklists.length} / {task.checklists.length}
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <LuMessageSquare size={16} style={{ marginRight: "6px" }} />
              21
            </Typography>
            <Typography
              sx={{
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: 500,
                p: "4px",
                bgcolor:
                  task.priority === "Alta"
                    ? "error.lighter"
                    : task.priority === "Medio"
                    ? "warning.lighter"
                    : "success.lighter",
                color:
                  task.priority === "Alta"
                    ? "error.darker"
                    : task.priority === "Medio"
                    ? "warning.darker"
                    : "success.darker",
              }}
            >
              {task.priority}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

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
                style={{ marginRight: "8px", transform: taskSectionOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
              />
              Lista de Tareas ({tasksRef.current.length})
            </Typography>
            <Collapse in={taskSectionOpen}>
              <Card sx={{ p: 2 }}>
                {tasksRef.current.map((task, idx) => (
                  <Task key={idx} task={task} />
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
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Descripción"
            multiline
            rows={3}
            variant="outlined"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Prioridad</InputLabel>
            <Select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <MenuItem value="Baja">Baja</MenuItem>
              <MenuItem value="Medio">Media</MenuItem>
              <MenuItem value="Alta">Alta</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Fecha de finalización"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newTask.due_date}
            onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Asignado a</InputLabel>
            <Select
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
            >
              {colaboradores.map((colaborador, index) => (
                <MenuItem key={index} value={colaborador}>
                  {colaborador}
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
