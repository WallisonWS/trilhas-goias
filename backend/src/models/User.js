import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
    select: false
  },
  nivel_experiencia: {
    type: String,
    enum: ['iniciante', 'intermediario', 'avancado'],
    default: 'iniciante'
  },
  preferencias: {
    tipos: [{
      type: String,
      enum: ['caminhada', 'bike', 'long-course']
    }],
    dificuldade_preferida: {
      type: String,
      enum: ['facil', 'moderada', 'dificil', 'muito_dificil']
    }
  },
  historico_trilhas: [{
    trilha_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trail'
    },
    data: Date,
    tempo_percurso: Number, // em minutos
    distancia_percorrida: Number, // em km
    avaliacao: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  estatisticas: {
    total_trilhas: {
      type: Number,
      default: 0
    },
    total_km: {
      type: Number,
      default: 0
    },
    total_horas: {
      type: Number,
      default: 0
    },
    nivel_atual: {
      type: String,
      default: 'Iniciante'
    }
  },
  foto_perfil: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  contatos_emergencia: [{
    nome: String,
    telefone: String,
    relacao: String
  }],
  is_premium: {
    type: Boolean,
    default: false
  },
  premium_expira_em: Date,
  seguidores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  seguindo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.senha);
};

// Method to update statistics
userSchema.methods.updateStatistics = function() {
  this.estatisticas.total_trilhas = this.historico_trilhas.length;
  this.estatisticas.total_km = this.historico_trilhas.reduce((sum, t) => sum + (t.distancia_percorrida || 0), 0);
  this.estatisticas.total_horas = this.historico_trilhas.reduce((sum, t) => sum + (t.tempo_percurso || 0), 0) / 60;
  
  // Determine level based on experience
  if (this.estatisticas.total_trilhas >= 50) {
    this.estatisticas.nivel_atual = 'Expert';
  } else if (this.estatisticas.total_trilhas >= 20) {
    this.estatisticas.nivel_atual = 'Avançado';
  } else if (this.estatisticas.total_trilhas >= 5) {
    this.estatisticas.nivel_atual = 'Intermediário';
  } else {
    this.estatisticas.nivel_atual = 'Iniciante';
  }
};

const User = mongoose.model('User', userSchema);

export default User;