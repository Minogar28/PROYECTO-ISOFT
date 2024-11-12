import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Add,
  CalendarToday,
  Assignment,
  ViewList,
  Dashboard,
  Chat,
  Timeline,
  Work
} from "@mui/icons-material";
import Kanban from "../apps/Kanban";
import Calendario from "../apps/Calendar";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, borderRadius: 2, boxShadow: 2, bgcolor: "background.paper" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function ProjectView() {
  const [value, setValue] = useState(0);
  const [tasks, setTasks] = useState([
    { name: "Establecer el objetivo del proyecto", responsible: "", dueDate: "" },
    { name: "Programar una reunión inicial", responsible: "", dueDate: "" },
    { name: "Establecer la última fecha límite", responsible: "", dueDate: "" },
  ]);
  const [newTask, setNewTask] = useState("");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, { name: newTask, responsible: "", dueDate: "" }]);
      setNewTask("");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, maxWidth: "100vh", margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
        Proyecto:
      </Typography>

      <Box sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden" }}>
        <AppBar position="static" color="default" sx={{ boxShadow: 1 }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="project views tabs"
          >
            <Tab icon={<ViewList />} label="Lista" />
            <Tab icon={<Dashboard />} label="Tablero" />
            <Tab icon={<Timeline />} label="Informes" />
            <Tab icon={<Work />} label="Objetivos" />
            <Tab icon={<CalendarToday />} label="Calendario" />
            <Tab icon={<Assignment />} label="Flujo de trabajo" />
            <Tab icon={<Chat />} label="Mensajes" />
            <Tab icon={<Chat />} label="Seguridad" />

          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <TextField
              variant="outlined"
              placeholder="Agregar tarea"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              fullWidth
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddTask}
              sx={{ borderRadius: 2, boxShadow: 3 }}
            >
              Agregar tarea
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Nombre de la tarea
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Responsable
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Fecha de entrega
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow key={index} hover>
                    <TableCell align="center">{task.name}</TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <Assignment />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <CalendarToday />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={1}>
        <Kanban /> 
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Typography variant="h6">Vista de Cronograma (en construcción)</Typography>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Typography variant="h6">Vista de Panel (en construcción)</Typography>
        </TabPanel>

        <TabPanel value={value} index={4}>
          <Calendario/>
        </TabPanel>

        <TabPanel value={value} index={5}>
          <Typography variant="h6">Vista de Flujo de Trabajo (en construcción)</Typography>
        </TabPanel>

        <TabPanel value={value} index={6}>
          <Typography variant="h6">Vista de Mensajes (en construcción)</Typography>
        </TabPanel>

        <TabPanel value={value} index={7}>
          <Typography variant="h6">Vista de Seguridad (en construcción)</Typography>
        </TabPanel>
      </Box>
    </Box>
  );
}

export default ProjectView;
