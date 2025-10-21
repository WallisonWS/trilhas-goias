import ForumPost from '../models/ForumPost.js';

// @desc    Get all forum posts
// @route   GET /api/forum
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const {
      tipo,
      trilha_id,
      search,
      tags,
      sort = '-createdAt',
      page = 1,
      limit = 20
    } = req.query;

    // Build query
    const query = {};

    if (tipo) query.tipo = tipo;
    if (trilha_id) query.trilha_id = trilha_id;
    if (tags) query.tags = { $in: tags.split(',') };
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const posts = await ForumPost.find(query)
      .populate('usuario_id', 'nome foto_perfil nivel_experiencia')
      .populate('trilha_id', 'nome localizacao.municipio')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await ForumPost.countDocuments(query);

    res.json({
      success: true,
      data: posts,
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
      message: 'Erro ao buscar posts',
      error: error.message
    });
  }
};

// @desc    Get single post
// @route   GET /api/forum/:id
// @access  Public
export const getPost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id)
      .populate('usuario_id', 'nome foto_perfil nivel_experiencia')
      .populate('trilha_id', 'nome localizacao.municipio fotos')
      .populate('comentarios.usuario_id', 'nome foto_perfil');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    // Increment views
    await post.incrementViews();

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar post',
      error: error.message
    });
  }
};

// @desc    Create forum post
// @route   POST /api/forum
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { titulo, conteudo, tipo, trilha_id, fotos, gpx_compartilhado, tags } = req.body;

    const post = await ForumPost.create({
      usuario_id: req.user._id,
      titulo,
      conteudo,
      tipo,
      trilha_id,
      fotos,
      gpx_compartilhado,
      tags
    });

    const populatedPost = await ForumPost.findById(post._id)
      .populate('usuario_id', 'nome foto_perfil nivel_experiencia')
      .populate('trilha_id', 'nome localizacao.municipio');

    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar post',
      error: error.message
    });
  }
};

// @desc    Update forum post
// @route   PUT /api/forum/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    let post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    // Check ownership
    if (post.usuario_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Não autorizado a editar este post'
      });
    }

    post = await ForumPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('usuario_id', 'nome foto_perfil nivel_experiencia');

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar post',
      error: error.message
    });
  }
};

// @desc    Delete forum post
// @route   DELETE /api/forum/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    // Check ownership
    if (post.usuario_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Não autorizado a deletar este post'
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: 'Post deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar post',
      error: error.message
    });
  }
};

// @desc    Add comment to post
// @route   POST /api/forum/:id/comment
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { texto } = req.body;

    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    await post.addComment(req.user._id, texto);

    const updatedPost = await ForumPost.findById(post._id)
      .populate('comentarios.usuario_id', 'nome foto_perfil');

    res.json({
      success: true,
      data: updatedPost.comentarios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao adicionar comentário',
      error: error.message
    });
  }
};

// @desc    Toggle like on post
// @route   POST /api/forum/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    await post.toggleLike(req.user._id);

    res.json({
      success: true,
      data: {
        likes: post.likes,
        liked: post.liked_by.includes(req.user._id)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao curtir post',
      error: error.message
    });
  }
};

// @desc    Get user's posts
// @route   GET /api/forum/user
// @access  Private
export const getUserPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find({ usuario_id: req.user._id })
      .populate('trilha_id', 'nome localizacao.municipio')
      .sort('-createdAt');

    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar seus posts',
      error: error.message
    });
  }
};