import React from 'react';
import { useParams } from 'react-router-dom';

const TrailMap = () => {
  const { id } = useParams();
  
  return (
    <div className="page">
      <div className="container">
        <h1>Mapa da Trilha em Tempo Real</h1>
        <p>ID: {id}</p>
        <p>Página em desenvolvimento - mostrará mapa interativo com GPS tracking, posição atual, waypoints e botão SOS</p>
      </div>
    </div>
  );
};

export default TrailMap;