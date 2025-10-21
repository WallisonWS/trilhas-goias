import mongoose from 'mongoose';

const emergencySchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trilha_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trail'
  },
  
  status: {
    type: String,
    enum: ['ativo', 'resolvido', 'cancelado'],
    default: 'ativo'
  },
  
  tipo: {
    type: String,
    enum: ['perigo', 'acidente', 'perdido', 'ajuda'],
    required: true
  },
  
  localizacao: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  
  mensagem: String,
  
  contatos_notificados: [{
    nome: String,
    telefone: String,
    notificado_em: {
      type: Date,
      default: Date.now
    },
    status_notificacao: {
      type: String,
      enum: ['enviado', 'falhou', 'pendente'],
      default: 'pendente'
    }
  }],
  
  resolvido_em: Date,
  resolvido_por: String,
  notas_resolucao: String
}, {
  timestamps: true
});

// Index for geospatial queries
emergencySchema.index({ localizacao: '2dsphere' });
emergencySchema.index({ usuario_id: 1, status: 1 });
emergencySchema.index({ createdAt: -1 });

// Method to resolve emergency
emergencySchema.methods.resolve = function(resolvidoPor, notas) {
  this.status = 'resolvido';
  this.resolvido_em = new Date();
  this.resolvido_por = resolvidoPor;
  this.notas_resolucao = notas;
  
  return this.save();
};

// Method to cancel emergency
emergencySchema.methods.cancel = function() {
  this.status = 'cancelado';
  return this.save();
};

const Emergency = mongoose.model('Emergency', emergencySchema);

export default Emergency;