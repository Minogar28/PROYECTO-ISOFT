import avatar1 from "@src/assets/images/avatars/avatar1.png";
import avatar2 from "@src/assets/images/avatars/avatar2.png";
import avatar3 from "@src/assets/images/avatars/avatar3.png";
import avatar4 from "@src/assets/images/avatars/avatar4.png";
import avatar5 from "@src/assets/images/avatars/avatar5.png";
import avatar6 from "@src/assets/images/avatars/avatar6.png";
import avatar7 from "@src/assets/images/avatars/avatar7.png";
import avatar8 from "@src/assets/images/avatars/avatar8.png";
import avatar9 from "@src/assets/images/avatars/avatar9.png";
import avatar10 from "@src/assets/images/avatars/avatar10.png";

const sections = [
  { id: "planeacion", title: "Planificación" },
  { id: "desarrollo", title: "Desarrollo" },
  { id: "pruebas", title: "Pruebas" },
  { id: "completado", title: "Completado" },
];

const tasks = [
  {
    id: 1,
    title: "Rediseño de Página Web",
    section: "planeacion",
    priority: "alta",
    dueDate: "30 Oct 2023",
    category: "Diseño",
    comments: 56,
    userAvatar: [
      { id: "1", title: "Alicia", image: avatar1 },
      { id: "2", title: "Bernardo", image: avatar2 },
      { id: "3", title: "Carmen", image: "A", textBg: "bg-primary text-white" },
    ],
  },
  {
    id: 2,
    title: "Integración de API",
    section: "desarrollo",
    priority: "media",
    dueDate: "14 Nov 2023",
    category: "Backend",
    comments: 34,
    userAvatar: [
      { id: "4", title: "Daniel", image: avatar3 },
      { id: "5", title: "Elena", image: avatar4 },
    ],
  },
  {
    id: 3,
    title: "Autenticación de Usuarios",
    section: "pruebas",
    priority: "alta",
    dueDate: "10 Dic 2023",
    category: "Seguridad",
    comments: 22,
    userAvatar: [
      { id: "6", title: "Francisco", image: avatar5 },
      { id: "7", title: "Gloria", image: avatar6 },
    ],
  },
  {
    id: 4,
    title: "Configuración de Plataforma E-commerce",
    section: "completado",
    priority: "baja",
    dueDate: "05 Sep 2023",
    category: "E-commerce",
    comments: 78,
    userAvatar: [
      { id: "8", title: "Héctor", image: avatar7 },
      { id: "9", title: "Isabel", image: "B", textBg: "bg-warning text-black" },
    ],
  },
  {
    id: 5,
    title: "Tablero de Control para App Móvil",
    section: "planeacion",
    priority: "media",
    dueDate: "22 Oct 2023",
    category: "Móvil",
    comments: 15,
    userAvatar: [
      { id: "10", title: "Julia", image: avatar8 },
      { id: "11", title: "Kevin", image: avatar9 },
    ],
  },
  {
    id: 6,
    title: "Optimización de SEO",
    section: "desarrollo",
    priority: "baja",
    dueDate: "03 Nov 2023",
    category: "Marketing",
    comments: 11,
    userAvatar: [
      { id: "12", title: "Laura", image: avatar10 },
      { id: "13", title: "Marta", image: "M", textBg: "bg-info text-white" },
    ],
  },
  {
    id: 7,
    title: "Pruebas de Rendimiento",
    section: "pruebas",
    priority: "alta",
    dueDate: "28 Nov 2023",
    category: "QA",
    comments: 64,
    userAvatar: [
      { id: "14", title: "Oscar", image: avatar2 },
      { id: "15", title: "Patricia", image: avatar4 },
    ],
  },
  {
    id: 8,
    title: "Prototipado UI/UX",
    section: "completado",
    priority: "media",
    dueDate: "15 Sep 2023",
    category: "Diseño",
    comments: 89,
    userAvatar: [
      { id: "16", title: "Quentin", image: avatar1 },
      { id: "17", title: "Raquel", image: "R", textBg: "bg-secondary text-white" },
    ],
  },
  {
    id: 9,
    title: "Migración de Base de Datos",
    section: "desarrollo",
    priority: "alta",
    dueDate: "05 Dic 2023",
    category: "Base de Datos",
    comments: 45,
    userAvatar: [
      { id: "18", title: "Samuel", image: avatar7 },
      { id: "19", title: "Tamara", image: avatar3 },
    ],
  },
  {
    id: 10,
    title: "Análisis de Campaña de Marketing",
    section: "pruebas",
    priority: "media",
    dueDate: "19 Dic 2023",
    category: "Marketing",
    comments: 30,
    userAvatar: [
      { id: "20", title: "Úrsula", image: avatar8 },
      { id: "21", title: "Víctor", image: avatar9 },
      { id: "22", title: "Walter", image: "W", textBg: "bg-dark text-white" },
    ],
  },
];

const assignees = [
  { id: 1, title: "Alicia", image: avatar1 },
  { id: 2, title: "Bernardo", image: avatar2 },
  { id: 3, title: "Carmen", image: avatar3 },
  { id: 4, title: "Daniel", image: avatar4 },
  { id: 5, title: "Elena", image: avatar5 },
  { id: 6, title: "Francisco", image: avatar6 },
  { id: 7, title: "Gloria", image: avatar7 },
  { id: 8, title: "Héctor", image: avatar8 },
  { id: 9, title: "Isabel", image: avatar9 },
  { id: 10, title: "Julia", image: avatar10 },
];

// export { proyectos, equipo, secciones };
// const sections = [{
//   id: "todo",
//   title: "Todo"
// }, {
//   id: "in_progress",
//   title: "In Progress"
// }, {
//   id: "review",
//   title: "Review"
// }, {
//   id: "done",
//   title: "Done"
// }];
// const tasks = [{
//   id: 1,
//   title: "iOS App home page",
//   section: "todo",
//   priority: "high",
//   dueDate: "18 Jul 2023",
//   category: "iOS",
//   comments: 74,
//   userAvatar: [{
//     id: "1",
//     title: "Tosha",
//     image: avatar1
//   }, {
//     id: "2",
//     title: "Brain",
//     image: avatar3
//   }, {
//     id: "3",
//     title: "Hooker",
//     image: "K",
//     textBg: "bg-success text-white"
//   }, {
//     id: "4",
//     title: "More +",
//     image: "9+",
//     textBg: "bg-primary text-white"
//   }]
// }, {
//   id: 2,
//   title: "Topnav layout design",
//   section: "todo",
//   priority: "medium",
//   dueDate: "15 Dec 2023",
//   category: "Attex",
//   comments: 28,
//   userAvatar: [{
//     id: "5",
//     title: "Tosha",
//     image: avatar2
//   }, {
//     id: "6",
//     title: "Brain",
//     image: avatar4
//   }]
// }, {
//   id: 3,
//   title: "Invite user to a project",
//   section: "todo",
//   priority: "low",
//   dueDate: "11 Jul 2023",
//   category: "CRM",
//   comments: 68,
//   userAvatar: [{
//     id: "7",
//     title: "Tosha",
//     image: avatar5
//   }, {
//     id: "8",
//     title: "Brain",
//     image: avatar6
//   }, {
//     id: "9",
//     title: "Hooker",
//     image: "M",
//     textBg: "bg-info text-white"
//   }]
// }, {
//   id: 4,
//   title: "Write a release note",
//   section: "in_progress",
//   priority: "medium",
//   dueDate: "22 Jun 2023",
//   category: "Attex",
//   comments: 17,
//   userAvatar: [{
//     id: "10",
//     title: "Tosha",
//     image: avatar7
//   }, {
//     id: "11",
//     title: "Brain",
//     image: avatar8
//   }]
// }, {
//   id: 5,
//   title: "Enable analytics tracking",
//   section: "in_progress",
//   priority: "low",
//   dueDate: "19 Jun 2023",
//   category: "CRM",
//   comments: 48,
//   userAvatar: [{
//     id: "12",
//     title: "Tosha",
//     image: avatar10
//   }, {
//     id: "13",
//     title: "Hooker",
//     image: "K",
//     textBg: "bg-warning text-white"
//   }, {
//     id: "14",
//     title: "Brain",
//     image: avatar9
//   }]
// }, {
//   id: 6,
//   title: "Kanban board design",
//   section: "review",
//   priority: "high",
//   dueDate: "2 May 2023",
//   category: "CRM",
//   comments: 65,
//   userAvatar: [{
//     id: "15",
//     title: "Tosha",
//     image: avatar2
//   }, {
//     id: "16",
//     title: "Brain",
//     image: avatar4
//   }, {
//     id: "17",
//     title: "Hooker",
//     image: "D",
//     textBg: "bg-light text-black"
//   }]
// }, {
//   id: 7,
//   title: "Code HTML email template",
//   section: "review",
//   priority: "medium",
//   dueDate: "7 May 2023",
//   category: "CRM",
//   comments: 106,
//   userAvatar: [{
//     id: "18",
//     title: "Tosha",
//     image: avatar1
//   }, {
//     id: "19",
//     title: "Brain",
//     image: avatar10
//   }, {
//     id: "20",
//     title: "Brain",
//     image: avatar5
//   }]
// }, {
//   id: 8,
//   title: "Brand logo design",
//   section: "review",
//   priority: "medium",
//   dueDate: "8 Jul 2023",
//   category: "Design",
//   comments: 95,
//   userAvatar: [{
//     id: "21",
//     title: "Hooker",
//     image: "M",
//     textBg: "bg-primary text-white"
//   }, {
//     id: "22",
//     title: "Hooker",
//     image: "A",
//     textBg: "bg-info text-white"
//   }, {
//     id: "23",
//     title: "Brain",
//     image: avatar1
//   }]
// }, {
//   id: 9,
//   title: "Improve animation loader",
//   section: "review",
//   priority: "high",
//   dueDate: "22 Jul 2023",
//   category: "CRM",
//   comments: 39,
//   userAvatar: [{
//     id: "24",
//     title: "Tosha",
//     image: avatar2
//   }, {
//     id: "25",
//     title: "Brain",
//     image: avatar4
//   }]
// }, {
//   id: 10,
//   title: "Dashboard design",
//   section: "done",
//   priority: "low",
//   dueDate: "16 Jul 2023",
//   category: "Attex",
//   comments: 287,
//   userAvatar: [{
//     id: "26",
//     title: "Tosha",
//     image: avatar1
//   }, {
//     id: "27",
//     title: "Brain",
//     image: avatar3
//   }, {
//     id: "28",
//     title: "Tosha",
//     image: avatar8
//   }, {
//     id: "29",
//     title: "Hooker",
//     image: "K",
//     textBg: "bg-danger text-white"
//   }]
// }];
// const assignees = [{
//   id: 1,
//   title: "Coderthemes",
//   image: avatar1,
//   isImage: true
// }, {
//   id: 2,
//   title: "Kenil Sudani",
//   image: avatar2,
//   isImage: true
// }, {
//   id: 3,
//   title: "Louis Allen",
//   image: avatar3,
//   isImage: true
// }, {
//   id: 4,
//   title: "Sean White",
//   image: avatar4,
//   isImage: true
// }, {
//   id: 5,
//   title: "Riley Steele",
//   image: avatar5,
//   isImage: true
// }, {
//   id: 6,
//   title: "Zak Turnbull",
//   image: avatar6,
//   isImage: true
// }];
export { tasks, assignees, sections };