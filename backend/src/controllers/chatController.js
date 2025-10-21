import ChatMessage from '../models/Chat.js';

// @desc    Get messages from a room
// @route   GET /api/chat/:roomId
// @access  Private
export const getRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await ChatMessage.find({ sala_id: roomId })
      .populate('usuario_id', 'nome foto_perfil nivel_experiencia')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await ChatMessage.countDocuments({ sala_id: roomId });

    res.json({
      success: true,
      data: messages.reverse(), // Reverse to show oldest first
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar mensagens',
      error: error.message
    });
  }
};

// @desc    Send message to room
// @route   POST /api/chat/:roomId
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { mensagem, tipo_mensagem, anexos, localizacao, tipo_sala } = req.body;

    const message = await ChatMessage.create({
      sala_id: roomId,
      tipo_sala: tipo_sala || 'geral',
      usuario_id: req.user._id,
      mensagem,
      tipo_mensagem: tipo_mensagem || 'texto',
      anexos,
      localizacao
    });

    const populatedMessage = await ChatMessage.findById(message._id)
      .populate('usuario_id', 'nome foto_perfil nivel_experiencia');

    // Emit via Socket.io (handled in server.js)
    req.app.get('io').to(`chat-${roomId}`).emit('new-message', populatedMessage);

    res.status(201).json({
      success: true,
      data: populatedMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar mensagem',
      error: error.message
    });
  }
};

// @desc    Edit message
// @route   PUT /api/chat/message/:messageId
// @access  Private
export const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { mensagem } = req.body;

    const message = await ChatMessage.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensagem não encontrada'
      });
    }

    // Check ownership
    if (message.usuario_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Não autorizado a editar esta mensagem'
      });
    }

    await message.editMessage(mensagem);

    const populatedMessage = await ChatMessage.findById(message._id)
      .populate('usuario_id', 'nome foto_perfil');

    // Emit update via Socket.io
    req.app.get('io').to(`chat-${message.sala_id}`).emit('message-edited', populatedMessage);

    res.json({
      success: true,
      data: populatedMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao editar mensagem',
      error: error.message
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/chat/message/:messageId
// @access  Private
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await ChatMessage.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensagem não encontrada'
      });
    }

    // Check ownership
    if (message.usuario_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Não autorizado a deletar esta mensagem'
      });
    }

    const roomId = message.sala_id;
    await message.deleteOne();

    // Emit deletion via Socket.io
    req.app.get('io').to(`chat-${roomId}`).emit('message-deleted', messageId);

    res.json({
      success: true,
      message: 'Mensagem deletada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar mensagem',
      error: error.message
    });
  }
};

// @desc    Mark message as read
// @route   POST /api/chat/message/:messageId/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await ChatMessage.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensagem não encontrada'
      });
    }

    await message.markAsRead(req.user._id);

    res.json({
      success: true,
      message: 'Mensagem marcada como lida'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao marcar mensagem como lida',
      error: error.message
    });
  }
};

// @desc    Get active chat rooms
// @route   GET /api/chat/rooms
// @access  Private
export const getActiveRooms = async (req, res) => {
  try {
    // Get distinct room IDs where user has messages
    const rooms = await ChatMessage.distinct('sala_id', {
      $or: [
        { usuario_id: req.user._id },
        { 'lida_por.usuario_id': req.user._id }
      ]
    });

    // Get last message for each room
    const roomsWithLastMessage = await Promise.all(
      rooms.map(async (roomId) => {
        const lastMessage = await ChatMessage.findOne({ sala_id: roomId })
          .sort('-createdAt')
          .populate('usuario_id', 'nome foto_perfil');

        const unreadCount = await ChatMessage.countDocuments({
          sala_id: roomId,
          usuario_id: { $ne: req.user._id },
          'lida_por.usuario_id': { $ne: req.user._id }
        });

        return {
          sala_id: roomId,
          last_message: lastMessage,
          unread_count: unreadCount
        };
      })
    );

    res.json({
      success: true,
      data: roomsWithLastMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar salas de chat',
      error: error.message
    });
  }
};