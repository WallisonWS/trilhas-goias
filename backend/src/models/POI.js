import mongoose from 'mongoose';

const poiSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: String,
  categoria: {
    type: String,
    enum: ['mirante', 'cachoeira', 'camping', 'abrigo', 'fonte_agua', 'perigo', 'outro'],
    required: true
  },
  localizacao: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  trilha_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trail'
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fotos: [String],
  avaliacoes: [{
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    nota: {
      type: Number,
      min: 1,
      max: 5
    },
    comentario: String,
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  verificado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

poiSchema.index({ localizacao: '2dsphere' });
poiSchema.index({ trilha_id: 1 });
poiSchema.index({ categoria: 1 });

const POI = mongoose.model('POI', poiSchema);

export default POI;