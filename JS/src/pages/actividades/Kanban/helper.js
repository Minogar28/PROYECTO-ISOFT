const tasks = [
  {
    _id: "6743d1cc9047b069a4816f42",
    nombreTarea: "Implementación de autenticación OAuth",
    descripcion: "Configurar la autenticación segura usando OAuth.",
    fechaDeCreacion: "2024-11-23T01:24:28.467Z",
    fechaFinalizacion: "2024-12-10",
    estado: "Pendiente",
    sections: "review",

    IdProyecto: "6736c549a07460499e314f33",
    archivoAdjuntos: [],
    comentarios: [
      { autor: "Luis Torres", mensaje: "Revisar el flujo de autenticación." },
    ],
    asignados: ["Luis Torres", "Marta Jiménez"],
    subTareas: [
      {
        _id: "sub5",
        nombreSubTarea: "Configuración inicial",
        estado: "Completado",
      },
      {
        _id: "sub6",
        nombreSubTarea: "Implementar flujo de tokens",
        estado: "En progreso",
      },
    ],
  },
  {
    _id: "6743d1cc9047b069a4816f43",
    nombreTarea: "Optimización de consultas SQL",
    descripcion: "Optimizar las consultas para mejorar el rendimiento.",
    fechaDeCreacion: "2024-11-24T01:24:28.467Z",
    fechaFinalizacion: "2024-12-05",
    estado: "En progreso",
    IdProyecto: "6736c549a07460499e314f34",
    archivoAdjuntos: [],
    estado: "Pendiente",

    comentarios: [
      { autor: "Sofía Márquez", mensaje: "Identificar las consultas más lentas." },
    ],
    asignados: ["Sofía Márquez", "Andrés Gutiérrez"],
    subTareas: [
      {
        _id: "sub7",
        nombreSubTarea: "Análisis de índices",
        estado: "Completado",
      },
      {
        _id: "sub8",
        nombreSubTarea: "Reescribir consultas",
        estado: "Pendiente",
      },
    ],
  },
  {
    _id: "6743d1cc9047b069a4816f44",
    nombreTarea: "Diseño del sistema de notificaciones",
    descripcion: "Crear un sistema para enviar notificaciones en tiempo real.",
    fechaDeCreacion: "2024-11-25T01:24:28.467Z",
    fechaFinalizacion: "2024-12-15",
    estado: "Pendiente",
    IdProyecto: "6736c549a07460499e314f35",
    archivoAdjuntos: [],
    estado: "Pendiente",

    comentarios: [
      { autor: "Pedro Sánchez", mensaje: "Definir los tipos de notificaciones." },
    ],
    asignados: ["Pedro Sánchez", "Carla López"],
    subTareas: [
      {
        _id: "sub9",
        nombreSubTarea: "Diseño de esquema de base de datos",
        estado: "Pendiente",
      },
      {
        _id: "sub10",
        nombreSubTarea: "Pruebas de envío",
        estado: "Pendiente",
      },
    ],
  },
  {
    _id: "6743d1cc9047b069a4816f45",
    nombreTarea: "Actualización de manual técnico",
    descripcion: "Actualizar el manual técnico con las últimas implementaciones.",
    fechaDeCreacion: "2024-11-26T01:24:28.467Z",
    fechaFinalizacion: "2024-12-20",
    estado: "En progreso",
    IdProyecto: "6736c549a07460499e314f36",
    archivoAdjuntos: [],
    estado: "completado",
    comentarios: [
      { autor: "Daniela Rojas", mensaje: "Incluir nuevas secciones de configuración." },
    ],
    asignados: ["Daniela Rojas", "Miguel Fernández"],
    subTareas: [
      {
        _id: "sub11",
        nombreSubTarea: "Revisión del contenido actual",
        estado: "Completado",
      },
      {
        _id: "sub12",
        nombreSubTarea: "Agregar ejemplos prácticos",
        estado: "En progreso",
      },
    ],
  },
  {
    _id: "6743d1cc9047b069a4816f46",
    nombreTarea: "Despliegue de nueva versión",
    descripcion: "Preparar el despliegue de la nueva versión en producción.",
    fechaDeCreacion: "2024-11-27T01:24:28.467Z",
    fechaFinalizacion: "2024-12-25",
    estado: "Pendiente",
    IdProyecto: "6736c549a07460499e314f37",
    archivoAdjuntos: [],
    estado: "desarrollo",

    comentarios: [
      { autor: "Alejandro Ramírez", mensaje: "Verificar los logs después del despliegue." },
    ],
    asignados: ["Alejandro Ramírez", "Laura Hernández"],
    subTareas: [
      {
        _id: "sub13",
        nombreSubTarea: "Configuración de servidores",
        estado: "Pendiente",
      },
      {
        _id: "sub14",
        nombreSubTarea: "Pruebas finales",
        estado: "Pendiente",
      },
    ],
  },
];

const assignees = [
  { id: "5", title: "Luis Torres", isImage: false },
  { id: "6", title: "Marta Jiménez", isImage: false },
  { id: "7", title: "Sofía Márquez", isImage: false },
  { id: "8", title: "Andrés Gutiérrez", isImage: false },
  { id: "9", title: "Pedro Sánchez", isImage: false },
  { id: "10", title: "Carla López", isImage: false },
  { id: "11", title: "Daniela Rojas", isImage: false },
  { id: "12", title: "Miguel Fernández", isImage: false },
  { id: "13", title: "Alejandro Ramírez", isImage: false },
  { id: "14", title: "Laura Hernández", isImage: false },
];

const sections = [
  { id: "planeacion", title: "Planificación" },
  { id: "desarrollo", title: "Desarrollo" },
  { id: "pruebas", title: "Pruebas" },
  { id: "completado", title: "Completado" },
];

export { tasks, assignees, sections };
