import {
  Chat,
  Dashboard,
  Timeline,
  ViewList,
  Work
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Grid,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import ProjectDetails from "./detallesProyecto"; // Importar el nuevo componente
import Informes from "./informes";
import Seguridad from "./seguridad";
import Kanban from "./tablero";
import Tareas from "./tareas";
import useProyecto from "@src/hooks/useProyecto.js";

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

  const { tareas, listarTareas, agregarTarea, actualizarTarea } = useProyecto();
  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [tareasCargadas, setTareasCargadas] = useState(false);

  useEffect(() => {
    if (!tareasCargadas) {
      listarTareas().then(() => {
        setTareasCargadas(true); // Marcar las tareas como cargadas
      });
    }
  }, [tareasCargadas, listarTareas]);

  // Filtrar las tareas correspondientes al proyecto
  useEffect(() => {
    if (tareas.length > 0) {
      const filtradas = tareas.filter(
        (task) => task.IdProyecto === project._id
      );
      setTareasFiltradas(filtradas);
    }
  }, [tareas, project._id]);


  const [newTask, setNewTask] = useState({ title: "", due_date: "", priority: "Low" });
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const [openModal, setOpenModal] = useState(false);



  return (
    <>
      <Grid sx={{ flexGrow: 1, p: 3, maxWidth: "100%", margin: "auto" }}>
        <Typography variant="h1" align="center" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
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
              <Tab icon={<Chat />} label="Seguridad" />

            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>

            <Tareas
              colaboradores={project.equipo} // Lista de colaboradores del proyecto
              IdProyecto={project._id} // ID del proyecto
            />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Kanban project={project} />
          </TabPanel>

          <TabPanel value={value} index={2}>
            {console.log("AAAA", tareas)
            }
            <Informes project={project} tasks={tareasFiltradas} />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <ProjectDetails project={project} />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <Seguridad proyecto={project} />
          </TabPanel>
        </Box>
      </Grid>
    </>

  );
}

export default ProjectView;
