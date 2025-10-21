import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHiking, FaMap, FaComments, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <FaHiking className="brand-icon" />
          <span className="brand-text">Trilhas de Goiás</span>
        </Link>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="navbar-links">
            <Link to="/trilhas" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <FaMap /> Trilhas
            </Link>
            <Link to="/forum" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <FaComments /> Fórum
            </Link>
          </div>

          <div className="navbar-actions">
            {isAuthenticated ? (
              <>
                <Link to="/perfil" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <FaUser /> {user?.nome}
                </Link>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  <FaSignOutAlt /> Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMobileMenuOpen(false)}>
                  Entrar
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMobileMenuOpen(false)}>
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;