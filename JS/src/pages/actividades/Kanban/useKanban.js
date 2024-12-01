import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { tasks as defaultTasks, sections as defaultSections } from "./helper";
const useKanban = () => {
  const [tasks, setTasks] = useState(defaultTasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sections, setSections] = useState(defaultSections);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [newTaskDetails, setNewTaskDetails] = useState(null);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [tareas, setTareas] = useState([]);
  const info = JSON.parse(localStorage.getItem('userSession'));
  const Token = info.token

  //LOGICA DE AÑADIR TAREAS
  // Función para agregar tareas
  const agregarTarea = async (tareaData) => {
    try {
      const response = await fetch(`${gsUrlApi}/tareas/insertar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tareaData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || "Error al agregar tarea");
      }

      return data.datos; // Devuelve la tarea creada desde el backend
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
    // Función para listar tareas desde la API
    const listarTareas = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${gsUrlApi}/tareas/listar`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
  console.log("Llegaron tareas...", data);
  
        if (response.ok) {
          setTareas(data.datos || []); // Suponiendo que las tareas vienen en el campo `datos`
        } else {
          throw new Error(data.mensaje || "Error al listar tareas");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const getTasks = useCallback(
      (estado) => tareas.filter((tarea) => tarea.estado === estado),
      [tareas]
    );
    
  function toggleNewTaskModal() {
    setNewTaskModal(prevState => !prevState);
  }
  const toggleDescriptionModal = () => {
    setDescriptionModal(prevState => !prevState);
  };
  ///Cambiado
  const newTask = (estado) => {
    setNewTaskDetails({
      fechaFinalizacion: new Date(),
      estado: estado,
    });
    setNewTaskModal(true);
  };
  
  const onAddSection = () => {
    const section = {
      id: sections.length.toString(),
      title: "Nueva Sección",
    };
    setSections([...sections, section]);
    setSelectedSection(section);
  };
  
  const onChangeSectionTitle = (e) => {
    if (selectedSection) {
      const nSection = {
        ...selectedSection,
        title: e.target.value,
      };
      setSelectedSection(nSection);
      setSections(
        sections.map((section) => {
          return section.id === selectedSection.id ? nSection : section;
        })
      );
    }
  };
  
  const handleDateChange = (date) => {
    if (newTaskDetails) {
      setNewTaskDetails({
        ...newTaskDetails,
        fechaFinalizacion: date, // Cambia `dueDate` por `fechaFinalizacion`
      });
    }
  };
  
  const onDragEnd = (result) => {
    const { source, destination } = result;
  
    // dropped outside the list
    if (!destination) {
      return;
    }
  
    let sourceOccurrence = source.index;
    let destinationOccurrence = destination.index;
    let sourceId = 0,
      destinationId = 0;
    tareas.forEach((tarea, index) => {
      if (tarea.estado === source.droppableId) {
        if (sourceOccurrence === 0) {
          sourceId = index;
        }
        sourceOccurrence--;
      }
      if (tarea.estado === destination.droppableId) {
        if (destinationOccurrence === 0) {
          destinationId = index;
        }
        destinationOccurrence--;
      }
    });
  
    const tarea = tareas[sourceId];
    const newTareas = tareas.filter((t) => t._id !== tarea._id); // Cambia `id` por `_id`
    tarea.estado = destination.droppableId;
    const parity = destination.droppableId !== source.droppableId ? -1 : 0;
    setTareas([
      ...newTareas.slice(0, destinationId + parity),
      tarea,
      ...newTareas.slice(destinationId + parity),
    ]);
  };
  

  //Form Submission
  const taskSchema = yup.object({
    categoria: yup.string().required("Selecciona la categoría del proyecto"),
    nombreTarea: yup.string().required("Por favor ingresa el título de la tarea"),
    prioridad: yup.mixed().required("Por favor selecciona la prioridad"),
    descripcion: yup.string().required("Por favor ingresa la descripción"),
    asignados: yup.string().required("Por favor selecciona a los asignados"),
  });
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      prioridad: "alta", // Cambia `priority` por `prioridad`
    },
  });
  const handleNewTask = handleSubmit((values) => {
    const formData = {
      categoria: values.categoria,
      nombreTarea: values.nombreTarea,
      prioridad: values.prioridad,
      descripcion: values.descripcion,
      asignados: [JSON.parse(values.asignados)],
    };
    const newTask = {
      ...newTaskDetails,
      ...formData,
      _id: tareas.length.toString(),
      comentarios: [],
      fechaFinalizacion: newTaskDetails.fechaFinalizacion.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };
    setTareas([...tareas, newTask]);
    toggleNewTaskModal();
    reset();
  });
  return {
    onDragEnd,
    newTask,
    sections,
    getTasks,
    newTaskModal,
    toggleNewTaskModal,
    handleNewTask,
    selectedSection,
    setSelectedSection,
    control,
    handleSubmit,
    newTaskDetails,
    handleDateChange,
    descriptionModal,
    toggleDescriptionModal,
    onAddSection,
    onChangeSectionTitle,
    agregarTarea,
    listarTareas
  };
};
export default useKanban;