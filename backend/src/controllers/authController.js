import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Generate Refresh Token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { nome, email, senha, nivel_experiencia, preferencias } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }

    // Create user
    const user = await User.create({
      nome,
      email,
      senha,
      nivel_experiencia,
      preferencias
    });

    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          nome: user.nome,
          email: user.email,
          nivel_experiencia: user.nivel_experiencia,
          foto_perfil: user.foto_perfil
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao registrar usuário',
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validate input
    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    // Find user with password
    const user = await User.findOne({ email }).select('+senha');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(senha);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Generate tokens
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          nome: user.nome,
          email: user.email,
          nivel_experiencia: user.nivel_experiencia,
          foto_perfil: user.foto_perfil,
          is_premium: user.is_premium,
          estatisticas: user.estatisticas
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer login',
      error: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuário',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      nome: req.body.nome,
      nivel_experiencia: req.body.nivel_experiencia,
      preferencias: req.body.preferencias,
      foto_perfil: req.body.foto_perfil,
      contatos_emergencia: req.body.contatos_emergencia
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(
      req.user._id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar perfil',
      error: error.message
    });
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token não fornecido'
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    const newToken = generateToken(user._id);

    res.json({
      success: true,
      data: {
        token: newToken
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Refresh token inválido',
      error: error.message
    });
  }
};