import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { 
  FaHiking, FaClock, FaRuler, FaMountain, FaDownload, FaShare, 
  FaHeart, FaStar, FaMapMarkerAlt, FaCamera, FaChartLine,
  FaCompass, FaCloudSun, FaExclamationTriangle, FaUsers,
  FaPrint, FaRoute, FaPlay, FaBookmark
} from 'react-icons/fa';
import { trailAPI, reviewAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './TrailDetailsAdvanced.css';

const TrailDetailsAdvanced = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [trail, setTrail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [elevationData, setElevationData] = useState([]);

  useEffect(() => {
    loadTrailData();
  }, [id]);

  const loadTrailData = async () => {
    try {
      const [trailRes, reviewsRes] = await Promise.all([
        trailAPI.getById(id),
        reviewAPI.getTrailReviews(id, { limit: 5 })
      ]);
      
      setTrail(trailRes.data.data);
      setReviews(reviewsRes.data.data);
      
      // Generate elevation data for chart
      generateElevationData(trailRes.data.data);
    } catch (error) {
      console.error('Error loading trail:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateElevationData = (trailData) => {
    // Simulate elevation profile
    const points = 50;
    const data = [];
    for (let i = 0; i < points; i++) {
      data.push({
        distance: (trailData.extensao_km / points) * i,
        elevation: 1000 + Math.sin(i / 5) * 200 + Math.random() * 50,
        grade: Math.random() * 15 - 5
      });
    }
    setElevationData(data);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'facil': '#4CAF50',
      'moderada': '#FF9800',
      'dificil': '#F44336',
      'muito_dificil': '#B71C1C'
    };
    return colors[difficulty] || '#757575';
  };

  const handleDownloadGPX = () => {
    // Download GPX file
    window.open(trail.gpx_data?.arquivo_gpx || '#', '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: trail.nome,
        text: trail.descricao,
        url: window.location.href
      });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando trilha...</p>
      </div>
    );
  }

  if (!trail) {
    return (
      <div className="page">
        <div className="container">
          <h1>Trilha não encontrada</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="trail-details-advanced">
      {/* Hero Section with Image */}
      <div className="trail-hero" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${trail.fotos[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'})`
      }}>
        <div className="container">
          <motion.div 
            className="trail-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="trail-breadcrumb">
              <Link to="/trilhas">Trilhas</Link> / <Link to={`/trilhas?municipio=${trail.localizacao.municipio}`}>{trail.localizacao.municipio}</Link> / {trail.nome}
            </div>
            
            <h1 className="trail-title">{trail.nome}</h1>
            
            <div className="trail-meta">
              <span className="trail-location">
                <FaMapMarkerAlt /> {trail.localizacao.municipio}, {trail.localizacao.estado}
              </span>
              <span className="trail-type">{trail.tipo}</span>
              <span className="trail-difficulty" style={{ backgroundColor: getDifficultyColor(trail.dificuldade) }}>
                {trail.dificuldade}
              </span>
              {trail.caminho_veadeiros && (
                <span className="trail-badge-special">Caminho dos Veadeiros</span>
              )}
            </div>

            <div className="trail-quick-stats">
              <div className="quick-stat">
                <FaRuler />
                <div>
                  <strong>{trail.extensao_km} km</strong>
                  <span>Distância</span>
                </div>
              </div>
              <div className="quick-stat">
                <FaClock />
                <div>
                  <strong>{trail.tempo_estimado_horas}h</strong>
                  <span>Duração</span>
                </div>
              </div>
              <div className="quick-stat">
                <FaMountain />
                <div>
                  <strong>{trail.desnivel_metros}m</strong>
                  <span>Desnível</span>
                </div>
              </div>
              <div className="quick-stat">
                <FaStar />
                <div>
                  <strong>{trail.estatisticas.media_avaliacoes.toFixed(1)}</strong>
                  <span>{trail.estatisticas.total_avaliacoes} avaliações</span>
                </div>
              </div>
            </div>

            <div className="trail-actions">
              <button className="btn btn-primary btn-lg">
                <FaPlay /> Iniciar Trilha
              </button>
              <button className="btn btn-outline btn-lg" onClick={handleDownloadGPX}>
                <FaDownload /> Baixar GPX
              </button>
              <button className="btn btn-icon-only" onClick={() => setIsFavorite(!isFavorite)}>
                <FaHeart className={isFavorite ? 'favorited' : ''} />
              </button>
              <button className="btn btn-icon-only" onClick={handleShare}>
                <FaShare />
              </button>
              <button className="btn btn-icon-only">
                <FaPrint />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="trail-content">
        <div className="container">
          <div className="trail-layout">
            {/* Left Column - Main Content */}
            <div className="trail-main">
              {/* Tabs */}
              <div className="trail-tabs">
                <button 
                  className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Visão Geral
                </button>
                <button 
                  className={`tab ${activeTab === 'map' ? 'active' : ''}`}
                  onClick={() => setActiveTab('map')}
                >
                  Mapa
                </button>
                <button 
                  className={`tab ${activeTab === 'elevation' ? 'active' : ''}`}
                  onClick={() => setActiveTab('elevation')}
                >
                  Elevação
                </button>
                <button 
                  className={`tab ${activeTab === 'photos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('photos')}
                >
                  Fotos ({trail.fotos.length})
                </button>
                <button 
                  className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Avaliações ({trail.estatisticas.total_avaliacoes})
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="overview-content"
                  >
                    <div className="card">
                      <h2>Sobre a Trilha</h2>
                      <p className="trail-description">{trail.descricao}</p>
                    </div>

                    {/* Statistics Grid */}
                    <div className="stats-grid">
                      <div className="stat-card card">
                        <FaChartLine className="stat-icon" />
                        <h3>Estatísticas</h3>
                        <div className="stat-items">
                          <div className="stat-item">
                            <span>Distância</span>
                            <strong>{trail.extensao_km} km</strong>
                          </div>
                          <div className="stat-item">
                            <span>Desnível Positivo</span>
                            <strong>{trail.desnivel_metros} m</strong>
                          </div>
                          <div className="stat-item">
                            <span>Altitude Máxima</span>
                            <strong>1.400 m</strong>
                          </div>
                          <div className="stat-item">
                            <span>Altitude Mínima</span>
                            <strong>1.100 m</strong>
                          </div>
                        </div>
                      </div>

                      <div className="stat-card card">
                        <FaCloudSun className="stat-icon" />
                        <h3>Clima & Época</h3>
                        <div className="stat-items">
                          <div className="stat-item">
                            <span>Melhor Época</span>
                            <strong>{trail.clima?.melhor_epoca || 'Ano todo'}</strong>
                          </div>
                          <div className="stat-item">
                            <span>Temperatura</span>
                            <strong>{trail.clima?.temperatura_media || '20-28°C'}</strong>
                          </div>
                          <div className="stat-item">
                            <span>Bioma</span>
                            <strong>{trail.bioma}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Safety Information */}
                    {trail.seguranca && (
                      <div className="card safety-card">
                        <h2><FaExclamationTriangle /> Informações de Segurança</h2>
                        
                        <div className="safety-grid">
                          <div className="safety-item">
                            <h4>Nível de Sinal</h4>
                            <span className={`signal-badge signal-${trail.seguranca.nivel_sinal}`}>
                              {trail.seguranca.nivel_sinal}
                            </span>
                          </div>

                          {trail.seguranca.riscos && trail.seguranca.riscos.length > 0 && (
                            <div className="safety-item">
                              <h4>Riscos</h4>
                              <ul>
                                {trail.seguranca.riscos.map((risco, idx) => (
                                  <li key={idx}>{risco}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {trail.seguranca.precaucoes && trail.seguranca.precaucoes.length > 0 && (
                            <div className="safety-item">
                              <h4>Precauções</h4>
                              <ul>
                                {trail.seguranca.precaucoes.map((precaucao, idx) => (
                                  <li key={idx}>{precaucao}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {trail.seguranca.fauna_local && trail.seguranca.fauna_local.length > 0 && (
                            <div className="safety-item">
                              <h4>Fauna Local</h4>
                              <div className="fauna-tags">
                                {trail.seguranca.fauna_local.map((animal, idx) => (
                                  <span key={idx} className="fauna-tag">{animal}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Support Points */}
                    {trail.pontos_apoio && trail.pontos_apoio.length > 0 && (
                      <div className="card">
                        <h2>Pontos de Apoio</h2>
                        <div className="support-points">
                          {trail.pontos_apoio.map((ponto, idx) => (
                            <div key={idx} className="support-point">
                              <div className="support-icon">
                                {ponto.tipo === 'guia' && '🧭'}
                                {ponto.tipo === 'pousada' && '🏠'}
                                {ponto.tipo === 'abastecimento' && '🍽️'}
                                {ponto.tipo === 'primeiros_socorros' && '🏥'}
                              </div>
                              <div className="support-info">
                                <h4>{ponto.nome}</h4>
                                <p>{ponto.descricao}</p>
                                {ponto.contato && (
                                  <a href={`tel:${ponto.contato}`} className="support-contact">
                                    📞 {ponto.contato}
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'map' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="map-content"
                  >
                    <div className="map-container-advanced">
                      <MapContainer
                        center={[trail.localizacao.coordenadas.coordinates[1], trail.localizacao.coordenadas.coordinates[0]]}
                        zoom={13}
                        style={{ height: '600px', width: '100%' }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; OpenStreetMap contributors'
                        />
                        
                        {/* Trail marker */}
                        <Marker position={[trail.localizacao.coordenadas.coordinates[1], trail.localizacao.coordenadas.coordinates[0]]}>
                          <Popup>
                            <strong>{trail.nome}</strong><br />
                            {trail.localizacao.municipio}
                          </Popup>
                        </Marker>

                        {/* Support points */}
                        {trail.pontos_apoio && trail.pontos_apoio.map((ponto, idx) => (
                          ponto.coordenadas && (
                            <Marker 
                              key={idx}
                              position={[ponto.coordenadas.coordinates[1], ponto.coordenadas.coordinates[0]]}
                            >
                              <Popup>
                                <strong>{ponto.nome}</strong><br />
                                {ponto.tipo}
                              </Popup>
                            </Marker>
                          )
                        ))}
                      </MapContainer>

                      <div className="map-controls">
                        <button className="map-control-btn">
                          <FaRoute /> Ver Rota Completa
                        </button>
                        <button className="map-control-btn">
                          <FaDownload /> Baixar Mapa Offline
                        </button>
                        <button className="map-control-btn">
                          <FaCompass /> Abrir em Navegação
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'elevation' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="elevation-content"
                  >
                    <div className="card">
                      <h2>Perfil de Elevação</h2>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={elevationData}>
                          <defs>
                            <linearGradient id="colorElevation" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="distance" 
                            label={{ value: 'Distância (km)', position: 'insideBottom', offset: -5 }}
                          />
                          <YAxis 
                            label={{ value: 'Elevação (m)', angle: -90, position: 'insideLeft' }}
                          />
                          <Tooltip />
                          <Area 
                            type="monotone" 
                            dataKey="elevation" 
                            stroke="#2E7D32" 
                            fillOpacity={1} 
                            fill="url(#colorElevation)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>

                      <div className="elevation-stats">
                        <div className="elev-stat">
                          <span>Ganho de Elevação</span>
                          <strong>{trail.desnivel_metros} m</strong>
                        </div>
                        <div className="elev-stat">
                          <span>Perda de Elevação</span>
                          <strong>{Math.round(trail.desnivel_metros * 0.8)} m</strong>
                        </div>
                        <div className="elev-stat">
                          <span>Elevação Máxima</span>
                          <strong>1.400 m</strong>
                        </div>
                        <div className="elev-stat">
                          <span>Elevação Mínima</span>
                          <strong>1.100 m</strong>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <h2>Análise de Inclinação</h2>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={elevationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="distance" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="grade" stroke="#FF6F00" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'photos' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="photos-content"
                  >
                    <div className="photos-header">
                      <h2><FaCamera /> Galeria de Fotos</h2>
                      {isAuthenticated && (
                        <button className="btn btn-primary">
                          <FaCamera /> Adicionar Fotos
                        </button>
                      )}
                    </div>

                    <div className="photos-grid">
                      {trail.fotos.map((foto, idx) => (
                        <motion.div
                          key={idx}
                          className="photo-item"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img src={foto} alt={`${trail.nome} - Foto ${idx + 1}`} />
                          <div className="photo-overlay">
                            <button className="photo-action">Ver Detalhes</button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="reviews-content"
                  >
                    <div className="reviews-header">
                      <h2>Avaliações da Comunidade</h2>
                      {isAuthenticated && (
                        <button className="btn btn-primary">
                          Escrever Avaliação
                        </button>
                      )}
                    </div>

                    <div className="reviews-summary card">
                      <div className="rating-overview">
                        <div className="rating-big">
                          <span className="rating-number">{trail.estatisticas.media_avaliacoes.toFixed(1)}</span>
                          <div className="rating-stars">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={i < Math.round(trail.estatisticas.media_avaliacoes) ? 'star-filled' : 'star-empty'} />
                            ))}
                          </div>
                          <span className="rating-count">{trail.estatisticas.total_avaliacoes} avaliações</span>
                        </div>
                      </div>
                    </div>

                    <div className="reviews-list">
                      {reviews.map((review) => (
                        <div key={review._id} className="review-item card">
                          <div className="review-header">
                            <div className="review-user">
                              <img src={review.usuario_id.foto_perfil} alt={review.usuario_id.nome} />
                              <div>
                                <strong>{review.usuario_id.nome}</strong>
                                <span className="user-level">{review.usuario_id.nivel_experiencia}</span>
                              </div>
                            </div>
                            <div className="review-rating">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < review.avaliacao ? 'star-filled' : 'star-empty'} />
                              ))}
                            </div>
                          </div>
                          <p className="review-text">{review.comentario}</p>
                          {review.dicas && (
                            <div className="review-tips">
                              <strong>💡 Dica:</strong> {review.dicas}
                            </div>
                          )}
                          <div className="review-footer">
                            <span className="review-date">
                              {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                            <button className="review-like">
                              <FaHeart /> {review.likes}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="trail-sidebar">
              {/* Download Options */}
              <div className="card sidebar-card">
                <h3>Download</h3>
                <div className="download-options">
                  <button className="download-btn">
                    <FaDownload /> GPX
                  </button>
                  <button className="download-btn">
                    <FaDownload /> KML
                  </button>
                  <button className="download-btn">
                    <FaDownload /> KMZ
                  </button>
                  <button className="download-btn">
                    <FaDownload /> PDF
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="card sidebar-card">
                <h3>Informações Rápidas</h3>
                <div className="quick-info">
                  <div className="info-row">
                    <span>Tipo</span>
                    <strong>{trail.tipo}</strong>
                  </div>
                  <div className="info-row">
                    <span>Dificuldade</span>
                    <strong style={{ color: getDifficultyColor(trail.dificuldade) }}>
                      {trail.dificuldade}
                    </strong>
                  </div>
                  <div className="info-row">
                    <span>Sinalização</span>
                    <strong>{trail.infraestrutura?.sinalizacao || 'N/A'}</strong>
                  </div>
                  <div className="info-row">
                    <span>Manutenção</span>
                    <strong>{trail.infraestrutura?.manutencao || 'N/A'}</strong>
                  </div>
                  <div className="info-row">
                    <span>Conclusões</span>
                    <strong>{trail.estatisticas.total_conclusoes}</strong>
                  </div>
                </div>
              </div>

              {/* Weather Widget */}
              <div className="card sidebar-card weather-widget">
                <h3><FaCloudSun /> Clima Atual</h3>
                <div className="weather-info">
                  <div className="weather-temp">25°C</div>
                  <div className="weather-desc">Ensolarado</div>
                  <div className="weather-details">
                    <span>💧 Umidade: 45%</span>
                    <span>💨 Vento: 12 km/h</span>
                  </div>
                </div>
              </div>

              {/* Similar Trails */}
              <div className="card sidebar-card">
                <h3>Trilhas Similares</h3>
                <div className="similar-trails">
                  <div className="similar-trail-item">
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop" alt="Trilha" />
                    <div>
                      <strong>Vale da Lua</strong>
                      <span>1 km • Fácil</span>
                    </div>
                  </div>
                  <div className="similar-trail-item">
                    <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop" alt="Trilha" />
                    <div>
                      <strong>Cachoeira Loquinhas</strong>
                      <span>1.5 km • Fácil</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="card sidebar-card">
                <h3>Compartilhar</h3>
                <div className="share-buttons">
                  <button className="share-btn facebook">Facebook</button>
                  <button className="share-btn twitter">Twitter</button>
                  <button className="share-btn whatsapp">WhatsApp</button>
                  <button className="share-btn link">Copiar Link</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailDetailsAdvanced;