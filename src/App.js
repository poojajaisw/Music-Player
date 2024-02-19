// App.js
import React, { useState } from 'react';
import FileUpload from './FileUpload';
import AudioPlayer from './AudioPlayer';

const App = () => {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileUpload = (file) => {
    setAudioFile(file);
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
      <AudioPlayer audioFile={audioFile} />
    </div>
  );
};

export default App;


