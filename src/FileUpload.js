// FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Read the file using FileReader
    const reader = new FileReader();
    reader.onload = (event) => {
      const audioData = event.target.result;
      
      // Save the audio data to localStorage
      localStorage.setItem('audioData', audioData);

      // Notify the parent component about the uploaded file
      onFileUpload(file);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
