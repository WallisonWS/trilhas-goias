import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trailAPI } from '../services/api';
import { FaFilter, FaSearch } from 'react-icons/fa';
import './TrailCatalog.css';

const TrailCatalog = () => {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    tipo: '',
    dificuldade: '',
    municipio: ''
  });

  useEffect(() => {
    loadTrails();
  }, [filters]);

  const loadTrails = async () => {
    try {
      setLoading(true);
      const response = await trailAPI.getAll(filters);
      setTrails(response.data.data);
    } catch (error) {
      console.error('Error loading trails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'facil': 'success',
      'moderada': 'warning',
      'dificil': 'danger',
      'muito_dificil': 'danger'
    };
    return colors[difficulty] || 'info';
  };

  return (
    <div className="trail-catalog page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Catálogo de Trilhas</h1>
          <p className="page-subtitle">Explore as melhores trilhas de Goiás</p>
        </div>

        {/* Filters */}
        <div className="filters-section card">
          <div className="filters-header">
            <FaFilter /> Filtros
          </div>
          <div className="filters-grid">
            <div className="form-group">
              <label className="form-label">
                <FaSearch /> Buscar
              </label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="form-input"
                placeholder="Nome da trilha..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tipo</label>
              <select
                name="tipo"
                value={filters.tipo}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Todos</option>
                <option value="pedestre">Pedestre</option>
                <option value="ciclismo">Ciclismo</option>
                <option value="mista">Mista</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Dificuldade</label>
              <select
                name="dificuldade"
                value={filters.dificuldade}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Todas</option>
                <option value="facil">Fácil</option>
                <option value="moderada">Moderada</option>
                <option value="dificil">Difícil</option>
                <option value="muito_dificil">Muito Difícil</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Município</label>
              <select
                name="municipio"
                value={filters.municipio}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Todos</option>
                <option value="Alto Paraíso de Goiás">Alto Paraíso de Goiás</option>
                <option value="Cavalcante">Cavalcante</option>
                <option value="São João d'Aliança">São João d'Aliança</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trails Grid */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Carregando trilhas...</p>
          </div>
        ) : trails.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏔️</div>
            <h3 className="empty-state-title">Nenhuma trilha encontrada</h3>
            <p className="empty-state-text">Tente ajustar os filtros</p>
          </div>
        ) : (
          <>
            <div className="results-count">
              Encontradas {trails.length} trilha{trails.length !== 1 ? 's' : ''}
            </div>
            <div className="trails-grid">
              {trails.map((trail) => (
                <Link key={trail._id} to={`/trilhas/${trail._id}`} className="trail-card card">
                  <div className="trail-image" style={{
                    backgroundImage: `url(${trail.fotos[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'})`
                  }}>
                    <div className="trail-badges">
                      <span className={`badge badge-${getDifficultyColor(trail.dificuldade)}`}>
                        {trail.dificuldade}
                      </span>
                      {trail.caminho_veadeiros && (
                        <span className="badge badge-info">Caminho dos Veadeiros</span>
                      )}
                      {trail.disponivel_offline && (
                        <span className="badge badge-success">Offline</span>
                      )}
                    </div>
                  </div>
                  <div className="trail-content">
                    <h3 className="trail-name">{trail.nome}</h3>
                    <p className="trail-location">
                      📍 {trail.localizacao.municipio}, {trail.localizacao.estado}
                    </p>
                    <p className="trail-description">
                      {trail.descricao.substring(0, 100)}...
                    </p>
                    <div className="trail-stats">
                      <span>🥾 {trail.extensao_km}km</span>
                      <span>⏱️ {trail.tempo_estimado_horas}h</span>
                      <span>⭐ {trail.estatisticas.media_avaliacoes.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrailCatalog;