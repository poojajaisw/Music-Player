import React from 'react';
import MusicPlayer from './MusicPlayer'; 

const App = () => {
  
  const handleFileUpload = (newSong) => {
    
    console.log('New song uploaded:', newSong);
  };

  const handleNext = () => {
   
    console.log('Next song requested');
  };

  return (
    <div>
      <MusicPlayer onFileUpload={handleFileUpload} onNext={handleNext} />
    </div>
  );
};

export default App;


