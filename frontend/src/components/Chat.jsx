import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaPaperPlane, FaImage, FaMapMarkerAlt } from 'react-icons/fa';
import './Chat.css';

const Chat = ({ roomId, roomType = 'geral', roomName = 'Chat' }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [typing, setTyping] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
  const { user } = useAuth();

  useEffect(() => {
    // Load initial messages
    loadMessages();

    // Connect to Socket.io
    const backendUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://trilhas-goias.onrender.com';
    const newSocket = io(backendUrl);
    setSocket(newSocket);

    // Join chat room
    newSocket.emit('join-chat', roomId);

    // Listen for new messages
    newSocket.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    // Listen for typing indicators
    newSocket.on('user-typing', (data) => {
      setTyping(prev => [...prev, data.userName]);
    });

    newSocket.on('user-stopped-typing', (data) => {
      setTyping(prev => prev.filter(name => name !== data.userName));
    });

    // Listen for message edits
    newSocket.on('message-edited', (editedMessage) => {
      setMessages(prev => prev.map(msg => 
        msg._id === editedMessage._id ? editedMessage : msg
      ));
    });

    // Listen for message deletions
    newSocket.on('message-deleted', (messageId) => {
      setMessages(prev => prev.filter(msg => msg._id !== messageId));
    });

    return () => {
      newSocket.emit('leave-chat', roomId);
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const response = await axios.get(`/api/chat/${roomId}`);
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTyping = () => {
    if (!socket) return;

    socket.emit('typing', {
      roomId,
      userId: user.id,
      userName: user.nome
    });

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop-typing', {
        roomId,
        userId: user.id
      });
    }, 2000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    try {
      await axios.post(`/api/chat/${roomId}`, {
        mensagem: newMessage,
        tipo_sala: roomType
      });

      setNewMessage('');
      
      // Stop typing indicator
      if (socket) {
        socket.emit('stop-typing', {
          roomId,
          userId: user.id
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="chat-loading">
        <div className="spinner"></div>
        <p>Carregando chat...</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>{roomName}</h3>
        <span className="chat-room-type">{roomType}</span>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <p>Nenhuma mensagem ainda. Seja o primeiro a conversar!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`message ${message.usuario_id._id === user.id ? 'message-own' : 'message-other'}`}
            >
              <div className="message-avatar">
                <img 
                  src={message.usuario_id.foto_perfil} 
                  alt={message.usuario_id.nome}
                />
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-author">{message.usuario_id.nome}</span>
                  <span className="message-time">{formatTime(message.createdAt)}</span>
                </div>
                <div className="message-text">
                  {message.mensagem}
                  {message.editada && (
                    <span className="message-edited">(editada)</span>
                  )}
                </div>
                {message.anexos && message.anexos.length > 0 && (
                  <div className="message-attachments">
                    {message.anexos.map((anexo, idx) => (
                      <div key={idx} className="attachment">
                        {anexo.tipo === 'foto' && (
                          <img src={anexo.url} alt={anexo.nome} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {typing.length > 0 && (
        <div className="typing-indicator">
          {typing.join(', ')} {typing.length === 1 ? 'está' : 'estão'} digitando...
        </div>
      )}

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <div className="chat-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Digite sua mensagem..."
            className="chat-input"
            maxLength={1000}
          />
          <div className="chat-actions">
            <button type="button" className="btn-icon" title="Enviar foto">
              <FaImage />
            </button>
            <button type="button" className="btn-icon" title="Compartilhar localização">
              <FaMapMarkerAlt />
            </button>
            <button type="submit" className="btn btn-primary btn-send" disabled={!newMessage.trim()}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;