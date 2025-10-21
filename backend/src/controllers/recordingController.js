import RecordedTrail from '../models/RecordedTrail.js';

export const startRecording = async (req, res) => {
  try {
    const { nome } = req.body;
    
    const recording = await RecordedTrail.create({
      usuario_id: req.user._id,
      nome,
      data_inicio: new Date(),
      status: 'gravando',
      pontos_gps: []
    });

    res.status(201).json({
      success: true,
      data: recording
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao iniciar gravação',
      error: error.message
    });
  }
};

export const addGPSPoint = async (req, res) => {
  try {
    const { recordingId } = req.params;
    const { latitude, longitude, altitude, accuracy, speed } = req.body;

    const recording = await RecordedTrail.findById(recordingId);
    
    if (!recording) {
      return res.status(404).json({
        success: false,
        message: 'Gravação não encontrada'
      });
    }

    recording.pontos_gps.push({
      latitude,
      longitude,
      altitude,
      accuracy,
      speed,
      timestamp: new Date()
    });

    await recording.save();

    res.json({
      success: true,
      data: {
        totalPoints: recording.pontos_gps.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao adicionar ponto GPS',
      error: error.message
    });
  }
};

export const pauseRecording = async (req, res) => {
  try {
    const { recordingId } = req.params;
    
    const recording = await RecordedTrail.findByIdAndUpdate(
      recordingId,
      { status: 'pausado' },
      { new: true }
    );

    res.json({
      success: true,
      data: recording
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao pausar gravação',
      error: error.message
    });
  }
};

export const stopRecording = async (req, res) => {
  try {
    const { recordingId } = req.params;
    const { descricao } = req.body;
    
    const recording = await RecordedTrail.findById(recordingId);
    
    recording.status = 'finalizado';
    recording.data_fim = new Date();
    recording.descricao = descricao;
    
    await recording.calculateStatistics();
    
    res.json({
      success: true,
      data: recording
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao finalizar gravação',
      error: error.message
    });
  }
};

export const getRecordings = async (req, res) => {
  try {
    const recordings = await RecordedTrail.find({ usuario_id: req.user._id })
      .sort('-createdAt');

    res.json({
      success: true,
      data: recordings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar gravações',
      error: error.message
    });
  }
};

export const downloadGPX = async (req, res) => {
  try {
    const { recordingId } = req.params;
    
    const recording = await RecordedTrail.findById(recordingId);
    
    if (!recording) {
      return res.status(404).json({
        success: false,
        message: 'Gravação não encontrada'
      });
    }

    const gpxContent = recording.toGPX();
    
    res.setHeader('Content-Type', 'application/gpx+xml');
    res.setHeader('Content-Disposition', `attachment; filename="${recording.nome}.gpx"`);
    res.send(gpxContent);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao baixar GPX',
      error: error.message
    });
  }
};