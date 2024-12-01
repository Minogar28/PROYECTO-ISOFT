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
    MenuItem,useMediaQuery
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Delete, Add } from "@mui/icons-material";
import useProyecto from "@src/hooks/useProyecto.js";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";

function Equipo({ proyecto }) {
    const { consultarUsuario, actualizarProyecto } = useProyecto();
    const [openModal, setOpenModal] = useState(false);
    const [newMember, setNewMember] = useState({
        usuario: "",
        rol: "",
        permiso: "",
    });

    const [rows, setRows] = useState(
        (proyecto.equipo || []).map((miembro) => ({
            id: miembro._id || `temp-${Math.random()}`,
            numeroIdentificacion: miembro.Identificacion || "Sin identificación",
            nombreCompleto: miembro.NombreCompleto || "Sin Nombre",
            rol: miembro.rol || "Sin Rol",
            permiso: miembro.permiso || "Sin Permiso",
        }))
    );
    
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
    // Columnas del DataGrid
    const columns = [
        {
          field: "numeroIdentificacion",
          headerName: "Identificación",
          width: isSmallScreen ? 150 : 250,
          flex: 1,
        },
        {
          field: "nombreCompleto",
          headerName: "Nombre",
          width: isSmallScreen ? 200 : 250,
          flex: 1,
        },
        {
          field: "rol",
          headerName: "Rol",
          width: isSmallScreen ? 150 : 250,
          flex: 1,
        },
        {
          field: "permiso",
          headerName: "Permiso",
          width: isSmallScreen ? 150 : 250,
          flex: 1,
        },
        {
          field: "actions",
          type: "actions",
          headerName: "Acciones",
          width: isSmallScreen ? 150 : 250,
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

    // Guardar colaborador
    const handleSaveColaborador = async () => {
        try {
            const response = await consultarUsuario(newMember.usuario);
           
            // Verifica si la respuesta contiene datos válidos
            if (!response) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo agregar el colaborador porque no existe.",
                });
                return;
            }
    
            const usuario = response;
          
            console.log("zzz", usuario);
            const nuevoEquipo = [
                ...proyecto.equipo,
                { ...usuario, rol: newMember.rol, permiso: newMember.permiso },
            ];
            const proyectoActualizado = { ...proyecto, equipo: nuevoEquipo };
            console.log("juass", proyectoActualizado);
            
            await actualizarProyecto(proyectoActualizado);
            // Actualiza las filas del DataGrid con el nuevo equipo
        setRows(
            nuevoEquipo.map((miembro) => ({
                id: miembro._id || `temp-${Math.random()}`,
                numeroIdentificacion: miembro.Identificacion || "Sin Identificación",
                nombreCompleto: miembro.NombreCompleto || "Sin Nombre",
                rol: miembro.rol || "Sin Rol",
                permiso: miembro.permiso || "Sin Permiso",
            }))
        );

            // Éxito al agregar el colaborador
            Swal.fire({
                icon: "success",
                title: "Colaborador añadido",
                text: "El colaborador ha sido añadido al proyecto.",
            });
    
            setOpenModal(false);
            setNewMember({ usuario: "", rol: "", permiso: "" });
        } catch (err) {
            console.error("Error al guardar colaborador:", err.message);
            setOpenModal(false);
            setNewMember({ usuario: "", rol: "", permiso: "" });
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error al intentar agregar el colaborador.",
            });
          
        }
    };
    

    // Eliminar miembro del equipo
    const handleDeleteMember = async (id) => {
        try {
            const nuevoEquipo = proyecto.equipo.filter((miembro) => miembro._id !== id);
            const proyectoActualizado = { ...proyecto, equipo: nuevoEquipo };

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
        <Box sx={{ p: isSmallScreen ? 2 : 4 }}>
        <Card sx={{ p: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant={isSmallScreen ? "h6" : "h5"}
                sx={{ fontWeight: "bold", mb: isSmallScreen ? 2 : 0 }}
              >
                Colaboradores
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setOpenModal(true)}
                sx={{
                  textTransform: "none",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                Añadir Colaborador
              </Button>
            </Box>
            <Box sx={{ height: isSmallScreen ? 300 : 500 }}>
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
              p: isSmallScreen ? 2 : 4,
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
