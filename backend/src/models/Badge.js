import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  descricao: String,
  icone: String,
  categoria: {
    type: String,
    enum: ['distancia', 'trilhas', 'elevacao', 'social', 'especial'],
    required: true
  },
  criterio: {
    tipo: String,
    valor: Number
  },
  raridade: {
    type: String,
    enum: ['comum', 'raro', 'epico', 'lendario'],
    default: 'comum'
  }
});

const userBadgeSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  badge_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge',
    required: true
  },
  desbloqueado_em: {
    type: Date,
    default: Date.now
  },
  progresso: {
    atual: Number,
    total: Number
  }
});

userBadgeSchema.index({ usuario_id: 1 });
userBadgeSchema.index({ badge_id: 1 });

export const Badge = mongoose.model('Badge', badgeSchema);
export const UserBadge = mongoose.model('UserBadge', userBadgeSchema);