import React from "react";
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
} from "@mui/material";
import { Assessment, CheckCircle, Error, HourglassEmpty, Person } from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";

const Informes = () => {
  // Datos de las tareas
  const rows = [
    {
      id: 1,
      tarea: "Desarrollo Frontend",
      asignado: "Juan Pérez",
      estadoTarea: "Completado",
      estadoProyecto: "En progreso",
      fechaCreacion: "2024-11-10",
      plazoEntrega: "2024-11-15",
    },
    {
      id: 2,
      tarea: "Integración API",
      asignado: "Ana Gómez",
      estadoTarea: "Pendiente",
      estadoProyecto: "En progreso",
      fechaCreacion: "2024-11-12",
      plazoEntrega: "2024-11-20",
    },
    {
      id: 3,
      tarea: "Pruebas Unitarias",
      asignado: "Carlos López",
      estadoTarea: "En revisión",
      estadoProyecto: "Completado",
      fechaCreacion: "2024-11-15",
      plazoEntrega: "2024-11-18",
    },
  ];

  // Configuración de la gráfica basada en las tareas
  const taskCompletionData = rows.map((row) => ({
    x: row.plazoEntrega,
    y: row.estadoTarea === "Completado" ? 1 : row.estadoTarea === "En revisión" ? 0.5 : 0,
    name: row.tarea,
  }));

  const taskChartOptions = {
    chart: {
      type: "area",
      stacked: false,
      height: 380,
      zoom: { enabled: false },
    },
    series: [
      {
        name: "Estado de Tareas",
        data: taskCompletionData.map((item) => ({ x: item.x, y: item.y })),
      },
    ],
    xaxis: {
      type: "datetime",
      title: { text: "Plazo de Entrega" },
    },
    yaxis: {
      title: { text: "Estado (0 = Pendiente, 0.5 = En revisión, 1 = Completado)" },
      labels: {
        formatter: (val) => (val === 1 ? "Completado" : val === 0.5 ? "En revisión" : "Pendiente"),
      },
    },
    tooltip: {
      x: { format: "dd/MM/yyyy" },
      y: {
        formatter: (val) => (val === 1 ? "Completado" : val === 0.5 ? "En revisión" : "Pendiente"),
      },
    },
    title: { text: "Estado de Tareas por Fecha de Entrega", align: "left" },
  };

  const renderEstadoIcono = (estado) => {
    switch (estado) {
      case "Completado":
        return <CheckCircle color="success" />;
      case "Pendiente":
        return <HourglassEmpty color="warning" />;
      case "En revisión":
        return <Error color="error" />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Botón para generar informe */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
          Informes del Proyecto
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Assessment />}
          onClick={() => console.log("Generar informe")}
        >
          Generar Informe
        </Button>
      </Box>

      {/* Gráfica de estado de tareas */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Gráfica de estado de tareas
        </Typography>
        <ReactApexChart
          className="apex-charts"
          options={taskChartOptions}
          height={380}
          series={taskChartOptions.series}
          type="area"
        />
      </Box>

      {/* Tabla con estados de tareas y proyectos */}
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
                Estado del Proyecto
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Fecha de Creación
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Plazo de Entrega
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.tarea}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                    <Person color="primary" />
                    {row.asignado}
                  </Box>
                </TableCell>
                <TableCell align="center">{renderEstadoIcono(row.estadoTarea)}</TableCell>
                <TableCell align="center">{row.estadoProyecto}</TableCell>
                <TableCell align="center">{row.fechaCreacion}</TableCell>
                <TableCell align="center">{row.plazoEntrega}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Informes;
