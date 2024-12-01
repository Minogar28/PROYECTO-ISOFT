import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { LuUpload } from "react-icons/lu";

const FileUploadTabs = ({ onFilesChange }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
  
    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files);
      const updatedFiles = [...uploadedFiles, ...files];
      setUploadedFiles(updatedFiles);
      onFilesChange(updatedFiles); // Llama al callback con los archivos actualizados
    };
  
    const handleDrop = (event) => {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      const updatedFiles = [...uploadedFiles, ...files];
      setUploadedFiles(updatedFiles);
      onFilesChange(updatedFiles); // Llama al callback con los archivos actualizados
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    return (
      <Box
        sx={{
          border: "2px dashed #007bff",
          borderRadius: "8px",
          p: 3,
          textAlign: "center",
          cursor: "pointer",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <Box>
          <Typography variant="body1" color="text.secondary">
            Arrastra y suelta tus archivos aquí, o haz clic para subirlos.
          </Typography>
          <input
            id="fileInput"
            type="file"
            hidden
            multiple
            onChange={handleFileUpload}
          />
        </Box>
        {uploadedFiles.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Archivos Subidos:</Typography>
            {uploadedFiles.map((file, idx) => (
              <Typography key={idx}>{file.name}</Typography>
            ))}
          </Box>
        )}
      </Box>
    );
  };
  
  export default FileUploadTabs;
  