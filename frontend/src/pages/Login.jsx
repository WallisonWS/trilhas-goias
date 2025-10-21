import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaHiking } from 'react-icons/fa';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.senha);

    if (result.success) {
      navigate('/trilhas');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <FaHiking className="auth-icon" />
            <h1 className="auth-title">Bem-vindo de volta!</h1>
            <p className="auth-subtitle">Entre para continuar sua jornada</p>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaLock /> Senha
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Não tem uma conta?{' '}
              <Link to="/register" className="auth-link">
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;