import mongoose from 'mongoose';

const recordedTrailSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  descricao: String,
  
  // GPS Data
  pontos_gps: [{
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    timestamp: Date,
    speed: Number // m/s
  }],
  
  // Calculated Statistics
  estatisticas: {
    distancia_total: Number, // km
    tempo_total: Number, // minutos
    tempo_movimento: Number, // minutos
    tempo_parado: Number, // minutos
    velocidade_media: Number, // km/h
    velocidade_maxima: Number, // km/h
    ganho_elevacao: Number, // metros
    perda_elevacao: Number, // metros
    altitude_maxima: Number,
    altitude_minima: Number,
    calorias: Number
  },
  
  // Recording Info
  data_inicio: {
    type: Date,
    required: true
  },
  data_fim: Date,
  status: {
    type: String,
    enum: ['gravando', 'pausado', 'finalizado'],
    default: 'gravando'
  },
  
  // Export
  arquivo_gpx: String,
  
  // Privacy
  privado: {
    type: Boolean,
    default: false
  },
  
  // Sharing
  compartilhado_com: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for queries
recordedTrailSchema.index({ usuario_id: 1, createdAt: -1 });
recordedTrailSchema.index({ status: 1 });

// Method to calculate statistics
recordedTrailSchema.methods.calculateStatistics = function() {
  if (this.pontos_gps.length < 2) return;

  let distanciaTotal = 0;
  let ganhoElevacao = 0;
  let perdaElevacao = 0;
  let altitudeMax = this.pontos_gps[0].altitude || 0;
  let altitudeMin = this.pontos_gps[0].altitude || 0;
  let velocidadeMax = 0;

  for (let i = 1; i < this.pontos_gps.length; i++) {
    const p1 = this.pontos_gps[i - 1];
    const p2 = this.pontos_gps[i];

    // Calculate distance using Haversine formula
    const R = 6371; // Earth radius in km
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLon = (p2.longitude - p1.longitude) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(p1.latitude * Math.PI / 180) * Math.cos(p2.latitude * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    distanciaTotal += distance;

    // Elevation gain/loss
    if (p2.altitude && p1.altitude) {
      const elevDiff = p2.altitude - p1.altitude;
      if (elevDiff > 0) {
        ganhoElevacao += elevDiff;
      } else {
        perdaElevacao += Math.abs(elevDiff);
      }

      altitudeMax = Math.max(altitudeMax, p2.altitude);
      altitudeMin = Math.min(altitudeMin, p2.altitude);
    }

    // Speed
    if (p2.speed) {
      velocidadeMax = Math.max(velocidadeMax, p2.speed * 3.6); // Convert m/s to km/h
    }
  }

  // Time calculations
  const tempoTotal = (this.data_fim - this.data_inicio) / 60000; // minutes
  const velocidadeMedia = tempoTotal > 0 ? (distanciaTotal / (tempoTotal / 60)) : 0;

  // Estimate calories (rough calculation)
  const calorias = distanciaTotal * 65 + ganhoElevacao * 0.5;

  this.estatisticas = {
    distancia_total: distanciaTotal,
    tempo_total: tempoTotal,
    tempo_movimento: tempoTotal * 0.8, // Estimate
    tempo_parado: tempoTotal * 0.2,
    velocidade_media: velocidadeMedia,
    velocidade_maxima: velocidadeMax,
    ganho_elevacao: ganhoElevacao,
    perda_elevacao: perdaElevacao,
    altitude_maxima: altitudeMax,
    altitude_minima: altitudeMin,
    calorias: Math.round(calorias)
  };

  return this.save();
};

// Method to export as GPX
recordedTrailSchema.methods.toGPX = function() {
  let gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Trilhas de Goiás">
  <metadata>
    <name>${this.nome}</name>
    <desc>${this.descricao || ''}</desc>
    <time>${this.data_inicio.toISOString()}</time>
  </metadata>
  <trk>
    <name>${this.nome}</name>
    <trkseg>`;

  this.pontos_gps.forEach(ponto => {
    gpx += `
      <trkpt lat="${ponto.latitude}" lon="${ponto.longitude}">
        ${ponto.altitude ? `<ele>${ponto.altitude}</ele>` : ''}
        <time>${ponto.timestamp.toISOString()}</time>
      </trkpt>`;
  });

  gpx += `
    </trkseg>
  </trk>
</gpx>`;

  return gpx;
};

const RecordedTrail = mongoose.model('RecordedTrail', recordedTrailSchema);

export default RecordedTrail;