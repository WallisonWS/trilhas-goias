import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trilha_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trail',
    required: true
  },
  avaliacao: {
    type: Number,
    required: [true, 'Avaliação é obrigatória'],
    min: 1,
    max: 5
  },
  comentario: {
    type: String,
    required: [true, 'Comentário é obrigatório'],
    maxlength: [1000, 'Comentário não pode ter mais de 1000 caracteres']
  },
  fotos: [String], // URLs
  
  experiencia: {
    data_trilha: {
      type: Date,
      required: true
    },
    tempo_percurso: Number, // em minutos
    dificuldade_percebida: {
      type: String,
      enum: ['facil', 'moderada', 'dificil', 'muito_dificil']
    },
    condicoes_trilha: String,
    clima: String
  },
  
  dicas: String,
  recomenda: {
    type: Boolean,
    default: true
  },
  
  likes: {
    type: Number,
    default: 0
  },
  
  liked_by: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for queries
reviewSchema.index({ trilha_id: 1, createdAt: -1 });
reviewSchema.index({ usuario_id: 1 });

// Method to toggle like
reviewSchema.methods.toggleLike = function(userId) {
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

const Review = mongoose.model('Review', reviewSchema);

export default Review;