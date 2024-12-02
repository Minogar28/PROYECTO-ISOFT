import React, { useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    Avatar,
    IconButton,
    Tooltip,
} from "@mui/material";
import { Folder, Download, MeetingRoom } from "@mui/icons-material";
import useProyecto from "@src/hooks/useProyecto";
import useSesiones from "@src/hooks/useSesiones";
import { PageBreadcrumb } from "@src/components";

const Reuniones = () => {
    const { proyectos, listarProyectos, loading, error } = useProyecto();
    const { crearSesion } = useSesiones();
    const info = JSON.parse(localStorage.getItem("userSession"));
    const Token = info.token;

    // Cargar proyectos al montar el componente
    useEffect(() => {
        listarProyectos();
    }, [Token]);

    // Función para manejar la creación de sesiones
    const handleCrearSesion = async () => {
        try {
            const link = await crearSesion();
            window.open(link, "_blank"); // Abre el enlace en una nueva pestaña
        } catch (err) {
            console.error("Error al crear la sesión:", err);
        }
    };

    return (
        <>
            <PageBreadcrumb title="Sesiones" subName="Reuniones" />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: "80vh" }}
            >
                <Card
                    sx={{
                        p: 4,
                        boxShadow: 3,
                        borderRadius: 2,
                        width: "100%",
                        maxWidth: 1000,
                    }}
                >
                    <CardContent>
                        {loading ? (
                            <Typography align="center">Cargando proyectos...</Typography>
                        ) : error ? (
                            <Typography align="center" color="error">
                                Error: {error}
                            </Typography>
                        ) : proyectos.length === 0 ? (
                            <Typography align="center">No hay proyectos disponibles</Typography>
                        ) : (
                            <Box>
                                {proyectos.map((proyecto) => (
                                    <Box
                                        key={proyecto._id}
                                        sx={{
                                            display: "flex",
                                            flexDirection: {
                                                xs: "column", // Apilar elementos en pantallas pequeñas
                                                sm: "row", // Mostrar en fila en pantallas más grandes
                                            },
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            mb: 2,
                                            p: 2,
                                            boxShadow: 1,
                                            borderRadius: 2,
                                            bgcolor: "background.paper",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 2,
                                            }}
                                        >
                                            <Avatar sx={{ bgcolor: "primary.main" }}>
                                                <Folder />
                                            </Avatar>
                                            <Typography
                                                variant="h6"
                                                align="center"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {proyecto.nombreProyecto}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                flexDirection: {
                                                    xs: "column", // Botones apilados en pantallas pequeñas
                                                    sm: "row", // Botones en fila en pantallas grandes
                                                },
                                            }}
                                        >
                                            <Tooltip title="Iniciar reunión">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<MeetingRoom />}
                                                    onClick={handleCrearSesion}
                                                >
                                                    Iniciar Meet
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Descargar reporte de sesión">
                                                <IconButton
                                                    color="secondary"
                                                    sx={{
                                                        display: {
                                                            xs: "none", // Ocultar en pantallas pequeñas
                                                            sm: "flex", // Mostrar en pantallas grandes
                                                        },
                                                    }}
                                                >
                                                    <Download />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Reuniones;
