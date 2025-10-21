import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FaSearch, FaFilter, FaLayerGroup, FaWalking, FaBicycle, FaHiking, FaMapMarkerAlt } from 'react-icons/fa';
import { trailAPI } from '../services/api';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import './Explore.css';

// Custom marker icons
const createCustomIcon = (type) => {
  const iconHtml = type === 'pedestre' 
    ? '<div class="custom-marker walking">🚶</div>'
    : type === 'ciclismo'
    ? '<div class="custom-marker cycling">🚴</div>'
    : '<div class="custom-marker hiking">🥾</div>';
    
  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker-container',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

const Explore = () => {
  const [trails, setTrails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    tipo: '',
    dificuldade: ''
  });
  const [mapCenter, setMapCenter] = useState([-14.1318, -47.5186]);
  const [mapZoom, setMapZoom] = useState(10);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    loadTrails();
    getUserLocation();
  }, [filters]);

  const loadTrails = async () => {
    try {
      const response = await trailAPI.getAll(filters);
      setTrails(response.data.data);
    } catch (error) {
      console.error('Error loading trails:', error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error('Error getting location:', error)
      );
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await trailAPI.getAll({ search: searchQuery, ...filters });
        setTrails(response.data.data);
      } catch (error) {
        console.error('Error searching:', error);
      }
    }
  };

  const centerOnUser = () => {
    if (userLocation) {
      setMapCenter(userLocation);
      setMapZoom(13);
    }
  };

  const MapController = () => {
    const map = useMap();
    
    useEffect(() => {
      map.setView(mapCenter, mapZoom);
    }, [mapCenter, mapZoom]);
    
    return null;
  };

  return (
    <div className="explore-page">
      {/* Search Bar */}
      <div className="explore-search-bar">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Encontre trilhas"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="search-input"
          />
        </div>
        <button 
          className="filters-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filtros
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Tipo</label>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filters.tipo === '' ? 'active' : ''}`}
                onClick={() => setFilters({...filters, tipo: ''})}
              >
                Todos
              </button>
              <button 
                className={`filter-btn ${filters.tipo === 'pedestre' ? 'active' : ''}`}
                onClick={() => setFilters({...filters, tipo: 'pedestre'})}
              >
                <FaWalking /> Caminhada
              </button>
              <button 
                className={`filter-btn ${filters.tipo === 'ciclismo' ? 'active' : ''}`}
                onClick={() => setFilters({...filters, tipo: 'ciclismo'})}
              >
                <FaBicycle /> Bike
              </button>
              <button 
                className={`filter-btn ${filters.tipo === 'mista' ? 'active' : ''}`}
                onClick={() => setFilters({...filters, tipo: 'mista'})}
              >
                <FaHiking /> Mista
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>Dificuldade</label>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filters.dificuldade === '' ? 'active' : ''}`}
                onClick={() => setFilters({...filters, dificuldade: ''})}
              >
                Todas
              </button>
              <button 
                className={`filter-btn difficulty-easy ${filters.dificuldade === 'facil' ? 'active' : ''}`}
                onClick={() => setFilters({...filters, dificuldade: 'facil'})}
              >
                Fácil
              </button>
              <button 
                className={`filter-btn difficulty-moderate ${filters.dificuldade === 'moderada' ? 'active' : ''}`}
                onClick={() => setFilters({...filters, dificuldade: 'moderada'})}
              >
                Moderada
              </button>
              <button 
                className={`filter-btn difficulty-hard ${filters.dificuldade === 'dificil' ? 'active' : ''}`}
                onClick={() => setFilters({...filters, dificuldade: 'dificil'})}
              >
                Difícil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <div className="explore-map-container">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          
          <MapController />

          {/* User location */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>Você está aqui</Popup>
            </Marker>
          )}

          {/* Trail markers */}
          {trails.map((trail) => (
            <Marker
              key={trail._id}
              position={[
                trail.localizacao.coordenadas.coordinates[1],
                trail.localizacao.coordenadas.coordinates[0]
              ]}
              icon={createCustomIcon(trail.tipo)}
            >
              <Popup>
                <div className="trail-popup">
                  <h4>{trail.nome}</h4>
                  <p>{trail.extensao_km} km • {trail.dificuldade}</p>
                  <Link to={`/trilhas/${trail._id}`} className="popup-link">
                    Ver detalhes
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Controls */}
        <div className="map-controls-explore">
          <button className="map-control-btn" onClick={centerOnUser}>
            <FaMapMarkerAlt /> Centralizar mapa
          </button>
          
          <button className="map-control-btn layers-btn">
            <FaLayerGroup />
          </button>

          <div className="zoom-controls">
            <button 
              className="zoom-btn"
              onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
            >
              +
            </button>
            <button 
              className="zoom-btn"
              onClick={() => setMapZoom(prev => Math.max(prev - 1, 5))}
            >
              −
            </button>
          </div>
        </div>

        {/* Repeat Search Button */}
        <button className="repeat-search-btn">
          Repetir busca aqui
        </button>

        {/* Plan Trail Button */}
        <Link to="/planejar" className="plan-trail-btn">
          <FaHiking /> Planejar Trilha
        </Link>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-explore">
        <Link to="/" className="nav-item">
          <FaSearch />
          <span>Explorar</span>
        </Link>
        <Link to="/gravar" className="nav-item active">
          <div className="record-btn-nav">
            <div className="record-dot"></div>
          </div>
          <span>Gravar trilha</span>
        </Link>
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

export default Explore;