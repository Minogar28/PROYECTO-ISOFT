import React from "react";
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
        doc.text("Informe de Proyecto", 105, 70, { align: "center" });

        // Información del proyecto en dos columnas
        doc.setFontSize(12);
        doc.setTextColor("#555");

        const infoIzquierda = [
            `Nombre del Proyecto: ${project.nombreProyecto}`,
            `Fecha de Creación: ${project.fechaDeCreacion}`,
        ];

        const infoDerecha = [
            `Descripción: ${project.descripcion || "No disponible"}`,
            `Fecha de Finalización: ${project.fechaFinalizacion || "No disponible"}`,
        ];

        const startXLeft = 10;
        const startXRight = 110;
        let currentY = 90;
        const lineHeight = 10;

        infoIzquierda.forEach((text) => {
            doc.text(text, startXLeft, currentY);
            currentY += lineHeight;
        });

        currentY = 90;
        infoDerecha.forEach((text) => {
            doc.text(text, startXRight, currentY);
            currentY += lineHeight;
        });

        // Nivel de Avance
        currentY += 10;
        doc.text("Nivel de Avance:", startXLeft, currentY);
        doc.setFont("helvetica", "bold");
        const estadoProyecto =
            tasks.length > 0
                ? (tasks.filter((task) => task.estado === "Completadas").length / tasks.length) * 100
                : 0;
        doc.text(`${Math.round(estadoProyecto)}%`, startXLeft + 50, currentY);
        doc.setFont("helvetica", "normal");

        // Añadir Gráfica con Encabezado
        if (chartRef && chartRef.current) {
            currentY += 20;
            doc.setFontSize(14);
            doc.text("Gráfica de estado de proyecto", 105, currentY, { align: "center" });
            const chartCanvas = await html2canvas(chartRef.current);
            const chartImage = chartCanvas.toDataURL("image/png");
            doc.addImage(chartImage, "PNG", 20, currentY + 10, 170, 80);
            currentY += 100;
        }

        // Colaboradores del Equipo
        currentY += 10;
        doc.setFontSize(14);
        doc.text("Colaboradores del Equipo:", startXLeft, currentY);
        doc.setFontSize(12);
        project.equipo.forEach((colaborador, index) => {
            currentY += lineHeight;
            doc.text(
                `${index + 1}. ${colaborador.NombreCompleto} - ${colaborador.rol}`,
                startXLeft,
                currentY
            );
        });

        // Tabla de tareas
        const taskData = tasks.map((task) => [
            task.nombreTarea,
            task.asignados.map((asignado) => asignado.NombreCompleto).join(", "),
            task.estado,
            new Date(task.fechaDeCreacion).toLocaleDateString(),
            new Date(task.fechaFinalizacion).toLocaleDateString(),
        ]);

        doc.autoTable({
            startY: currentY + 10,
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
