import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaCrown, FaMapMarkedAlt, FaChartLine, FaCloudDownloadAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Premium.css';

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const features = [
    {
      icon: <FaMapMarkedAlt />,
      title: 'Navegação ao ar livre',
      description: 'Guie-se por milhões de trilhas ao ar livre em seu smartphone, funciona mesmo offline'
    },
    {
      icon: <FaCloudDownloadAlt />,
      title: 'Mapas offline ilimitados',
      description: 'Baixe quantos mapas quiser para usar sem internet'
    },
    {
      icon: <FaChartLine />,
      title: 'Estatísticas avançadas',
      description: 'Análise completa de performance, velocidade, elevação e muito mais'
    },
    {
      icon: <FaStar />,
      title: 'Sem anúncios',
      description: 'Experiência premium sem interrupções'
    }
  ];

  const plans = [
    {
      id: 'annual',
      name: '1 Ano',
      price: 3.49,
      originalPrice: 41.90,
      totalPrice: 41.90,
      savings: '50%',
      popular: true,
      billingCycle: '/mês'
    },
    {
      id: 'quarterly',
      name: '3 meses',
      price: 6.97,
      originalPrice: 20.90,
      totalPrice: 20.90,
      savings: null,
      popular: false,
      billingCycle: '/mês'
    }
  ];

  return (
    <div className="premium-page">
      <div className="premium-container">
        {/* Header */}
        <motion.div 
          className="premium-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="premium-icon">
            <FaCrown />
          </div>
          <h1 className="premium-title">Obtenha o Trilhas de Goiás Premium</h1>
        </motion.div>

        {/* Illustration */}
        <motion.div 
          className="premium-illustration"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg viewBox="0 0 400 300" className="navigation-illustration">
            {/* Mountains background */}
            <path d="M0 200 L100 150 L200 180 L300 140 L400 170 L400 300 L0 300 Z" 
                  fill="#E8F5E9" opacity="0.5"/>
            <path d="M50 220 L150 170 L250 200 L350 160 L400 190 L400 300 L0 300 Z" 
                  fill="#C8E6C9" opacity="0.5"/>
            
            {/* Trail path */}
            <path d="M50 250 Q150 200 250 220 T350 200" 
                  stroke="#FF9800" 
                  strokeWidth="4" 
                  fill="none"
                  strokeDasharray="10,5"/>
            
            {/* Navigation arrow */}
            <g transform="translate(200, 150)">
              <circle cx="0" cy="0" r="30" fill="#2196F3" opacity="0.3"/>
              <path d="M0 -15 L10 10 L0 5 L-10 10 Z" fill="#2196F3"/>
            </g>
            
            {/* Waypoints */}
            <circle cx="100" cy="230" r="8" fill="#4CAF50"/>
            <circle cx="200" cy="210" r="8" fill="#4CAF50"/>
            <circle cx="300" cy="190" r="8" fill="#4CAF50"/>
          </svg>
        </motion.div>

        {/* Main Feature */}
        <motion.div 
          className="main-feature"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Navegação ao ar livre</h2>
          <p>Guie-se por milhões de trilhas ao ar livre em seu smartphone, funciona mesmo offline</p>
        </motion.div>

        {/* Progress Dots */}
        <div className="progress-dots">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`dot ${i === 0 ? 'active' : ''}`}></div>
          ))}
        </div>

        {/* Plans */}
        <motion.div 
          className="plans-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="plans-grid">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.savings && (
                  <div className="savings-badge">
                    ECONOMIZE {plan.savings}
                  </div>
                )}
                {plan.popular && (
                  <div className="popular-badge">
                    Mais Popular
                  </div>
                )}
                
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                </div>

                <div className="plan-pricing">
                  <div className="price-main">
                    <span className="currency">R$</span>
                    <span className="amount">{plan.price.toFixed(2).replace('.', ',')}</span>
                    <span className="billing">{plan.billingCycle}</span>
                  </div>
                  <div className="price-total">
                    R$ {plan.totalPrice.toFixed(2).replace('.', ',')} faturados
                  </div>
                </div>

                <div className="plan-select">
                  <div className={`radio ${selectedPlan === plan.id ? 'checked' : ''}`}>
                    {selectedPlan === plan.id && <div className="radio-dot"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div 
          className="features-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Benefícios Premium:</h3>
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
              <FaCheck className="check-icon" />
            </div>
          ))}
        </motion.div>

        {/* Subscribe Button */}
        <motion.div 
          className="subscribe-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button className="subscribe-btn">
            <FaCrown /> Assinar Premium
          </button>
          <p className="terms">
            Ao assinar, você concorda com nossos <a href="/termos">Termos de Uso</a>
          </p>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav-premium">
        <Link to="/explorar" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
          <span>Explorar</span>
        </Link>
        <Link to="/gravar" className="nav-item">
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
        <div className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9L12 2Z" fill="#2E7D32" stroke="#2E7D32" strokeWidth="2"/>
          </svg>
          <span>Premium</span>
        </div>
      </div>
    </div>
  );
};

export default Premium;