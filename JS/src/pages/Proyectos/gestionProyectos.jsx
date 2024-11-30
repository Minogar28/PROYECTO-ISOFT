import {
  Add,
  CalendarToday,
  Chat,
  Dashboard,
  Timeline,
  ViewList,
  Work, Group,
  Assignment,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Grid,
  List, ListItem, ListItemText,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography, Avatar
} from "@mui/material";
import React, { useState } from "react";
import Calendario from "../apps/Calendar";
import Kanban from "../apps/Kanban";
import Informes from "./informes";
import ProjectDetails from "./detallesProyecto"; // Importar el nuevo componente
import Tareas from "./tareas";
import Seguridad from "./seguridad"
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

function ProjectView({ project }) {
  const [value, setValue] = useState(0);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Establecer el objetivo del proyecto", due_date: "2024-11-20", priority: "High", checklists: [], assignee_avatar: "" },
    { id: 2, title: "Programar una reunión inicial", due_date: "2024-11-22", priority: "Medium", checklists: [], assignee_avatar: "" },
  ]);
  const colaboradores = ["Juan Pérez", "Ana Gómez", "Carlos López"];

  const [newTask, setNewTask] = useState({ title: "", due_date: "", priority: "Low" });
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const [openModal, setOpenModal] = useState(false);

  const handleAddTask = () => {
    if (newTask.title && newTask.due_date) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1, checklists: [], assignee_avatar: "" }]);
      setNewTask({ title: "", due_date: "", priority: "Low" });
      setOpenModal(false);
    }
  };


  return (
    <>
      <Grid sx={{ flexGrow: 1, p: 3, maxWidth: "100%", margin: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
          {project.nombreProyecto}
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

              <Tab icon={<ViewList />} label="Tareas" />
              <Tab icon={<Dashboard />} label="Tablero" />
              <Tab icon={<Timeline />} label="Informes" />
              <Tab icon={<Work />} label="Detalles del proyecto" />
              <Tab icon={<CalendarToday />} label="Calendario" />
              {/* <Tab icon={<Assignment />} label="Flujo de trabajo" /> */}
              {/* <Tab icon={<Chat />} label="Mensajes" /> */}
              <Tab icon={<Chat />} label="Seguridad" />

            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            {console.log("pro", project)}

            <Tareas
              tasks={tasks}
              setTasks={setTasks}
              colaboradores={project.equipo} // Lista de colaboradores del proyecto
              IdProyecto={project._id} // ID del proyecto
            />

          </TabPanel>

          <TabPanel value={value} index={1}>
            <Kanban />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Informes />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <ProjectDetails project={project} />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <Calendario />
          </TabPanel>

          <TabPanel value={value} index={5}>
            <Seguridad proyecto ={project}/>
          </TabPanel>

          


        </Box>
      </Grid>
    </>

  );
}

export default ProjectView;
