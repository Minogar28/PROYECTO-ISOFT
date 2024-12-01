import React,{ useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from "@mui/material";
import { Assessment, CheckCircle, Error, HourglassEmpty, Person } from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";
import InformePdf from "./informePdf"
const Informes = ({ project, tasks }) => {
  const chartRef = useRef();
  const totalTareas = tasks.length;
  const tareasCompletadas = tasks.filter((task) => task.estado === "Completadas").length;
  const tareasPendientes = totalTareas - tareasCompletadas;

  const estadoProyecto =
    totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;

  const getEstadoProyecto = () => {
    if (estadoProyecto > 90) return "Muy Bueno";
    if (estadoProyecto > 80) return "Bueno";
    if (estadoProyecto > 60) return "Regular";
    return "En Retraso";
  };

  const calcularEstadoTarea = (fechaFinalizacion) => {
    const ahora = new Date();
    const finalizacion = new Date(fechaFinalizacion);
    const diferenciaHoras = (finalizacion - ahora) / (1000 * 60 * 60);

    if (diferenciaHoras > 24) return "A tiempo";
    if (diferenciaHoras > 0) return "Próximo a vencer";
    return "Retrasada";
  };

  // Configuración del gráfico de barras apiladas
  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      height: 380,
    },
    series: [
      {
        name: "Completadas",
        data: [tareasCompletadas],
      },
      {
        name: "Pendientes",
        data: [tareasPendientes],
      },
    ],
    xaxis: {
      categories: ["Tareas"],
    },
    yaxis: {
      title: { text: "Cantidad de Tareas" },
    },
    colors: ["#4caf50", "#f44336"], // Colores para completadas y pendientes
    title: { text: "Estado de Tareas", align: "center" },
  };

  const renderEstadoIcono = (estado) => {
    switch (estado) {
      case "Completadas":
        return <CheckCircle color="success" />;
      case "Pendiente":
        return <HourglassEmpty color="warning" />;
      case "Por Hacer":
        return <Error color="error" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Encabezado de métricas */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
          Estado proyecto: {getEstadoProyecto()}
        </Typography>
        <InformePdf project={project} tasks={tasks} chartRef={chartRef}/>
      </Box>

      {/* Barra de carga */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Nivel de avance de proyecto
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LinearProgress
            variant="determinate"
            value={estadoProyecto}
            sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
          />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {Math.round(estadoProyecto)}%
          </Typography>
        </Box>
      </Box>

      {/* Gráfico de barras */}
      <Box ref={chartRef}sx={{ mb: 4 }}>
       
        <ReactApexChart
          className="apex-charts"
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height={380}
        />
      </Box>

      {/* Tabla con estados de tareas */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Tarea
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Asignado a
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Estado de la Tarea
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Fecha de Creación
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Plazo de Entrega
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Estado Actual
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id.$oid}>
                <TableCell align="center">{task.nombreTarea}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Person color="primary" />
                    {task.asignados
                      .map((asignado) => asignado.NombreCompleto)
                      .join(", ")}
                  </Box>
                </TableCell>
                <TableCell align="center">{renderEstadoIcono(task.estado)}</TableCell>
                <TableCell align="center">
                  {new Date(task.fechaDeCreacion).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(task.fechaFinalizacion).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {calcularEstadoTarea(task.fechaFinalizacion)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Informes;
