import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  sala_id: {
    type: String,
    required: true,
    index: true
  },
  tipo_sala: {
    type: String,
    enum: ['trilha', 'geral', 'privado'],
    default: 'geral'
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mensagem: {
    type: String,
    required: true,
    maxlength: 1000
  },
  tipo_mensagem: {
    type: String,
    enum: ['texto', 'foto', 'localizacao', 'gpx'],
    default: 'texto'
  },
  anexos: [{
    tipo: String,
    url: String,
    nome: String
  }],
  localizacao: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: [Number]
  },
  lida_por: [{
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    lida_em: {
      type: Date,
      default: Date.now
    }
  }],
  editada: {
    type: Boolean,
    default: false
  },
  editada_em: Date
}, {
  timestamps: true
});

// Indexes
chatMessageSchema.index({ sala_id: 1, createdAt: -1 });
chatMessageSchema.index({ usuario_id: 1 });
chatMessageSchema.index({ tipo_sala: 1 });

// Method to mark as read
chatMessageSchema.methods.markAsRead = function(userId) {
  const alreadyRead = this.lida_por.some(
    leitura => leitura.usuario_id.toString() === userId.toString()
  );

  if (!alreadyRead) {
    this.lida_por.push({
      usuario_id: userId,
      lida_em: new Date()
    });
    return this.save();
  }
  
  return Promise.resolve(this);
};

// Method to edit message
chatMessageSchema.methods.editMessage = function(newMessage) {
  this.mensagem = newMessage;
  this.editada = true;
  this.editada_em = new Date();
  return this.save();
};

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;