const lightTheme = {
  label: {
    color: "#495057" // Color del texto
  },
  item: {
    color: "#495057", // Color del texto de los elementos
    hover: "#2a9398", // Color de hover en aguamarina oscuro
    active: "#25898a" // Color activo en aguamarina oscuro
  },
  background: "linear-gradient(to bottom, #a4e1e6, #ffffff)" // Fondo degradado de aguamarina a blanco
};

const darkTheme = {
  label: {
    color: "#8791a0" // Color de texto en modo oscuro
  },
  item: {
    color: "#969ba0", // Color de texto en los elementos
    hover: "#3fa5ad", // Aguamarina claro para hover
    active: "#2fa3a8" // Aguamarina oscuro para activo
  },
  background: "#002d42" // Fondo azul navy oscuro
};

export const getLeftbarTheme = themeMode => {
  return themeMode == "light" ? lightTheme : darkTheme;
};