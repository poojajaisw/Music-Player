import React, { useRef } from 'react';

function SongCard({ title, audioSrc, onPlay, onPause, isPlaying }) {
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (onPlay) {
      onPlay();
    }
    audioRef.current.play();
  };

  const handlePause = () => {
    if (onPause) {
      onPause();
    }
    audioRef.current.pause();
  };

  return (
    <div className={`card ${isPlaying ? 'playing' : ''}`} style={{ width: '18rem', margin: '10px', display: 'inline-block' }}>
      <img src="https://th.bing.com/th/id/OIP.gBuNrEVFoLk7ASqmmiN6dAHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7" className="card-img-top" alt="default" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <audio
          ref={audioRef}
          src={audioSrc}
          controls={false} // Disable built-in controls
        />
        <div>
          <button onClick={handlePlay} className="btn btn-primary">
            Play
          </button>
          <button onClick={handlePause} className="btn btn-danger">
            Pause
          </button>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
