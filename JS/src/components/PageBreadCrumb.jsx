/*
 * Copyright (c) 2023.
 * File Name: BreadCrumb.tsx
 * Author: Coderthemes
 */

import { Box, Breadcrumbs, Link, Typography, useMediaQuery } from "@mui/material";
import PageMetaData from "./PageMetaData";
import { LuChevronRight } from "react-icons/lu";
import { useTheme } from "@mui/material/styles";

const PageBreadcrumb = ({ title, subName }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const breadcrumbItems = [
    <Link
      key="1"
      color="inherit"
      variant={isSmallScreen ? "body2" : "subtitle2"} // Ajustar el tamaño en pantallas pequeñas
      underline="none"
      href=""
      sx={{ fontWeight: 600 }}
    >
      Celerium
    </Link>,
    <Link
      key="2"
      color="inherit"
      variant="body2"
      underline="none"
      href=""
      sx={{ fontSize: isSmallScreen ? "0.75rem" : "1rem" }}
    >
      {subName}
    </Link>,
    <Typography
      key="3"
      variant="body2"
      sx={{ fontSize: isSmallScreen ? "0.75rem" : "1rem" }}
    >
      {title}
    </Typography>,
  ];

  return (
    <>
      <PageMetaData title={title} />

      <Box
        sx={{
          height: isSmallScreen ? "auto" : 75, // Ajustar la altura en pantallas pequeñas
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isSmallScreen ? "column" : "row", // Cambiar a columna en pantallas pequeñas
          gap: isSmallScreen ? 1 : 0,
          padding: isSmallScreen ? 2 : 0, // Agregar padding en pantallas pequeñas
        }}
      >
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          color="text.primary"
          sx={{
            textAlign: isSmallScreen ? "center" : "left", // Centrar texto en pantallas pequeñas
          }}
        >
          {title}
        </Typography>
        <Breadcrumbs
          separator={<LuChevronRight size={12} />}
          aria-label="breadcrumb"
          sx={{
            "& ol": {
              display: "flex",
              gap: isSmallScreen ? 0.5 : 1, // Reducir el espacio en pantallas pequeñas
              justifyContent: isSmallScreen ? "center" : "flex-start", // Centrar en pantallas pequeñas
            },
          }}
        >
          {breadcrumbItems}
        </Breadcrumbs>
      </Box>
    </>
  );
};

export default PageBreadcrumb;
