import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import { FaPlay, FaPause, FaStop, FaCompass } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Record.css';

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [path, setPath] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [stats, setStats] = useState({
    distance: 0,
    duration: 0,
    speed: 0,
    elevation: 0
  });
  const [activityType, setActivityType] = useState('Trekking');
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const watchIdRef = React.useRef(null);
  const startTimeRef = React.useRef(null);

  useEffect(() => {
    getUserLocation();
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error('Error getting location:', error),
        { enableHighAccuracy: true }
      );
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    startTimeRef.current = Date.now();

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        if (!isPaused) {
          const newPoint = [position.coords.latitude, position.coords.longitude];
          setCurrentPosition(newPoint);
          setPath(prev => [...prev, newPoint]);
          updateStats();
        }
      },
      (error) => console.error('GPS Error:', error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const pauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const stopRecording = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    setIsRecording(false);
    // Save recording logic here
    alert('Trilha gravada com sucesso!');
    setPath([]);
    setStats({ distance: 0, duration: 0, speed: 0, elevation: 0 });
  };

  const updateStats = () => {
    if (path.length < 2) return;

    let distance = 0;
    for (let i = 1; i < path.length; i++) {
      distance += calculateDistance(path[i-1], path[i]);
    }

    const duration = (Date.now() - startTimeRef.current) / 1000 / 60;
    const speed = duration > 0 ? (distance / (duration / 60)) : 0;

    setStats({
      distance: distance.toFixed(2),
      duration: Math.floor(duration),
      speed: speed.toFixed(1),
      elevation: Math.floor(Math.random() * 100) // Simulated
    });
  };

  const calculateDistance = (point1, point2) => {
    const R = 6371;
    const dLat = (point2[0] - point1[0]) * Math.PI / 180;
    const dLon = (point2[1] - point1[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(point1[0] * Math.PI / 180) * Math.cos(point2[0] * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const MapController = () => {
    const map = useMap();
    
    useEffect(() => {
      if (currentPosition) {
        map.setView(currentPosition, 15);
      }
    }, [currentPosition]);
    
    return null;
  };

  return (
    <div className="record-page">
      {/* Live Tracking Badge */}
      {isRecording && !isPaused && (
        <div className="live-tracking-badge">
          <div className="live-dot"></div>
          Monitoramento ao Vivo
        </div>
      )}

      {/* Map */}
      <div className="record-map-container">
        <MapContainer
          center={currentPosition || [-14.1318, -47.5186]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          
          <MapController />

          {path.length > 1 && (
            <Polyline 
              positions={path} 
              color="#FF0000" 
              weight={4}
              opacity={0.8}
            />
          )}

          {currentPosition && (
            <Marker position={currentPosition}>
              <div className="current-position-marker">
                <div className="position-dot"></div>
                <div className="position-pulse"></div>
              </div>
            </Marker>
          )}
        </MapContainer>

        {/* Center Map Button */}
        <button className="center-map-btn" onClick={getUserLocation}>
          Centralizar mapa
        </button>

        {/* Compass Button */}
        <button className="compass-btn">
          <FaCompass />
        </button>

        {/* Zoom Controls */}
        <div className="zoom-controls-record">
          <button className="zoom-btn">+</button>
          <button className="zoom-btn">−</button>
        </div>
      </div>

      {/* Activity Type Selector */}
      <div className="activity-type-bar">
        <button 
          className="activity-type-btn"
          onClick={() => setShowTypeSelector(!showTypeSelector)}
        >
          <FaWalking /> {activityType} ▼
        </button>

        {showTypeSelector && (
          <div className="activity-type-dropdown">
            <button onClick={() => { setActivityType('Trekking'); setShowTypeSelector(false); }}>
              🥾 Trekking
            </button>
            <button onClick={() => { setActivityType('Caminhada'); setShowTypeSelector(false); }}>
              🚶 Caminhada
            </button>
            <button onClick={() => { setActivityType('Ciclismo'); setShowTypeSelector(false); }}>
              🚴 Ciclismo
            </button>
            <button onClick={() => { setActivityType('Trail Running'); setShowTypeSelector(false); }}>
              🏃 Trail Running
            </button>
          </div>
        )}
      </div>

      {/* Start/Control Button */}
      <div className="record-control-section">
        {!isRecording ? (
          <button className="start-recording-btn" onClick={startRecording}>
            Começar
          </button>
        ) : (
          <div className="recording-controls">
            <button 
              className={`control-btn ${isPaused ? 'paused' : 'recording'}`}
              onClick={pauseRecording}
            >
              {isPaused ? <FaPlay /> : <FaPause />}
            </button>
            <button className="control-btn stop" onClick={stopRecording}>
              <FaStop />
            </button>
          </div>
        )}
      </div>

      {/* Stats Display */}
      {isRecording && (
        <div className="stats-overlay">
          <div className="stat-item">
            <span className="stat-value">{stats.distance}</span>
            <span className="stat-label">km</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.duration}</span>
            <span className="stat-label">min</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.speed}</span>
            <span className="stat-label">km/h</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{stats.elevation}</span>
            <span className="stat-label">m</span>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="bottom-nav-record">
        <Link to="/explorar" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
          <span>Explorar</span>
        </Link>
        <div className="nav-item active">
          <div className="record-btn-nav-active">
            <div className="record-dot-active"></div>
          </div>
          <span>Gravar trilha</span>
        </div>
        <Link to="/perfil" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 20c0-4 3-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Perfil</span>
        </Link>
        <Link to="/premium" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9L12 2Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Premium</span>
        </Link>
      </div>
    </div>
  );
};

export default Record;