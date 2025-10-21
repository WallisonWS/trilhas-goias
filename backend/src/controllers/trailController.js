import Trail from '../models/Trail.js';

// @desc    Get all trails with filters
// @route   GET /api/trails
// @access  Public
export const getTrails = async (req, res) => {
  try {
    const {
      tipo,
      dificuldade,
      municipio,
      caminho_veadeiros,
      disponivel_offline,
      search,
      sort = '-popularidade',
      page = 1,
      limit = 20
    } = req.query;

    // Build query
    const query = {};

    if (tipo) query.tipo = tipo;
    if (dificuldade) query.dificuldade = dificuldade;
    if (municipio) query['localizacao.municipio'] = municipio;
    if (caminho_veadeiros) query.caminho_veadeiros = caminho_veadeiros === 'true';
    if (disponivel_offline) query.disponivel_offline = disponivel_offline === 'true';
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const trails = await Trail.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-gpx_data.track'); // Exclude large track data from list

    const count = await Trail.countDocuments(query);

    res.json({
      success: true,
      data: trails,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar trilhas',
      error: error.message
    });
  }
};

// @desc    Get single trail by ID
// @route   GET /api/trails/:id
// @access  Public
export const getTrail = async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);

    if (!trail) {
      return res.status(404).json({
        success: false,
        message: 'Trilha não encontrada'
      });
    }

    res.json({
      success: true,
      data: trail
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar trilha',
      error: error.message
    });
  }
};

// @desc    Get trails near location
// @route   GET /api/trails/nearby
// @access  Public
export const getNearbyTrails = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 50000 } = req.query; // maxDistance in meters (default 50km)

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: 'Longitude e latitude são obrigatórias'
      });
    }

    const trails = await Trail.find({
      'localizacao.coordenadas': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).limit(20);

    res.json({
      success: true,
      data: trails,
      count: trails.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar trilhas próximas',
      error: error.message
    });
  }
};

// @desc    Create new trail
// @route   POST /api/trails
// @access  Private (Admin only - to be implemented)
export const createTrail = async (req, res) => {
  try {
    const trail = await Trail.create(req.body);

    res.status(201).json({
      success: true,
      data: trail
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar trilha',
      error: error.message
    });
  }
};

// @desc    Update trail
// @route   PUT /api/trails/:id
// @access  Private (Admin only - to be implemented)
export const updateTrail = async (req, res) => {
  try {
    const trail = await Trail.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!trail) {
      return res.status(404).json({
        success: false,
        message: 'Trilha não encontrada'
      });
    }

    res.json({
      success: true,
      data: trail
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar trilha',
      error: error.message
    });
  }
};

// @desc    Delete trail
// @route   DELETE /api/trails/:id
// @access  Private (Admin only - to be implemented)
export const deleteTrail = async (req, res) => {
  try {
    const trail = await Trail.findByIdAndDelete(req.params.id);

    if (!trail) {
      return res.status(404).json({
        success: false,
        message: 'Trilha não encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Trilha deletada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar trilha',
      error: error.message
    });
  }
};

// @desc    Get trail statistics
// @route   GET /api/trails/:id/stats
// @access  Public
export const getTrailStats = async (req, res) => {
  try {
    const trail = await Trail.findById(req.params.id);

    if (!trail) {
      return res.status(404).json({
        success: false,
        message: 'Trilha não encontrada'
      });
    }

    await trail.updateStatistics();

    res.json({
      success: true,
      data: trail.estatisticas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas',
      error: error.message
    });
  }
};