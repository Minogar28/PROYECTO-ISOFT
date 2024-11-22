import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Avatar, Box, Button, Card, CardActions, Dialog, DialogContent, DialogTitle, Divider, FormLabel, Grid, IconButton, MenuItem, Stack, Tab, Tabs, TextField, Tooltip, Typography, styled } from "@mui/material";
import SimpleBar from "simplebar-react";
import { LuAtSign, LuPlus, LuReply, LuSendHorizonal, LuUpload, LuX } from "react-icons/lu";
import TaskItem from "./TaskItem";
import { CustomDatepicker, FormInput, HorizontalFilePreview, PageBreadcrumb, SelectInput } from "@src/components";
import useKanban from "./useKanban";
import { assignees } from "./helper";
import { useTabsChange } from "@src/hooks";
import { staticAttachments } from "../tasks/Details/Attachments";
import avatar4 from "@src/assets/images/users/avatar-4.jpg";

const CustomTabPanel = (props) => {
  const { children, value, index } = props;
  return value === index && (
    <Stack sx={{ gap: 2, mt: 2 }}>
      {children}
    </Stack>
  );
};

const TaskDescription = ({ descriptionModal, toggleDescriptionModal }) => {
  const { value, handleChange } = useTabsChange();
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
          Página principal de la app iOS
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
            Alta
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
        <Typography variant="subtitle1" gutterBottom>
          Descripción:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Este es un ejemplo de descripción del proyecto. Puedes añadir información adicional aquí según sea necesario.
        </Typography>

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
              17 de marzo de 2023 <small>1:00 PM</small>
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Fecha de vencimiento
            </Typography>
            <Typography variant="body2" color="text.secondary">
              22 de diciembre de 2023 <small>1:00 PM</small>
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Asignado a:
            </Typography>
            <Box
              sx={{
                display: "flex",
              }}
            >
              {assignees.slice(0, 3).map((assignee, idx) => (
                <Tooltip title={assignee.title} key={idx}>
                  <Avatar
                    src={assignee.image}
                    alt={assignee.title}
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
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
        </Box>

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
            <Box
              sx={{
                border: "1px solid divider",
                borderRadius: "5px",
              }}
            >
              <TextField
                id="outlined-multiline-static"
                rows={3}
                placeholder="Escribe tu comentario..."
                multiline
                fullWidth
              />
              <Box
                sx={{
                  p: "8px",
                  bgcolor: "grey.100",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <IconButton
                    sx={{
                      px: "8px",
                      mr: "12px",
                    }}
                  >
                    <LuUpload size={16} />
                  </IconButton>
                  <IconButton
                    sx={{
                      px: "8px",
                    }}
                  >
                    <LuAtSign size={16} />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<LuSendHorizonal size={16} />}
                  size="medium"
                  color="secondary"
                >
                  Enviar
                </Button>
              </Box>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {staticAttachments.map((file, idx) => (
              <HorizontalFilePreview file={file} key={idx} />
            ))}
          </CustomTabPanel>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

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
    px: "4px",
  },
});

const Kanban = () => {
  const {
    onDragEnd,
    getTasks,
    sections,
    toggleDescriptionModal,
    newTask,
    newTaskModal,
    toggleNewTaskModal,
    handleNewTask,
    control,
    newTaskDetails,
    handleDateChange,
    selectedSection,
    setSelectedSection,
    descriptionModal,
    onChangeSectionTitle,
    onAddSection,
  } = useKanban();

  return (
    <>
      <PageBreadcrumb title="Kanban" subName="Aplicaciones" />

      <Box>
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
            {sections.map((section) => (
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
                      {selectedSection != section ? (
                        <Typography
                          variant="h6"
                          sx={{
                            color: "grey.800",
                            cursor: "pointer",
                          }}
                          onClick={() => setSelectedSection(section)}
                        >
                          {section.title} ({getTasks(section.id).length})
                        </Typography>
                      ) : (
                        <TextField
                          size={"small"}
                          value={section.title}
                          onChange={onChangeSectionTitle}
                          onBlur={() => setSelectedSection(null)}
                          onKeyDownCapture={(event) =>
                            event.key == "Enter" && setSelectedSection(null)
                          }
                          autoFocus
                        />
                      )}
                      <IconButton onClick={() => newTask(section.id)} sx={{ marginRight: "8px" }}>
                        <LuPlus />
                      </IconButton>
                    </Box>

                    <SimpleBarStyled>
                      {getTasks(section.id).map((item, idx) => (
                        <Draggable draggableId={item.id + ""} index={idx} key={item.id}>
                          {(provided) => (
                            <Card
                              sx={{
                                cursor: "pointer",
                              }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem task={item} toggleDescriptionModal={toggleDescriptionModal} />
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </SimpleBarStyled>
                  </Box>
                )}
              </Droppable>
            ))}
            <Box
              sx={{
                minWidth: "300px",
                height: "400px",
                borderRadius: 1,
                textAlign: "center",
                pt: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Button color={"primary"} startIcon={<LuPlus />} onClick={onAddSection}>
                Agregar sección
              </Button>
            </Box>
          </Box>
        </DragDropContext>
      </Box>

      <Dialog open={newTaskModal} onClose={toggleNewTaskModal} maxWidth={"md"} fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Crear nueva tarea</Typography>
          <IconButton onClick={toggleNewTaskModal}>
            <LuX />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            overflowY: "auto",
          }}
          dividers
        >
          <form onSubmit={handleNewTask}>
            <SelectInput
              label="Proyecto"
              name="category"
              containerSx={{
                my: 1,
              }}
              control={control}
            >
              <MenuItem value="Attex">Attex</MenuItem>
              <MenuItem value="CRM">CRM</MenuItem>
              <MenuItem value="Design">Diseño</MenuItem>
              <MenuItem value="iOS">iOS</MenuItem>
            </SelectInput>

            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid item xxl={8} xs={12}>
                <FormInput
                  type="text"
                  label="Título"
                  name="title"
                  placeholder="Ingresa un título"
                  control={control}
                />
              </Grid>

              <Grid item xxl={4} xs={12}>
                <SelectInput name="priority" label="Prioridad" control={control}>
                  <MenuItem value="low">Baja</MenuItem>
                  <MenuItem value="medium">Media</MenuItem>
                  <MenuItem value="high">Alta</MenuItem>
                </SelectInput>
              </Grid>
            </Grid>

            <FormInput
              name="description"
              label="Descripción"
              containerSx={{
                my: 1,
                "& > .MuiOutlinedInput-root": {
                  padding: "0px !important",
                },
              }}
              rows={3}
              control={control}
              multiline
            />

            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid item xl={6} xs={12}>
                <SelectInput name="assignTo" label="Asignar a" control={control}>
                  {assignees.map((assignee, idx) => (
                    <MenuItem key={idx} value={JSON.stringify(assignee)}>
                      {assignee.title}
                    </MenuItem>
                  ))}
                </SelectInput>
              </Grid>

              <Grid item xl={6} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormLabel htmlFor="task-dueDate" sx={{ mb: 1 }}>
                    Fecha de vencimiento
                  </FormLabel>

                  <CustomDatepicker
                    hideAddon
                    dateFormat="yyyy-MM-dd"
                    value={newTaskDetails?.dueDate}
                    inputClass="form-input"
                    onChange={(date) => {
                      handleDateChange(date);
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ width: "100%", my: 2 }} />
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "8px",
                p: 0,
              }}
            >
              <Button variant="outlined" color="secondary" onClick={toggleNewTaskModal}>
                Cerrar
              </Button>

              <Button variant="contained" color="success" type="submit">
                Crear
              </Button>
            </CardActions>
          </form>
        </DialogContent>
      </Dialog>

      <TaskDescription descriptionModal={descriptionModal} toggleDescriptionModal={toggleDescriptionModal} />
    </>
  );
};

export default Kanban;
