import React, { useState } from "react";
import { Box, Button, Typography, TextField, Card, CardContent } from "@mui/material";
import useSesiones from "@src/hooks/useSesiones";

const Reuniones = () => {
  const [linkReunion, setLinkReunion] = useState("");
  const { crearSesion, loading } = useSesiones();

  const handleCrearSesion = async () => {
    try {
      const link = await crearSesion();
      setLinkReunion(link);
    } catch (error) {
      console.error("Error al crear la sesión:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "80vh" }}
    >
      <Card sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Crear Sesión de Google Meet
          </Typography>
          <Box mt={3} display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCrearSesion}
              disabled={loading}
              sx={{
                px: 4,
                py: 2,
                mb: 2,
                borderRadius: 2,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {loading ? "Creando..." : "Crear Sesión"}
            </Button>
            {linkReunion && (
              <>
                <Typography variant="body1" mt={2}>
                  Enlace de la reunión:
                </Typography>
                <TextField
                  value={linkReunion}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  variant="contained"
                  color="success"
                  href={linkReunion}
                  target="_blank"
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1,
                    fontSize: "14px",
                  }}
                >
                  Abrir reunión
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reuniones;
