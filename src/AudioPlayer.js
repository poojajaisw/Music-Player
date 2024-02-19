// AudioPlayer.js
import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ audioFile }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const storedAudioData = localStorage.getItem('audioData');

    if (storedAudioData) {
      // Set the audio data as the source for the audio element
      audioRef.current.src = storedAudioData;

      // Optionally, you may want to play the audio automatically
      // audioRef.current.play();
    }
  }, [audioFile]);

  return (
    <div>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default AudioPlayer;
