import Review from '../models/Review.js';
import Trail from '../models/Trail.js';
import User from '../models/User.js';

// @desc    Get reviews for a trail
// @route   GET /api/reviews/trail/:trailId
// @access  Public
export const getTrailReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const reviews = await Review.find({ trilha_id: req.params.trailId })
      .populate('usuario_id', 'nome foto_perfil nivel_experiencia')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Review.countDocuments({ trilha_id: req.params.trailId });

    res.json({
      success: true,
      data: reviews,
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
      message: 'Erro ao buscar avaliações',
      error: error.message
    });
  }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/user
// @access  Private
export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ usuario_id: req.user._id })
      .populate('trilha_id', 'nome localizacao.municipio fotos')
      .sort('-createdAt');

    res.json({
      success: true,
      data: reviews,
      count: reviews.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar suas avaliações',
      error: error.message
    });
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { trilha_id, avaliacao, comentario, fotos, experiencia, dicas, recomenda } = req.body;

    // Check if trail exists
    const trail = await Trail.findById(trilha_id);
    if (!trail) {
      return res.status(404).json({
        success: false,
        message: 'Trilha não encontrada'
      });
    }

    // Check if user already reviewed this trail
    const existingReview = await Review.findOne({
      usuario_id: req.user._id,
      trilha_id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Você já avaliou esta trilha'
      });
    }

    // Create review
    const review = await Review.create({
      usuario_id: req.user._id,
      trilha_id,
      avaliacao,
      comentario,
      fotos,
      experiencia,
      dicas,
      recomenda
    });

    // Update trail statistics
    await trail.updateStatistics();

    // Add to user history
    const user = await User.findById(req.user._id);
    user.historico_trilhas.push({
      trilha_id,
      data: experiencia.data_trilha,
      tempo_percurso: experiencia.tempo_percurso,
      distancia_percorrida: trail.extensao_km,
      avaliacao
    });
    user.updateStatistics();
    await user.save();

    const populatedReview = await Review.findById(review._id)
      .populate('usuario_id', 'nome foto_perfil nivel_experiencia');

    res.status(201).json({
      success: true,
      data: populatedReview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar avaliação',
      error: error.message
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avaliação não encontrada'
      });
    }

    // Check ownership
    if (review.usuario_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Não autorizado a editar esta avaliação'
      });
    }

    review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('usuario_id', 'nome foto_perfil nivel_experiencia');

    // Update trail statistics
    const trail = await Trail.findById(review.trilha_id);
    await trail.updateStatistics();

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar avaliação',
      error: error.message
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avaliação não encontrada'
      });
    }

    // Check ownership
    if (review.usuario_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Não autorizado a deletar esta avaliação'
      });
    }

    await review.deleteOne();

    // Update trail statistics
    const trail = await Trail.findById(review.trilha_id);
    await trail.updateStatistics();

    res.json({
      success: true,
      message: 'Avaliação deletada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar avaliação',
      error: error.message
    });
  }
};

// @desc    Toggle like on review
// @route   POST /api/reviews/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avaliação não encontrada'
      });
    }

    await review.toggleLike(req.user._id);

    res.json({
      success: true,
      data: {
        likes: review.likes,
        liked: review.liked_by.includes(req.user._id)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao curtir avaliação',
      error: error.message
    });
  }
};