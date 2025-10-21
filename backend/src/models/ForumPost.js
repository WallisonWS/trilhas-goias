import mongoose from 'mongoose';

const forumPostSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trilha_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trail'
  },
  titulo: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    maxlength: [200, 'Título não pode ter mais de 200 caracteres']
  },
  conteudo: {
    type: String,
    required: [true, 'Conteúdo é obrigatório'],
    maxlength: [5000, 'Conteúdo não pode ter mais de 5000 caracteres']
  },
  tipo: {
    type: String,
    enum: ['dica', 'relato', 'pergunta', 'alerta'],
    required: true
  },
  
  fotos: [String], // URLs
  gpx_compartilhado: String, // URL do arquivo GPX
  
  tags: [String],
  
  comentarios: [{
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    texto: {
      type: String,
      required: true,
      maxlength: 500
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  
  likes: {
    type: Number,
    default: 0
  },
  
  liked_by: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  visualizacoes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
forumPostSchema.index({ tipo: 1, createdAt: -1 });
forumPostSchema.index({ usuario_id: 1 });
forumPostSchema.index({ trilha_id: 1 });
forumPostSchema.index({ tags: 1 });
forumPostSchema.index({ titulo: 'text', conteudo: 'text' });

// Method to add comment
forumPostSchema.methods.addComment = function(userId, texto) {
  this.comentarios.push({
    usuario_id: userId,
    texto: texto,
    created_at: new Date()
  });
  
  return this.save();
};

// Method to toggle like
forumPostSchema.methods.toggleLike = function(userId) {
  const index = this.liked_by.indexOf(userId);
  
  if (index > -1) {
    // Unlike
    this.liked_by.splice(index, 1);
    this.likes = Math.max(0, this.likes - 1);
  } else {
    // Like
    this.liked_by.push(userId);
    this.likes += 1;
  }
  
  return this.save();
};

// Method to increment views
forumPostSchema.methods.incrementViews = function() {
  this.visualizacoes += 1;
  return this.save();
};

const ForumPost = mongoose.model('ForumPost', forumPostSchema);

export default ForumPost;