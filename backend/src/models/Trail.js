import mongoose from 'mongoose';

const trailSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome da trilha é obrigatório'],
    trim: true
  },
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  localizacao: {
    municipio: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      default: 'GO'
    },
    coordenadas: {
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
    regiao: String // Ex: "Chapada dos Veadeiros"
  },
  tipo: {
    type: String,
    enum: ['pedestre', 'ciclismo', 'mista'],
    required: true
  },
  dificuldade: {
    type: String,
    enum: ['facil', 'moderada', 'dificil', 'muito_dificil'],
    required: true
  },
  extensao_km: {
    type: Number,
    required: true
  },
  desnivel_metros: {
    type: Number,
    default: 0
  },
  tempo_estimado_horas: {
    type: Number,
    required: true
  },
  
  // Dados GPX/KML
  gpx_data: {
    waypoints: [{
      lat: Number,
      lon: Number,
      ele: Number,
      name: String,
      desc: String
    }],
    track: [{
      lat: Number,
      lon: Number,
      ele: Number,
      time: Date
    }],
    arquivo_gpx: String // URL do arquivo GPX
  },
  
  // Informações específicas de Goiás
  bioma: {
    type: String,
    default: 'Cerrado'
  },
  clima: {
    melhor_epoca: String,
    temperatura_media: String,
    precipitacao: String
  },
  
  // Pontos de apoio
  pontos_apoio: [{
    tipo: {
      type: String,
      enum: ['pousada', 'guia', 'abastecimento', 'primeiros_socorros']
    },
    nome: String,
    contato: String,
    coordenadas: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number] // [longitude, latitude]
    },
    descricao: String
  }],
  
  // Segurança
  seguranca: {
    nivel_sinal: {
      type: String,
      enum: ['bom', 'fraco', 'sem_sinal'],
      default: 'fraco'
    },
    areas_sem_cobertura: [String],
    fauna_local: [String],
    riscos: [String],
    precaucoes: [String]
  },
  
  // Infraestrutura
  infraestrutura: {
    sinalizacao: {
      type: String,
      enum: ['excelente', 'boa', 'regular', 'precaria']
    },
    manutencao: {
      type: String,
      enum: ['recente', 'regular', 'necessaria']
    },
    acessibilidade: String
  },
  
  // Mídia
  fotos: [String], // URLs
  videos: [String], // URLs
  
  // Estatísticas
  estatisticas: {
    total_avaliacoes: {
      type: Number,
      default: 0
    },
    media_avaliacoes: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    total_conclusoes: {
      type: Number,
      default: 0
    },
    popularidade: {
      type: Number,
      default: 0
    }
  },
  
  // Parte do Caminho dos Veadeiros?
  caminho_veadeiros: {
    type: Boolean,
    default: false
  },
  setor_caminho: String,
  
  // Disponibilidade offline
  disponivel_offline: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for geospatial queries
trailSchema.index({ 'localizacao.coordenadas': '2dsphere' });

// Index for search
trailSchema.index({ nome: 'text', descricao: 'text' });

// Method to update statistics
trailSchema.methods.updateStatistics = async function() {
  const Review = mongoose.model('Review');
  
  const reviews = await Review.find({ trilha_id: this._id });
  
  this.estatisticas.total_avaliacoes = reviews.length;
  
  if (reviews.length > 0) {
    const sum = reviews.reduce((acc, review) => acc + review.avaliacao, 0);
    this.estatisticas.media_avaliacoes = sum / reviews.length;
  }
  
  await this.save();
};

const Trail = mongoose.model('Trail', trailSchema);

export default Trail;