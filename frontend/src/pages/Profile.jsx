import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  
  return (
    <div className="page">
      <div className="container">
        <h1>Meu Perfil</h1>
        {user && (
          <div className="card">
            <h2>{user.nome}</h2>
            <p>Email: {user.email}</p>
            <p>Nível: {user.nivel_experiencia}</p>
            <p>Página em desenvolvimento - mostrará estatísticas completas, histórico de trilhas, badges e configurações</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;