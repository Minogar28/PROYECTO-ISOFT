import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Card, CardActions, Dialog, DialogContent, DialogTitle, Divider, FormLabel, Grid, IconButton, MenuItem, Stack, Tab, Tabs, TextField, Tooltip, Typography, Autocomplete } from "@mui/material";
import { LuAtSign, LuPlus, LuReply, LuSendHorizonal, LuUpload, LuX } from "react-icons/lu";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useTareas from "./useTareas";
import { CustomDatepicker, FormInput, HorizontalFilePreview, PageBreadcrumb, SelectInput } from "@src/components";
import { useTabsChange } from "@src/hooks";
// import TaskDescription from "./TaskDescription"; // Supongo que este es tu componente para mostrar detalles
import SimpleBar from "simplebar-react";
import styled from "@emotion/styled";
import TaskItem from "./detalleTarea";
import FileUploadTabs from "./adjuntadorArchivos";
const SimpleBarStyled = styled(SimpleBar)({
    height: "calc(100% - 48px)",
    "& .simplebar-content": {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px !important",
        position: "relative",
        overflowX: "hidden",
        overflowY: "auto",
    },
});

const CustomTabPanel = (props) => {
    const { children, value, index } = props;
    return value === index && (
        <Stack sx={{ gap: 2, mt: 2 }}>
            {children}
        </Stack>
    );
};

const TaskDescription = ({ descriptionModal, toggleDescriptionModal, tarea }) => {
    const { value, handleChange } = useTabsChange();
    const { actualizarTarea } = useTareas();
    const [nuevoComentario, setNuevoComentario] = useState(""); // Comentario actual
    const [comentarios, setComentarios] = useState(tarea?.comentarios || []); // Lista de comentarios

    const info = JSON.parse(localStorage.getItem("userSession"));
    const userData = info.userData[0];
    useEffect(() => {
        if (tarea?.comentarios) {
          setComentarios(tarea.comentarios);
        }
      }, [tarea]);
    
    const handleEnviarComentario = async () => {
        if (!nuevoComentario.trim()) return;

        try {
            // Crear un nuevo comentario con la información del usuario
            const comentario = {
                texto: nuevoComentario,
                usuario: {
                    id: userData._id || "",
                    nombre: userData.NombreCompleto || "",
                },
                fecha: new Date().toISOString(),
            };

            // Actualizar el objeto de la tarea
            const tareaActualizada = {
                ...tarea,
                comentarios: [...comentarios, comentario],
                
            };

            // Llama a la API para actualizar la tarea
            const response = await actualizarTarea(tareaActualizada);

            // Actualizar la lista de comentarios en el estado
            setComentarios(response[0]?.comentarios || []); // Suponiendo que la respuesta contiene la tarea actualizada
            setNuevoComentario(""); // Limpiar el campo de texto
        } catch (error) {
            console.error("Error al guardar el comentario:", error);
        }
    };
    return (
        <Dialog open={descriptionModal} onClose={toggleDescriptionModal} maxWidth={"lg"} fullWidth>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" sx={{ display: "flex", gap: 1 }}>
                    {tarea?.nombreTarea || "Nombre de la Tarea"}
                    <Typography
                        variant="caption"
                        sx={{
                            py: "2px",
                            px: "6px",
                            borderRadius: "4px",
                            bgcolor: "error.lighter",
                            color: "error.main",
                            marginInlineStart: "auto",
                        }}
                    >
                        {tarea?.estado || "Estado"}
                    </Typography>
                </Typography>
                <IconButton onClick={toggleDescriptionModal}>
                    <LuX />
                </IconButton>
            </DialogTitle>

            <DialogContent
                sx={{
                    overflowY: "auto",
                }}
                dividers
            >
                {/* Descripción */}
                <Typography variant="subtitle1" gutterBottom>
                    Descripción:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {tarea?.descripcion || "Aquí va la descripción de la tarea"}
                </Typography>

                {/* Información adicional */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        my: "28px",
                    }}
                >
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Fecha de creación
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {tarea?.fechaDeCreacion
                                ? new Date(tarea.fechaDeCreacion).toLocaleDateString()
                                : "N/A"}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Fecha de finalización
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {tarea?.fechaFinalizacion
                                ? new Date(tarea.fechaFinalizacion).toLocaleDateString()
                                : "N/A"}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Asignados:
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                            {tarea?.asignados?.map((asignado, idx) => (
                                <Tooltip title={asignado?.NombreCompleto || "Sin Nombre"} key={idx}>
                                    <Avatar
                                        sx={{
                                            height: "32px",
                                            width: "32px",
                                            marginInlineEnd: "-12px",
                                            transition: "all 0.2s",
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
                    </Box>

                </Box>

                {/* Tabs */}
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            borderBottomStyle: "solid",
                        }}
                    >
                        <Tab value={1} label="Comentarios" />
                        <Tab value={2} label="Archivos" />
                    </Tabs>
                    <CustomTabPanel value={value} index={1}>
                        <Box>
                            {/* Mostrar comentarios existentes */}
                            {comentarios.length > 0 ? (
                                <Box
                                    sx={{
                                        mt: 2,
                                        p: 2,

                                    }}
                                >
                                    {comentarios.map((comentario, idx) => (
                                        <Box
                                            key={idx}
                                            sx={{
                                                mb: 2,
                                                p: 2,
                                                border: "1px solid #e0e0e0",
                                                borderRadius: "50px",
                                                display: "flex",
                                                gap: 2,
                                                alignItems: "flex-start",
                                                bgcolor: "#fff",

                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: "primary.main",
                                                    color: "#fff",
                                                    width: 40,
                                                    height: 40,
                                                    fontSize: 16,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {comentario.usuario.nombre.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "text.primary",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    {comentario.usuario.nombre}
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: "text.secondary",
                                                            fontStyle: "italic",
                                                            ml: 1,
                                                        }}
                                                    >
                                                        {new Date(comentario.fecha).toLocaleString()}
                                                    </Typography>
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        mt: 1,
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    {comentario.texto}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        mt: 4,
                                        color: "text.secondary",
                                    }}
                                >
                                    No hay comentarios aún.
                                </Typography>
                            )}
                            <Box>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    placeholder="Escribe tu comentario..."
                                    value={nuevoComentario}
                                    onChange={(e) => setNuevoComentario(e.target.value)}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        mt: 2,
                                    }}
                                >

                                    <Button
                                        variant="contained"
                                        startIcon={<LuSendHorizonal />}
                                        onClick={handleEnviarComentario}
                                        disabled={!nuevoComentario.trim()}
                                    >
                                        Enviar
                                    </Button>
                                </Box>
                            </Box>


                        </Box>
                    </CustomTabPanel>

                    {/* Archivos Adjuntos */}
                    <CustomTabPanel value={value} index={2}>
                        {tarea?.archivosAdjuntos?.length > 0 ? (
                            tarea.archivosAdjuntos.map((file, idx) => (
                                <Typography key={idx} variant="body2" sx={{ mt: 1 }}>
                                    {file.nombre || `Archivo ${idx + 1}`}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No hay archivos adjuntos.
                            </Typography>
                        )}
                    </CustomTabPanel>
                </Box>
            </DialogContent>
        </Dialog>
    );
};


const Kanban = ({ project, onBack }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [value, setValue] = useState(0); // Estado para manejar el tab seleccionado
    const [filteredTareas, setFilteredTareas] = useState([]); // Estado para las tareas filtradas
    const [newTaskModal, setNewTaskModal] = useState(false); // Estado para manejar el modal de creación
    const [newTaskDetails, setNewTaskDetails] = useState({
        nombreTarea: "",
        descripcion: "",
        estado: "",
        asignados: [],
        fechaFinalizacion: "",
        fechaDeCreacion: "",
        IdProyecto: project?._id || "",
            archivosAdjuntos: [],

    });
    const {
        tareas,
        listarTareas,
        onDragEnd, // Actualiza la lógica para manejar el drag & drop
        descriptionModal,
        toggleDescriptionModal,
        selectedSection,
        setSelectedSection,
        toggleNewTaskModal,
        newTask,
        handleDateChange,
        onAddSection,
        onChangeSectionTitle,
        agregarTarea
    } = useTareas();
    const availableUsers = [
        { NombreCompleto: "Juan Pérez" },
        { NombreCompleto: "Ana García" },
        { NombreCompleto: "Carlos Rodríguez" },
    ];

    // Llamar a listarTareas al montar el componente
    useEffect(() => {
        const fetchTareas = async () => {
            await listarTareas(); // Carga las tareas
        };

        fetchTareas();
    }, [listarTareas]);

    // Filtrar las tareas por IdProyecto cuando cambian las tareas o el proyecto
    useEffect(() => {
        const tareasFiltradas = tareas.filter(
            (tarea) => tarea.IdProyecto === project._id
        );
        setFilteredTareas(tareasFiltradas); // Actualiza el estado con las tareas filtradas
    }, [tareas, project._id]);

    const handleFilesChange = (files) => {
        console.log("files..", files);
        
        setNewTaskDetails((prevDetails) => ({
          ...prevDetails,
          archivosAdjuntos: files,
        }));
        
      };
    const handleNewTaskChange = (e) => {
        const { name, value } = e.target;
        setNewTaskDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleNewTaskSubmit = async (e) => {
        e.preventDefault();
        try {
            const taskData = {
                ...newTaskDetails,
                IdProyecto: project._id, // Usa el ID del proyecto seleccionado
                fechaDeCreacion: new Date().toISOString(), // Fecha actual
            };

            await agregarTarea(taskData);
            listarTareas(); // Refrescar la lista de tareas
            setNewTaskModal(false); // Cerrar el modal
            setNewTaskDetails({
                nombreTarea: "",
                descripcion: "",
                estado: "",
                asignados: [],
                fechaFinalizacion: "",
                fechaDeCreacion: "",
                IdProyecto: project._id,
                archivosAdjuntos:[]
            });
        } catch (error) {
            console.error("Error al agregar tarea:", error.message);
        }
    };
    // Organizar tareas por estado
    const groupedTasks = filteredTareas.reduce((acc, tarea) => {
        if (!acc[tarea.estado]) {
            acc[tarea.estado] = [];
        }
        acc[tarea.estado].push(tarea);
        return acc;
    }, {});

    const sections = Object.keys(groupedTasks).map((estado) => ({
        id: estado,
        title: estado,
        tasks: groupedTasks[estado],
    }));

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 2
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        textAlign: "center"
                    }}
                >
                    {project?.nombreProyecto || "Tablero de Tareas"}
                </Typography>

            </Box>

            <DragDropContext onDragEnd={onDragEnd}>
                <Box
                    sx={{
                        display: "flex",
                        overflowX: "auto",
                        gap: "24px",
                        paddingBottom: "16px",
                        height: "calc(100vh - 165px)",
                    }}
                >
                    {sections.length === 0 ? ( // Verifica si no hay tareas agrupadas
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ margin: "auto", textAlign: "center" }}
                    >
                        No hay tareas asignadas aún.
                    </Typography>
                ) : (sections.map((section) => (
                        <Droppable droppableId={section.id} key={section.id}>
                            {(provided) => (
                                <Box
                                    ref={provided.innerRef}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        pt: "16px",
                                        flexShrink: 0,
                                        width: 320,
                                        borderWidth: 1,
                                        borderStyle: "solid",
                                        borderRadius: "6px",
                                        borderColor: "divider",
                                    }}
                                    {...provided.droppableProps}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            px: 2,
                                        }}
                                    >
                                        {selectedSection !== section ? (
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: "grey.800",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => setSelectedSection(section)}
                                            >
                                                {section.title} ({section.tasks.length})
                                            </Typography>
                                        ) : (
                                            <TextField
                                                size={"small"}
                                                value={section.title}
                                                onChange={onChangeSectionTitle}
                                                onBlur={() => setSelectedSection(null)}
                                                onKeyDownCapture={(event) =>
                                                    event.key === "Enter" && setSelectedSection(null)
                                                }
                                                autoFocus
                                            />
                                        )}
                                        <IconButton
                                            onClick={() => setNewTaskModal(true)} // Abrir modal de creación
                                            sx={{ marginRight: "8px" }}
                                        >
                                            <LuPlus />
                                        </IconButton>
                                    </Box>

                                    <SimpleBarStyled>
                                        {section.tasks.map((tarea, idx) => (
                                            <Draggable draggableId={tarea._id} index={idx} key={tarea._id}>
                                                {(provided) => (
                                                    <Card
                                                        sx={{
                                                            cursor: "pointer",
                                                            mb: 2,
                                                        }}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <TaskItem
                                                            task={tarea}
                                                            toggleDescriptionModal={() => {
                                                                setSelectedTask(tarea); // Establece la tarea seleccionada
                                                                toggleDescriptionModal(); // Abre el modal
                                                            }}
                                                        />
                                                    </Card>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </SimpleBarStyled>

                                </Box>
                            )}
                        </Droppable>
                    )))}
                </Box>
            </DragDropContext>

            {/* Dialogs for task creation and details */}
            <TaskDescription
                descriptionModal={descriptionModal}
                toggleDescriptionModal={toggleDescriptionModal}
                tarea={selectedTask} // Pasa la tarea seleccionada
            />
            {/* Modal para Crear Nueva Tarea */}
            <Dialog open={newTaskModal} onClose={() => setNewTaskModal(false)} maxWidth={"md"} fullWidth>
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5">Crear Nueva Tarea</Typography>
                    <IconButton onClick={() => setNewTaskModal(false)}>
                        <LuX />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ overflowY: "auto" }} dividers>
                    <form onSubmit={handleNewTaskSubmit}>
                        <Grid container spacing={2} sx={{ my: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nombre de la Tarea"
                                    name="nombreTarea"
                                    value={newTaskDetails.nombreTarea}
                                    onChange={handleNewTaskChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Descripción"
                                    name="descripcion"
                                    value={newTaskDetails.descripcion}
                                    onChange={handleNewTaskChange}
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                            {/* Prioridad */}
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Prioridad"
                                    name="prioridad"
                                    value={newTaskDetails.prioridad}
                                    onChange={handleNewTaskChange}
                                >
                                    <MenuItem value="Alta">Alta</MenuItem>
                                    <MenuItem value="Media">Media</MenuItem>
                                    <MenuItem value="Baja">Baja</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Estado */}
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Estado"
                                    name="estado"
                                    value={newTaskDetails.estado}
                                    onChange={handleNewTaskChange}
                                >
                                    <MenuItem value="Por Hacer">Por Hacer</MenuItem>
                                    <MenuItem value="En Desarrollo">En Desarrollo</MenuItem>
                                    <MenuItem value="En Prueba">En Prueba</MenuItem>
                                    <MenuItem value="Completadas">Completadas</MenuItem>
                                </TextField>
                            </Grid>
                            {/* Campo para agregar fecha */}
                            <Grid item xs={12} sm={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >

                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Fecha estimada finalización"
                                        InputLabelProps={{
                                            shrink: true, // Permite que el label se ajuste correctamente
                                        }}
                                        name="fechaFinalizacion"
                                        value={newTaskDetails?.fechaFinalizacion || ""}
                                        onChange={(e) => {
                                            const selectedDate = e.target.value;
                                            setNewTaskDetails((prev) => ({
                                                ...prev,
                                                fechaFinalizacion: selectedDate,
                                            }));
                                        }}
                                    />
                                </Box>
                            </Grid>
                            {/* Asignar a */}
                            <Grid item xl={6} xs={6}>
                                <Autocomplete
                                    multiple
                                    options={project?.equipo || []} // Usa el equipo del proyecto como opciones
                                    getOptionLabel={(option) => option?.NombreCompleto || "Sin Nombre"} // Muestra el nombre completo en la lista de opciones
                                    value={newTaskDetails.asignados} // Muestra los seleccionados
                                    onChange={(event, newValue) => {
                                        setNewTaskDetails((prev) => ({
                                            ...prev,
                                            asignados: newValue, // Guarda el array de objetos completos seleccionados
                                        }));
                                    }}
                                    isOptionEqualToValue={(option, value) => option._id === value._id} // Compara por _id único
                                    renderOption={(props, option) => (
                                        <Box {...props}>
                                            <Avatar
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    mr: 1,
                                                    bgcolor: "secondary.light",
                                                }}
                                            >
                                                {option?.NombreCompleto?.charAt(0) || "?"}
                                            </Avatar>
                                            {option?.NombreCompleto}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Asignar a"
                                            placeholder="Seleccionar usuarios"
                                        />
                                    )}
                                />

                            </Grid>

                            <Grid xs={12}>
                            <FileUploadTabs onFilesChange={handleFilesChange} /> {/* Renderizamos el componente de subida de archivos aquí */}
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                mt: 3, // Espaciado superior opcional
                            }}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                                sx={{
                                    px: 4, // Padding horizontal
                                    py: 1.5, // Padding vertical
                                    fontSize: "1rem", // Tamaño del texto
                                    fontWeight: "bold", // Negrita
                                    borderRadius: "8px", // Bordes redondeados
                                    textTransform: "none", // Quitar transformación del texto a mayúsculas
                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Sombra
                                    "&:hover": {
                                        backgroundColor: "primary.dark", // Color de fondo al pasar el mouse
                                        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)", // Sombra más pronunciada
                                    },
                                }}
                            >
                                Guardar
                            </Button>
                        </Box>

                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Kanban;
