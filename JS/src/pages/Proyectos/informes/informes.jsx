import React, { useRef } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import InformePdf from "./informePdf";

const Informes = ({ project, tasks }) => {
  const chartRef = useRef();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      height: isSmallScreen ? 250 : 380,
    },
    series: [
      {
        name: "Completadas",
        data: [tareasCompletadas],
      },
      {
        name: "Por Hacer",
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

  return (
    <Box sx={{ p: isSmallScreen ? 2 : 4 }}>
      {/* Encabezado de métricas */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-between",
          mb: 4,
          alignItems: isSmallScreen ? "flex-start" : "center",
        }}
      >
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          sx={{ fontWeight: "bold", color: "primary.main", mb: isSmallScreen ? 2 : 0 }}
        >
          Estado proyecto: {getEstadoProyecto()}
        </Typography>
        <InformePdf project={project} tasks={tasks} chartRef={chartRef} />
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
            sx={{
              flexGrow: 1,
              height: isSmallScreen ? 8 : 10,
              borderRadius: 5,
            }}
          />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {Math.round(estadoProyecto)}%
          </Typography>
        </Box>
      </Box>

      {/* Gráfico de barras */}
      <Box ref={chartRef} sx={{ mb: 4 }}>
        <ReactApexChart
          className="apex-charts"
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height={chartOptions.chart.height}
        />
      </Box>

      {/* Tabla con estados de tareas */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 4,
          maxHeight: isSmallScreen ? 300 : 400,
          overflowY: "auto",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold", width: isSmallScreen ? "40%" : "30%" }}>
                Tarea
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold", width: "20%" }}>
                Asignado a
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: "15%" }}>
                Estado de la Tarea
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: "15%" }}>
                Fecha de Creación
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: "15%" }}>
                Plazo de Entrega
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", width: "15%" }}>
                Estado Actual
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id.$oid}>
                <TableCell
                  align="left"
                  sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {task.nombreTarea}
                </TableCell>
                <TableCell align="left">
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    {task.asignados.map((asignado, index) => (
                      <Typography key={index} variant="body2">
                        {asignado.NombreCompleto}
                      </Typography>
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="center">{task.estado}</TableCell>
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
