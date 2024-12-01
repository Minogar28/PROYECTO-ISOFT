import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { Button } from "@mui/material";
import { Assessment } from "@mui/icons-material";
import logo from "@src/assets/images/iconoCelerium.png"; // Importa el logo

const InformePdf = ({ project, tasks, chartRef }) => {
    const generatePdf = async () => {
        const doc = new jsPDF();
      
        // Añadir el logo centrado al PDF
        const img = new Image();
        img.src = logo;
        await new Promise((resolve) => {
          img.onload = () => {
            doc.addImage(img, "PNG", 80, 10, 50, 50); // Centra el logo
            resolve();
          };
        });
      
        // Título del informe
        doc.setFontSize(18);
        doc.setTextColor("#333");
        doc.text(`Informe de Proyecto${project.nombreProyecto}`, 105, 70, { align: "center" });
      // Información del proyecto en dos columnas con iconos
   // Información del proyecto en dos columnas con iconos
 // Título del informe
 doc.setFontSize(18);
 doc.setTextColor("#333");
 doc.text("Informe de Proyecto", 105, 70, { align: "center" });

 // Información del proyecto
 doc.setFontSize(12);
 doc.setTextColor("#555");
 doc.text(`Nombre del Proyecto: ${project.nombreProyecto}`, 10, 90);
 doc.text(`Descripción: ${project.descripcion || "No disponible"}`, 10, 100);
 doc.text(`Fecha de Creación: ${project.fechaDeCreacion}`, 10, 110);
 doc.text(
   `Fecha de Finalización: ${project.fechaFinalizacion || "No disponible"}`,
   10,
   120
 );
    // // Nivel de Avance con icono
    // currentY += 10; // Añadir espacio extra
    // doc.text("📊 Nivel de Avance:", leftX, currentY);
    // doc.setFont("helvetica", "bold");
    // doc.text(`${Math.round(estadoProyecto)}%`, leftX + 40, currentY);
    // doc.setFont("helvetica", "normal");
    
        // Capturar el gráfico de ApexCharts
        if (chartRef && chartRef.current) {
          const chartCanvas = await html2canvas(chartRef.current);
          const chartImage = chartCanvas.toDataURL("image/png");
          doc.addImage(chartImage, "PNG", 10, 140, 190, 80);
        } else {
          console.warn("El gráfico no está disponible en chartRef.");
        }
      
        // Tabla de tareas
        const taskData = tasks.map((task) => [
          task.nombreTarea,
          task.asignados.map((asignado) => asignado.NombreCompleto).join(", "),
          task.estado,
          new Date(task.fechaDeCreacion).toLocaleDateString(),
          new Date(task.fechaFinalizacion).toLocaleDateString(),
        ]);
      
        doc.autoTable({
          startY: 230,
          head: [["Tarea", "Asignado a", "Estado", "Fecha de Creación", "Plazo de Entrega"]],
          body: taskData,
          styles: { fontSize: 10, halign: "center", valign: "middle" },
          headStyles: {
            fillColor: [33, 150, 243],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          bodyStyles: { textColor: [0, 0, 0] },
        });
      
        // Pie de página
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.setTextColor("#888");
          doc.text(
            `Página ${i} de ${pageCount}`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 10,
            { align: "center" }
          );
        }
      
        // Guardar el PDF
        doc.save(`Informe_Proyecto_${project.nombreProyecto}.pdf`);
      };
      

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<Assessment />}
      onClick={generatePdf}
      sx={{
        textTransform: "none",
        px: 3,
        py: 1,
        fontWeight: "bold",
        backgroundColor: "primary.main",
        "&:hover": { backgroundColor: "primary.dark" },
      }}
    >
      Descargar Informe PDF
    </Button>
  );
};

export default InformePdf;
