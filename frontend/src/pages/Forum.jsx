import React, { useState } from 'react';
import Chat from '../components/Chat';
import { FaComments, FaUsers } from 'react-icons/fa';
import './Forum.css';

const Forum = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="forum-page page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">
            <FaComments /> Comunidade Trilhas de Goiás
          </h1>
          <p className="page-subtitle">
            Converse, compartilhe experiências e tire dúvidas com outros trilheiros
          </p>
        </div>

        <div className="forum-tabs">
          <button
            className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <FaComments /> Chat Geral
          </button>
          <button
            className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <FaUsers /> Posts da Comunidade
          </button>
        </div>

        <div className="forum-content">
          {activeTab === 'chat' ? (
            <div className="chat-section">
              <Chat 
                roomId="geral" 
                roomType="geral" 
                roomName="Chat Geral - Trilhas de Goiás"
              />
              <div className="chat-info card">
                <h3>💬 Sobre o Chat</h3>
                <ul>
                  <li>Converse em tempo real com outros trilheiros</li>
                  <li>Compartilhe fotos e experiências</li>
                  <li>Tire dúvidas sobre trilhas</li>
                  <li>Organize grupos para trilhas</li>
                  <li>Respeite todos os participantes</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="posts-section">
              <div className="card">
                <h2>Posts da Comunidade</h2>
                <p>Seção em desenvolvimento - mostrará posts do fórum com:</p>
                <ul>
                  <li>Relatos de trilhas</li>
                  <li>Dicas e recomendações</li>
                  <li>Perguntas e respostas</li>
                  <li>Alertas importantes</li>
                  <li>Compartilhamento de GPX</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;