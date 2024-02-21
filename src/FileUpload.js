import React, { useState, useRef, useEffect } from 'react';

function SongCard({ title, audioSrc, onPlay, onPause, onPrevious, onNext, isPlaying }) {
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
          {onPrevious && (
            <button onClick={onPrevious} className="btn btn-secondary">
              Previous
            </button>
          )}
          {onNext && (
            <button onClick={onNext} className="btn btn-secondary">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function MusicPlayer({ onFileUpload, onNext }) {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [currentSongDetails, setCurrentSongDetails] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const audioData = event.target.result;

      const newSong = { title: file.name, audioSrc: audioData };
      setSongs((prevSongs) => [...prevSongs, newSong]);

      if (typeof onFileUpload === 'function') {
        onFileUpload(newSong);
      } else {
        console.error("onFileUpload is not a function");
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    setSongs(storedSongs);
  }, []);

  useEffect(() => {
    if (currentSongIndex !== null) {
      setCurrentSongDetails(songs[currentSongIndex]);
    } else {
      setCurrentSongDetails(null);
    }
  }, [currentSongIndex, songs]);

  const handlePrevious = () => {
    // Implement logic for handling the previous song
    const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(newIndex);
  };

  const handleNext = () => {
    // Trigger onNext when the user clicks on the "Next" button
    if (currentSongIndex !== null) {
      const newIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(newIndex);
      // Call onNext if it's a function
      if (typeof onNext === 'function') {
        onNext();
      }
    }
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'center',backgroundColor:'#497682' }}>
      <input type="file" className="upload" accept="audio/*" onChange={handleFileChange} style={{ marginTop: '20px', textAlign: 'center', backgroundColor: "wheat", padding: "10px", width: '60%' }} />
      {songs.length > 0 && (
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "100px", width: "100%", backgroundColor: "#497682" }}>
          <h2 className='play' style={{ padding: '10px', width: '80%', backgroundColor: 'white' , border:'black',borderRadius:'2rem'}}>Now Playing: {currentSongIndex !== null && songs[currentSongIndex].title}</h2>
          {currentSongDetails && (

            <div className="card" style={{ width: '18rem', margin: '10px', display: 'inline-block' }}>
              <img src="https://th.bing.com/th/id/OIP.gBuNrEVFoLk7ASqmmiN6dAHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7" className="card-img-top" alt="default" />
              <div className="card-body">
                <h5 className="card-title">{currentSongDetails.title}</h5>
                <audio
                  src={currentSongDetails.audioSrc}
                  controls={false} // Disable built-in controls
                />
              </div>
            </div>
          )}
          <div style={{ marginTop: '10px', marginLeft: "0px" }}>
            
            <button onClick={handlePrevious} className="btn btn-secondary">
              Previous
            </button>
            <button onClick={handleNext} className="btn btn-secondary">
              Next
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {songs.map((song, index) => (
              <SongCard
                key={index}
                title={song.title}
                audioSrc={song.audioSrc}
                onPlay={() => setCurrentSongIndex(index)}
                onPause={() => setCurrentSongIndex(null)}
                isPlaying={index === currentSongIndex}
                
              />
            ))}
          </div>
          
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;