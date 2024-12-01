import { Avatar, Box, CardContent, Tooltip, Typography } from "@mui/material";
import { LuBriefcase, LuMessageCircle } from "react-icons/lu";
import { toSentenceCase } from "@src/helpers";

const TaskItem = ({ task, toggleDescriptionModal }) => {
    const formattedFechaCreacion = task.fechaDeCreacion
        ? new Date(task.fechaDeCreacion).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
        : "Fecha no disponible";
    return (
        <CardContent
            sx={{
                p: "24px",
            }}
            onClick={toggleDescriptionModal} // Ahora el click abre el modal
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="caption">
                    {task.fechaFinalizacion
                        ? new Date(task.fechaFinalizacion).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })
                        : "Fecha no disponible"}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        px: "4px",
                        borderRadius: "6px",
                        bgcolor:
                            task.estado === "Alta"
                                ? "#feeef1"
                                : task.estado === "Media"
                                    ? "#fef9ef"
                                    : "#ecf6f0",
                        color:
                            task.estado === "Alta"
                                ? "#f2789b"
                                : task.estado === "Media"
                                    ? "#fecc5f"
                                    : "#57b995",
                    }}
                >
                    {toSentenceCase(task.prioridad)}
                </Typography>
            </Box>
            <Typography
                variant="h5"
                sx={{
                    my: "8px",
                }}
            >
                {task.nombreTarea}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    color: "grey.700",
                }}
            >
                {/* <Typography
          sx={{
            mb: "8px",
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <LuBriefcase /> {formattedFechaCreacion}
        </Typography> */}
                <Typography
                    sx={{
                        mb: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                    }}
                >
                    <LuMessageCircle />
                    {task.comentarios.length} Comentarios
                </Typography>
            </Box>
            <Box
                sx={{
                    mt: "12px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {task.asignados.map((asignado, idx) => (
                    <Tooltip title={asignado?.NombreCompleto || "Sin Nombre"} key={idx}>
                        <Avatar
                            alt={asignado?.NombreCompleto || "Sin Nombre"}
                            sx={{
                                height: "32px",
                                width: "32px",
                                marginInlineEnd: "-12px",
                                transitionProperty: "all",
                                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                                transitionDuration: "200ms",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            {asignado?.NombreCompleto?.charAt(0) || "?"}
                        </Avatar>
                    </Tooltip>
                ))}
            </Box>

        </CardContent>
    );
};

export default TaskItem;
