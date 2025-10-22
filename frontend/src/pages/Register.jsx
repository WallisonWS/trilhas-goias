import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaHiking } from 'react-icons/fa';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    nivel_experiencia: 'iniciante',
    preferencias: {
      tipos: []
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'tipos') {
      const tipos = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({
        ...formData,
        preferencias: { ...formData.preferencias, tipos }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    // Prepare data for API
    const { confirmarSenha, ...userData } = formData;

    const result = await register(userData);

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
            <h1 className="auth-title">Junte-se a nós!</h1>
            <p className="auth-subtitle">Crie sua conta e comece a explorar</p>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                <FaUser /> Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="form-input"
                placeholder="Seu nome"
                required
              />
            </div>

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
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaLock /> Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className="form-input"
                placeholder="Digite a senha novamente"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Nível de Experiência
              </label>
              <select
                name="nivel_experiencia"
                value={formData.nivel_experiencia}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="iniciante">Iniciante</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Já tem uma conta?{' '}
              <Link to="/login" className="auth-link">
                Faça login aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;