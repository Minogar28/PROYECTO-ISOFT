import React, { useState } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Delete, Add } from "@mui/icons-material";
import { useProyecto } from "./useProyecto";
import Swal from "sweetalert2";


function Equipo({ proyecto }) {
    const { consultarUsuario, actualizarProyecto } = useProyecto();
    const [openModal, setOpenModal] = useState(false);
    const [newMember, setNewMember] = useState({
        usuario: "",
        rol: "",
        permiso: "",
    });
    const [searchResult, setSearchResult] = useState(null);

    // Preparar filas para el DataGrid
    const rows = (proyecto.equipo || []).map((miembro) => ({
        id: miembro._id || `temp-${Math.random()}`, // Asegurar que cada fila tiene un id único
        numeroIdentificacion: miembro.Identificacion || "Sin ID",
        nombreCompleto: miembro.NombreCompleto || "Sin Nombre",
        rol: miembro.rol || "Sin Rol",
        permiso: miembro.permiso || "Sin Permiso",
    }));
    // Columnas del DataGrid
    const columns = [
        { field: "numeroIdentificacion", headerName: "ID", width: 150, flex: 1 },
        { field: "nombreCompleto", headerName: "Nombre", width: 200, flex: 1 },
        { field: "rol", headerName: "Rol", width: 150, flex: 1 },
        { field: "permiso", headerName: "Permiso", width: 150, flex: 1 },
        {
            field: "actions",
            type: "actions",
            headerName: "Acciones",
            width: 150,
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Delete color="error" />}
                    label="Eliminar"
                    onClick={() => handleDeleteMember(params.id)}
                />,
            ],
        },
    ];

    // Buscar usuario
    const handleSearchUsuario = async () => {
        try {
            const usuario = await consultarUsuario(newMember.usuario);
            setSearchResult(usuario);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Usuario no encontrado",
            });
        }
    };

    // Guardar colaborador
    const handleSaveColaborador = async () => {
        if (!searchResult) {
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Primero debes buscar un usuario válido.",
            });
            return;
        }

        try {
            const nuevoEquipo = [
                ...proyecto.equipo,
                { ...searchResult, rol: newMember.rol, permiso: newMember.permiso },
            ];
            const proyectoActualizado = { ...proyecto, equipo: nuevoEquipo };

            await actualizarProyecto(proyectoActualizado);

            Swal.fire({
                icon: "success",
                title: "Colaborador añadido",
                text: "El colaborador ha sido añadido al proyecto.",
            });

            setOpenModal(false);
            setNewMember({ usuario: "", rol: "", permiso: "" });
        } catch (err) {
            console.error("Error al guardar colaborador:", err.message);
        }
    };

    // Eliminar miembro del equipo
    const handleDeleteMember = async (id) => {
        try {
            // Filtrar el equipo para eliminar el miembro
            const nuevoEquipo = proyecto.equipo.filter((miembro) => miembro._id !== id);
            const proyectoActualizado = { ...proyecto, equipo: nuevoEquipo };

            // Actualizar el proyecto con el nuevo equipo
            await actualizarProyecto(proyectoActualizado);

            Swal.fire({
                icon: "success",
                title: "Miembro eliminado",
                text: "El miembro del equipo ha sido eliminado correctamente.",
            });
        } catch (err) {
            console.error("Error al eliminar miembro del equipo:", err.message);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo eliminar el miembro del equipo.",
            });
        }
    };
    return (
        <Box sx={{ p: 3 }}>
            <Card sx={{ p: 3 }}>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Miembros del Equipo
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />} // Ícono antes del texto
                            onClick={() => setOpenModal(true)}
                            sx={{
                                textTransform: "none", // Desactivar texto en mayúsculas
                                boxShadow: 3, // Sombra para mejorar diseño
                                "&:hover": {
                                    backgroundColor: "primary.dark", // Cambiar color al pasar el mouse
                                },
                            }}
                        >
                            Añadir Colaborador
                        </Button>
                    </Box>
                    <Box sx={{ height: 300 }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} />
                    </Box>
                </CardContent>
            </Card>


            {/* Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: "90%",
                        maxWidth: 400,
                    }}
                >

                    <TextField
                        fullWidth
                        label="Usuario"
                        value={newMember.usuario}
                        onChange={(e) =>
                            setNewMember((prev) => ({ ...prev, usuario: e.target.value }))
                        }
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSearchUsuario}
                        sx={{ mb: 2 }}
                    >
                        Buscar Usuario
                    </Button>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            value={newMember.rol}
                            onChange={(e) =>
                                setNewMember((prev) => ({ ...prev, rol: e.target.value }))
                            }
                        >
                            <MenuItem value="Administrador">Administrador</MenuItem>
                            <MenuItem value="Colaborador">Colaborador</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Permiso</InputLabel>
                        <Select
                            value={newMember.permiso}
                            onChange={(e) =>
                                setNewMember((prev) => ({ ...prev, permiso: e.target.value }))
                            }
                        >
                            <MenuItem value="Solo Ver">Solo Ver</MenuItem>
                            <MenuItem value="Editar">Editar</MenuItem>
                            <MenuItem value="Todo">Todo</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSaveColaborador}
                    >
                        Guardar
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default Equipo;
