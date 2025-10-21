import React from 'react';
import { useParams } from 'react-router-dom';

const TrailDetails = () => {
  const { id } = useParams();
  
  return (
    <div className="page">
      <div className="container">
        <h1>Detalhes da Trilha</h1>
        <p>ID: {id}</p>
        <p>Página em desenvolvimento - mostrará informações completas da trilha, mapa, fotos, avaliações e botão para iniciar trilha</p>
      </div>
    </div>
  );
};

export default TrailDetails;