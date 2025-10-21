import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHiking, FaMap, FaUsers, FaShieldAlt, FaArrowRight, FaStar } from 'react-icons/fa';
import { trailAPI } from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredTrails, setFeaturedTrails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedTrails();
  }, []);

  const loadFeaturedTrails = async () => {
    try {
      const response = await trailAPI.getAll({ limit: 3, sort: '-estatisticas.popularidade' });
      setFeaturedTrails(response.data.data);
    } catch (error) {
      console.error('Error loading trails:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <FaMap />,
      title: 'Mapas Offline',
      description: 'Baixe mapas e trilhas para usar sem internet. Perfeito para áreas remotas do Cerrado.'
    },
    {
      icon: <FaHiking />,
      title: 'GPS em Tempo Real',
      description: 'Acompanhe sua posição na trilha com precisão e veja seu progresso em tempo real.'
    },
    {
      icon: <FaUsers />,
      title: 'Comunidade Ativa',
      description: 'Compartilhe experiências, fotos e dicas com outros trilheiros de Goiás.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Sistema SOS',
      description: 'Botão de emergência que envia sua localização para contatos de segurança.'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title fade-in">
            Explore as Trilhas de Goiás
          </h1>
          <p className="hero-subtitle fade-in">
            Descubra o Cerrado através das melhores trilhas da Chapada dos Veadeiros e região
          </p>
          <div className="hero-actions fade-in">
            <Link to="/trilhas" className="btn btn-primary btn-lg">
              <FaMap /> Ver Trilhas
            </Link>
            <Link to="/register" className="btn btn-outline btn-lg">
              Começar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Por que usar Trilhas de Goiás?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trails */}
      <section className="featured-trails">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trilhas em Destaque</h2>
            <Link to="/trilhas" className="view-all-link">
              Ver todas <FaArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Carregando trilhas...</p>
            </div>
          ) : (
            <div className="trails-grid">
              {featuredTrails.map((trail) => (
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
                    </div>
                  </div>
                  <div className="trail-content">
                    <h3 className="trail-name">{trail.nome}</h3>
                    <p className="trail-location">
                      📍 {trail.localizacao.municipio}, {trail.localizacao.estado}
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
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Pronto para sua próxima aventura?</h2>
            <p className="cta-text">
              Junte-se a centenas de trilheiros explorando o Cerrado goiano
            </p>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
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

export default Home;